import re
import logging
from django.contrib import messages
from django.shortcuts import render, redirect
from .models import Service, Project, TeamMember
from .forms import ContactForm

logger = logging.getLogger(__name__)


def index(request):
    services = Service.objects.all()
    projects = Project.objects.all()
    team = TeamMember.objects.all()
    form = ContactForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            # پاک‌سازی داده‌ها
            contact = form.save(commit=False)
            contact.name = re.sub(r'\s+', ' ', contact.name.strip())
            contact.phone = contact.phone.strip()
            contact.message = re.sub(r'\s+', ' ', contact.message.strip())
            contact.save()

            # ثبت در لاگ
            logger.info(f"📨 پیام جدید از {contact.name} ({contact.phone}) در تاریخ {contact.created_at}")

            # پیام موفقیت برای کاربر
            messages.success(request, "✅ پیام شما با موفقیت ارسال شد!")
            return redirect('core:index')

        else:
            # ثبت خطا در لاگ برای بررسی‌های بعدی
            logger.warning(f"❌ خطا در ارسال فرم تماس: {form.errors.as_json()}")
            messages.error(request, "⚠️ لطفاً اطلاعات را به درستی وارد کنید.")

    context = {
        'services': services,
        'projects': projects,
        'team': team,
        'form': form,
    }
    return render(request, 'index.html', context)
