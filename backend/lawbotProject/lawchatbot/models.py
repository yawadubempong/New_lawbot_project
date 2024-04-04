from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin
from django.db import models
from django.utils import timezone


#Gravitar
import hashlib

def gravatar_url(email, size=200, default='identicon'):
    """Generate a Gravatar URL for the given email."""
    # Convert email to lowercase and remove leading/trailing whitespace
    email = email.lower().strip()
    # Compute the MD5 hash of the email
    hash_value = hashlib.md5(email.encode('utf-8')).hexdigest()
    # Construct the Gravatar URL
    return f'https://www.gravatar.com/avatar/{hash_value}?s={size}&d={default}'

# Create your models here.

class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_feilds):
        if not email:
            raise ValueError("You have not provided a valid email address")
    
        email = self.normalize_email(email)
        user = self.model(email=email, ** extra_feilds)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    def create_user(self, email = None, password = None, **extra_fields):
        extra_fields.setdefault('is_staff',False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email = None, password = None, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)


#User profiles
class User(AbstractBaseUser, PermissionsMixin):
    # Add custom fields here
    email = models.EmailField(blank=True, default='',unique=True) 
    name = models.CharField(max_length=255, blank = True, default="")
    lastname = models.CharField(max_length=255, blank = True, default="")
    
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        
    def get_full_name(self):
        return self.name + self.lastname
    
    def get_short_name(self):
        return self.name or self.email.split('@')[0]
        
#Chats model
class Chats(models.Model):
    name = models.TextField(blank=False, null=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,null=False)
    last_modified = models.DateTimeField(auto_now= True)
    created_at = models.DateTimeField(auto_now_add=True)

#Messages Model
class Messages(models.Model):
        message = models.TextField()
        authur = models.TextField()
        like = models.BooleanField(default=False)
        dislike = models.BooleanField(default=False)
        user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
        chat_id = models.ForeignKey(Chats,on_delete=models.CASCADE ,null=False)
        created_at = models.DateTimeField(auto_now_add=True)


