from django.db import models
import json
import datetime
from django.utils import timezone


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
