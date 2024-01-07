# Generated by Django 4.2.4 on 2024-01-07 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="UserResume",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("firstName", models.CharField(max_length=255)),
                ("lastName", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=254)),
                ("phoneNumber", models.CharField(max_length=20)),
                ("country", models.CharField(max_length=255)),
                ("streetAddress", models.CharField(max_length=255)),
                ("city", models.CharField(max_length=255)),
                ("postCode", models.CharField(max_length=20)),
                ("levelOfEducation", models.CharField(max_length=255)),
                ("fieldOfStudy", models.CharField(max_length=255)),
                ("schoolName", models.CharField(max_length=255)),
                ("countryOfStudy", models.CharField(max_length=255)),
                ("studiedFrom", models.DateField(blank=True, null=True)),
                ("studiedUntil", models.DateField(blank=True, null=True)),
                ("jobTitle", models.CharField(max_length=255)),
                ("company", models.CharField(max_length=255)),
                ("countryOfWork", models.CharField(max_length=255)),
                ("workedFrom", models.DateField(blank=True, null=True)),
                ("workedUntil", models.DateField(blank=True, null=True)),
                ("description", models.TextField()),
            ],
        ),
    ]
