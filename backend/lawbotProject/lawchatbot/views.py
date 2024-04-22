import json
from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt 
from django.contrib.auth import login , authenticate
from django.contrib.auth.decorators import login_required
from django.utils import timezone   
from . models import User, Chats, Messages
from allauth.account.views import LoginView as allLogin 
from allauth.account.views import LogoutView as allLogout
from allauth.account.views import SignupView as allSignup
from allauth.account.views import PasswordSetView as setPassword
from allauth.account.views import PasswordChangeView as changePassword
from . forms import CustomSignupForm, UserDetailsForm


#Open AI integration 
from openai import OpenAI

client = OpenAI()

def createcontext(request, messages):
    completion = [{"role": "system", "content": "You are Lawbot, a Lawhelp assistant for Ghanaians. Only answer law questions."}]
    for message in messages:
        if message["authur"] == "Lawbot":
            completion.append({"role": "assistant"  , "content": message["message"]})
        else :
            completion.append({"role": "user"  , "content": message["message"]})
    request.session["context"] = completion
    return 

# Create your views here.
class HomeView(View):
    def get(self, request):
        return render(request, "index.html")
         

@method_decorator(ensure_csrf_cookie, name='dispatch')
class SignUp(allSignup):
    template_name="index.html"
    
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            # If the user is already logged in, redirect to home
            return redirect('home')
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        form_class = CustomSignupForm
        form = self.get_form(form_class)
        if form.is_valid():
            # Authenticate user
            response = self.form_valid(form)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)
        

class ChangePassword(changePassword):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.has_usable_password():
            # If the user does not have a passsword
            return redirect('setpassword')
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        if form.is_valid():
            # Authenticate user
            response = self.form_valid(form)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)
        
        
class SetPassword(setPassword):
    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        if form.is_valid():
            # Authenticate user
            response = self.form_valid(form)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)
    
        
    

@method_decorator(ensure_csrf_cookie, name='dispatch')     
class LogIn(allLogin):
    #Overide standard login template
    template_name="index.html" 
    
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            # If the user is already logged in, redirect to home
            return redirect('home')
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        if form.is_valid():
            # Authenticate user
            response = self.form_valid(form)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)
            
            
@method_decorator(ensure_csrf_cookie, name='dispatch')     
class LogOut(allLogout):
    #Overide standard login template
    template_name="index.html" 
    


@method_decorator([login_required, csrf_exempt], name='dispatch')
class Chat(View):
    def post(self, request):
        # Create a new chat object and save it to the database
        chat = Chats.objects.create(name="New Chat", user_id=request.user)
        
        #Update chat to be the last modified 
        Chats.objects.filter(pk=chat.pk).update(last_modified=timezone.now())
        
        # Retrieve the chat object from the database as a dictionary
        chats = list(Chats.objects.filter(user_id=request.user).order_by( "-last_modified" ).values("id","name"))
        messages = list(Messages.objects.filter(chat_id=chat.pk).order_by("created_at").values('message', 'authur', 'like', 'dislike'))
        
        # Store the chat ID in the session
        request.session["chat_id"] = chat.pk
        request.session["context"] = []
        print(request.session["chat_id"])
        
        # Return the serialized chat data as a JSON response
        return JsonResponse({'messages': messages, 'chats': chats})
    
    
@method_decorator([login_required, csrf_exempt], name='dispatch') 
class Chatroom(View):
    def get(self,request):
        return render(request, 'index.html')
    
    
@method_decorator([login_required, csrf_exempt], name='dispatch') 
class GetLatestChat(View):
    def get(self, request):
        # Get the latest chat based on the last_modified field
        latest_chat = Chats.objects.filter(user_id=request.user).order_by('-last_modified').first()

        # Add a chat to the session or create a new chat if one does not exist
        if latest_chat:
            request.session["chat_id"] = latest_chat.pk 
            print(request.session["chat_id"])
        else:
            chat = Chats.objects.create(name="New Chat", user_id=request.user)
            request.session["chat_id"] = chat.pk
            print(request.session["chat_id"])

        # Filter chats and messages based on user_id
        messages = list(Messages.objects.filter(chat_id=latest_chat).order_by("created_at").values('message', 'authur', 'like', 'dislike'))
        chats = list(Chats.objects.filter(user_id=request.user).order_by( "-last_modified" ).values("id","name"))
        
        createcontext(request, messages=messages)


        # Return JSON response
        return JsonResponse({'messages': messages, 'chats': chats})
    

