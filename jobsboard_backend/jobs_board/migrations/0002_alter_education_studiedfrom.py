# Generated by Django 4.2.9 on 2024-01-08 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("jobs_board", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="education",
            name="studiedFrom",
            field=models.DateTimeField(blank=True),
        ),
    ]
