from django import forms
from .models import Contact


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'phone', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'نام و نام خانوادگی خود را وارد کنید',
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'شماره تماس شما',
                'inputmode': 'tel',
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'پیام خود را بنویسید...',
                'rows': 4,
            }),
        }
        labels = {
            'name': 'نام و نام خانوادگی',
            'phone': 'تلفن تماس',
            'message': 'متن پیام',
        }