@method_decorator([login_required, csrf_exempt], name='dispatch') 
class GetChat(View):
    def post(self,request):
        try:
            json_data = json.loads(request.body)
            request.session['chat_id'] = json_data.get('id')
            chat_id = request.session.get('chat_id')
            messages = list(Messages.objects.filter(chat_id=Chats.objects.get(pk=chat_id)).order_by("created_at").values("message","authur","like","dislike"))
            createcontext(request, messages=messages)
            Chats.objects.get(pk=chat_id).last_modified = timezone.now()
            chats = list(Chats.objects.filter(user_id=request.user).order_by( "-last_modified" ).values("id","name"))

            return JsonResponse({'messages': messages, 'chats': chats})
        
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Could not retrieve that chat'}, status=400)
    

@method_decorator([login_required, csrf_exempt], name='dispatch')
class Message(View):
    def post(self, request):
        try:
            message_content = json.loads(request.body)["message"]
            print(message_content)
            chat_id = request.session.get('chat_id') 
            try: 
                Chats.objects.filter(pk=chat_id).update(last_modified=timezone.now())
            except:
                chat_id = Chats.objects.create(name="New Chat", user_id=request.user).pk
                request.session['chat_id'] = chat_id
                request.session["context"] = []
            messages = request.session["context"][-5:]
            messages.append({"role": "user" , "content": message_content})
            if not message_content:
                return JsonResponse({"error": "Message content is required"}, status=400) 
            new_chat = Chats.objects.filter(name="New Chat", pk=chat_id)
            # Add your completion generation code here
            completion = client.chat.completions.create(
                            model="ft:gpt-3.5-turbo-0613:tech-day::96lGas0P",
                            messages=messages
            )
            message = Messages.objects.create(message=message_content, authur="User", chat_id=Chats.objects.get(pk=chat_id),user_id=request.user)
            message = str(completion.choices[0].message.content)
            messages.append({"role": "assistant"  , "content": message})
            request.session["context"] = messages 
            reply = Messages.objects.create(message=message, authur="LAWBOT", chat_id=Chats.objects.get(pk=chat_id),user_id=request.user).pk
            reply = list(Messages.objects.filter(pk=reply).values('message', 'authur', 'like', 'dislike'))[0]
            if new_chat.exists():
                new_chat.update(name=message_content)
            Chats.objects.get(pk=chat_id).last_modified = timezone.now()

            return JsonResponse(reply)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@method_decorator([login_required, csrf_exempt], name='dispatch')        
class Authenticated(View):
    def get(self, request):
        if User.is_authenticated:
            return  JsonResponse({'loggedIn': True})
        

@method_decorator([login_required, csrf_exempt], name='dispatch')            
class UserDetails(View):
    def get(self, request):
        data = list(User.objects.filter(pk=request.user.id).values('name', 'lastname', 'email'))[0]
        return JsonResponse(data)
    
    def post(self, request):
        form_class = UserDetailsForm
        form = UserDetailsForm(request.POST, instance=request.user)
        if form.is_valid():
            #Save passed data
            response = form.save(commit=True)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)
        
        
@method_decorator([login_required, csrf_exempt], name='dispatch')            
class DeleteChat(View):
    def post(self,request):
        try:
            json_data = json.loads(request.body)
            id = json_data.get('id')
            chat_id = request.session.get('chat_id')
            messages = Messages.objects.filter(chat_id=Chats.objects.get(pk=id)).delete()
            chats = Chats.objects.filter(pk=id).delete()
            chats = list(Chats.objects.filter(user_id=request.user).order_by( "-last_modified" ).values("id","name"))
            if chat_id == id:
                request.session['chat_id'] = None
                return JsonResponse({'messages': [], 'chats': chats})
            
            return JsonResponse({'success': True, 'chats': chats})
        
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Could not retrieve that chat'}, status=400)
