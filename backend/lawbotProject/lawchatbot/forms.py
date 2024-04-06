from allauth.account.forms import SignupForm as AllauthSignupForm
from django import forms
from .models import User

class CustomSignupForm(AllauthSignupForm):
    name = forms.CharField(max_length=30, label='First Name')
    lastname = forms.CharField(max_length=30, label='Last Name', required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].label = 'Email'
        self.fields['password1'].label = 'Password'
        self.fields['password2'].label = 'Confirm Password'

    def save(self, request):
        user = super().save(request)
        user.name = self.cleaned_data['name']
        user.lastname = self.cleaned_data['lastname']
        user.save()
        return user
    
class UserDetailsForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name','lastname']

    def clean(self):
        cleaned_data = super().clean()
        instance = getattr(self, 'instance', None)

        if instance:
            for field_name in ['name', 'lastname']:
                # Get the original value of the field from the instance
                original_value = getattr(instance, field_name)
                # Get the cleaned value from the form
                cleaned_value = cleaned_data.get(field_name)
                # If the cleaned value is empty, set it to the original value
                if cleaned_value == '':
                    cleaned_data[field_name] = original_value

        return cleaned_data