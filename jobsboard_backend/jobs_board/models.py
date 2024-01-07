import datetime
from django.db import models


class UserResume(models.Model):
    # Personal Information
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)

    # Contact
    email = models.EmailField()
    phoneNumber = models.CharField(max_length=20)

    # Address
    country = models.CharField(max_length=255)
    streetAddress = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    postCode = models.CharField(max_length=20)

    # Education
    # educationEntries = models.JSONField()
    # levelOfEducation = models.CharField(max_length=255)
    # fieldOfStudy = models.CharField(max_length=255)
    # schoolName = models.CharField(max_length=255)
    # countryOfStudy = models.CharField(max_length=255)
    # studiedFrom = models.DateField(null=True, blank=True)
    # studiedUntil = models.DateField(null=True, blank=True)

    # Work Experience
    jobTitle = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    countryOfWork = models.CharField(max_length=255)
    workedFrom = models.DateField(null=True, blank=True)
    workedUntil = models.DateField(null=True, blank=True)
    description = models.TextField()

    def __str__(self):
        return f"{self.firstName} {self.lastName}'s Profile"


class EducationEntry(models.Model):
    user_resume = models.ForeignKey(UserResume, on_delete=models.CASCADE)
    levelOfEducation = models.CharField(max_length=255)
    fieldOfStudy = models.CharField(max_length=255)
    schoolName = models.CharField(max_length=255)
    countryOfStudy = models.CharField(max_length=255)
    studiedFrom = models.DateField(null=True, blank=True)
    studiedUntil = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.user_resume.firstName} {self.user_resume.lastName}'s Education Entry"
