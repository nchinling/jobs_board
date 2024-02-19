from django.db import models
import json
import datetime
from django.utils import timezone
from django.db.models import Prefetch


class Resume(models.Model):
    title = models.CharField(max_length=255)


class PersonalInformation(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)


class Contact(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    email = models.EmailField()
    phoneNumber = models.CharField(max_length=20)


class Address(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    country = models.CharField(max_length=255)
    streetAddress = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    postCode = models.CharField(max_length=20)


class Education(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    levelOfEducation = models.CharField(max_length=255)
    fieldOfStudy = models.CharField(max_length=255)
    schoolName = models.CharField(max_length=255)
    countryOfStudy = models.CharField(max_length=255)
    studiedFrom = models.DateTimeField(blank=True)
    studiedUntil = models.DateTimeField(default=timezone.now, blank=True)


class WorkEntry(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    jobTitle = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    countryOfWork = models.CharField(max_length=255)
    workedFrom = models.DateTimeField(default=timezone.now, blank=True)
    workedUntil = models.DateTimeField(default=timezone.now, blank=True)
    description = models.TextField()


class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, primary_key=True)
    password = models.CharField(max_length=255)
    # Assuming register type is either 'employee' or 'employer'
    register_type = models.CharField(max_length=10)
    # Allow the company field to be optional
    company = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Job(models.Model):
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    level = models.CharField(max_length=50)
    pay = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    region = models.CharField(max_length=50)
    job_description = models.TextField()
    job_requirement = models.TextField()
