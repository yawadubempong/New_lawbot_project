import json
from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt 
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from django.utils import timezone   
from . models import User, Chats, Messages
from allauth.account.views import LoginView as allLogin 
from allauth.account.views import LogoutView as allLogout
from allauth.account.views import SignupView as allSignup
from django.forms.models import model_to_dict

#Open AI integration 
from openai import OpenAI

client = OpenAI(api_key="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")


# Create your views here.
class HomeView(View):
    def get(self, request):
        return render(request, "index.html")
         

@method_decorator(ensure_csrf_cookie, name='dispatch')
class SignUp(allSignup):
    def get(self, request):
        return render(request, "index.html")
    
class GoogleSignUp():
    pass
    

@method_decorator(ensure_csrf_cookie, name='dispatch')     
class LogIn(allLogin):
    #Overide standard login template
    template_name="index.html" 
    
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            # If the user is already logged in, redirect to home
            return redirect('home')
        return super().dispatch(request, *args, **kwargs)
            
            
@method_decorator(ensure_csrf_cookie, name='dispatch')     
class LogOut(allLogout):
    #Overide standard login template
    template_name="index.html" 
    


@method_decorator([login_required, csrf_exempt], name='dispatch')
class Chat(View):
    def post(self, request):
        # Create a new chat object and save it to the database
        chat = Chats.objects.create(name="New Chat", user_id=request.user)
        
        # Retrieve the chat object from the database as a dictionary
        chats = list(Chats.objects.filter(pk=chat.pk).values("id", "name"))
        
        # Store the chat ID in the session
        request.session["chat_id"] = chat.pk
        
        # Return the serialized chat data as a JSON response
        return JsonResponse({'chats': chats})
    
    
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
        else:
            chat = Chats.objects.create(name="New Chat", user_id=request.user)
            chat.save()
            request.session["chat_id"] = chat.pk

        # Filter chats and messages based on user_id
        messages = list(Messages.objects.filter(chat_id=latest_chat).order_by("created_at").values('message', 'authur', 'like', 'dislike'))
        chats = list(Chats.objects.filter(user_id=request.user).order_by( "last_modified" ).values("id","name"))


        # Return JSON response
        return JsonResponse({'messages': messages, 'chats': chats})
    

@method_decorator([login_required, csrf_exempt], name='dispatch') 
class GetChat(View):
    def post(self,request):
        try:
            json_data = json.loads(request.body)
            request.session['chat_id'] = json_data.get('chat_id')
            messages = list(Messages.objects.filter(chat_id=json_data.get('chat_id')).order_by("-created_at").values("message","authur","like","dislike"))
            return JsonResponse({'messages': messages})
        
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Could not retrieve that chat'}, status=400)
    

@method_decorator([login_required, csrf_exempt], name='dispatch')
class Message(View):
    def post(self, request):
        #try:
            message_content = json.loads(request.body)["message"]
            print(message_content)
            if not message_content:
                return JsonResponse({"error": "Message content is required"}, status=400)
            
            chat_id = request.session.get('chat_id')
            Chats.objects.filter(pk=chat_id).update(last_modified=timezone.now())
            new_chat = Chats.objects.filter(name="New Chat", pk=chat_id)
            if new_chat.exists():
                new_chat.update(name=message_content)
            
            # Add your completion generation code here
            completion = client.chat.completions.create(
                            model="ft:gpt-3.5-turbo-0613:tech-day::96lGas0P",
                            messages=[
                            {"role": "system", "content": "You are a Lawhelp assistant"},
                            {"role": "user", "content": message_content}
                        ]
            )
            message = Messages.objects.create(message=message_content, authur="User", chat_id=Chats.objects.get(pk=chat_id),user_id=request.user)
            message.save()
            message = str(completion.choices[0].message.content)
            reply = Messages.objects.create(message=message, authur="LAWBOT", chat_id=Chats.objects.get(pk=chat_id),user_id=request.user).pk
            reply = list(Messages.objects.filter(pk=reply).values('message', 'authur', 'like', 'dislike'))

            return JsonResponse({'message': reply})
        #except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)