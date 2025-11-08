import re
from django import forms
from .models import Contact


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'phone', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'نام شما'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'شماره تماس'}),
            'message': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'پیام شما', 'rows': 4}),
        }

    def clean_name(self):
        name = self.cleaned_data['name'].strip()
        return re.sub(r'\s+', ' ', name)

    def clean_phone(self):
        phone = self.cleaned_data['phone'].strip()
        # حذف فاصله‌ها و بررسی ساده شماره
        if not re.match(r'^[0-9۰-۹\-\+\s]+$', phone):
            raise forms.ValidationError("شماره تماس معتبر نیست.")
        return phone

    def clean_message(self):
        message = self.cleaned_data['message'].strip()
        return re.sub(r'\s+', ' ', message)
