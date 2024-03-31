from django.urls import path,include
from .views import HomeView, SignUp, LogIn, Chat, Message, Chatroom, GetLatestChat, GetChat, LogOut

#Absolute path would look like "http://127.0.0.1:8000/chatbot/social-auth" for sign in with google href for the 
#component
urlpatterns = [
    #Path to get home page 
    path("", HomeView.as_view(), name="home"),
    #Path to get sign-up page. Use post to sumbit a json of user details 
    path("signup/", SignUp.as_view(), name="signup"),
    #Path to get sign-up page. Use post to sumbit a json of user details 
    path("login/", LogIn.as_view(), name="login"),
    #path to logout requires post
    path("logout/", LogOut.as_view(), name="logout"),
    #Basically creates a new chat window only supports post
    path("chat/", Chat.as_view(), name="chat"),
    #serve as href for the prompt submission to the backend
    path("messages/", Message.as_view(), name="messages"),
    #Path to chatroom
    path("chatroom/", Chatroom.as_view(), name="chatroom"),
    #Path to get latest chat 
    path("latestchat/", GetLatestChat.as_view(), name="loadlatestchat"),
    #path to load a chat
    path("loadchat/", GetChat.as_view(), name="loadchat"),
]


