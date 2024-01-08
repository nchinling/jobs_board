from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Address, Contact, Education, PersonalInformation, Resume, WorkEntry

admin.site.register(Resume)
admin.site.register(Address)
admin.site.register(Contact)
admin.site.register(Education)
admin.site.register(PersonalInformation)
admin.site.register(WorkEntry)
