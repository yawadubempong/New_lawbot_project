from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.shortcuts import redirect
from django.urls import reverse
from.models import User

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        # Check if the social login is new
        if not sociallogin.user:
            # Create a new user account using the email address from the social login
            user = User.objects.create_user(email=sociallogin.email_addresses.first().email)
            sociallogin.connect(request, user)
            # Redirect the user to the homepage
            return redirect(reverse('chatroom'))
        # Check if the email is already linked to a user account
        if sociallogin.email_addresses.exists():
            email = sociallogin.email_addresses.first().email
            if User.objects.filter(email=email).exists():
                # If the email is already linked to a user account, redirect to the desired page
                return redirect(reverse('login'))