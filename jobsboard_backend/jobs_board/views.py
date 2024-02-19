from django.http import JsonResponse
import json
import math
from .models import Address, Contact, Education, PersonalInformation, Resume, WorkEntry, User
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from django.db.models import Prefetch
from django.contrib.auth.hashers import make_password, check_password


@csrf_exempt
def login(request):
    try:
        form_data = json.loads(request.body)
        user_email = form_data.get('email')
        user_password = form_data.get('password')
        user = User.objects.get(email=user_email)
        password_matches = check_password(user_password, user.password)
        if password_matches:
            response_data = {'loginMessage': "Login successful"}
            return JsonResponse(response_data)
        else:
            # return JsonResponse({'loginMessage': 'Incorrect password'}, status=400)
            response_data = {'loginMessage': "Incorrect password"}
            return JsonResponse(response_data)
    except User.DoesNotExist:
        # Handle user not found
        # Return some response indicating the user doesn't exist, e.g., return a JSON response
        return JsonResponse({'loginMessage': 'Account not found'})


@csrf_exempt
def logout(request):
    return JsonResponse({'logoutMessage': 'Logged out successfully'})


@csrf_exempt
@transaction.atomic
def create_resume(request):
    try:
        form_data = json.loads(request.body)

        # Create a Resume
        resume = Resume.objects.create(
            title=form_data.get('resumeTitle', 'Default Title'))

        # Save data to models
        personal_information = PersonalInformation.objects.create(
            resume=resume, **form_data.get('personalInformation', [])[0])
        contact = Contact.objects.create(
            resume=resume, **form_data.get('contact', [])[0])
        address = Address.objects.create(
            resume=resume, **form_data.get('address', [])[0])

        for education_entry in form_data.get('educationEntries', []):
            Education.objects.create(resume=resume, **education_entry)

        for work_entry in form_data.get('workEntries', []):
            WorkEntry.objects.create(resume=resume, **work_entry)

        response_data = {'registerMessage': "Resume successfully created"}
        return JsonResponse(response_data)
    except json.JSONDecodeError as e:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        transaction.rollback(True)
        return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
@transaction.atomic
def create_user_account(request):
    try:
        form_data = json.loads(request.body)

        # Create User
        user = User.objects.create(
            name=form_data.get('name'),
            email=form_data.get('email'),
            password=make_password(form_data.get('password')),
            register_type=form_data.get('registerType'),
            company=form_data.get('company', '')
        )
        response_data = {'registerMessage': "User successfully registered"}
        return JsonResponse(response_data)
    except json.JSONDecodeError as e:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        transaction.rollback(True)
        return JsonResponse({'error': str(e)}, status=400)


def get_resume_by_email(email):
    # Assuming email is unique in Contact model, retrieve Contact instance
    contact_instance = get_object_or_404(Contact, email=email)

    # Access the associated Resume through the foreign key relationship
    resume_instance = contact_instance.resume

    return resume_instance


def get_all_resumes(request):
    resumes = Resume.objects.all().prefetch_related(
        Prefetch('personalinformation_set',
                 queryset=PersonalInformation.objects.all()),
        Prefetch('contact_set', queryset=Contact.objects.all()),
        Prefetch('address_set', queryset=Address.objects.all()),
        Prefetch('education_set', queryset=Education.objects.all()),
        Prefetch('workentry_set', queryset=WorkEntry.objects.all())
    )

    resume_data = [{'id': resume.id, 'title': resume.title, 'personal_information': [
        {'firstName': pi.firstName, 'lastName': pi.lastName} for pi in resume.personalinformation_set.all()],
        'contact': [{'email': c.email, 'phoneNumber': c.phoneNumber} for c in resume.contact_set.all()],
        'address': [{'country': a.country, 'streetAddress': a.streetAddress, 'city': a.city, 'postCode': a.postCode} for a in resume.address_set.all()],
        'education_entries': [{'levelOfEducation': e.levelOfEducation, 'fieldOfStudy': e.fieldOfStudy, 'schoolName': e.schoolName, 'countryOfStudy': e.countryOfStudy,
                              'studiedFrom': e.studiedFrom, 'studiedUntil': e.studiedUntil} for e in resume.education_set.all()],
        'work_entries': [{'jobTitle': w.jobTitle, 'company': w.company, 'countryOfWork': w.countryOfWork,
                          'workedFrom': w.workedFrom, 'workedUntil': w.workedUntil, 'description': w.description} for w in resume.workentry_set.all()]
    } for resume in resumes]

    return JsonResponse({'resumes': resume_data})
