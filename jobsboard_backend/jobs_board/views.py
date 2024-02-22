from django.http import JsonResponse
import json
import math
from django.core.exceptions import ObjectDoesNotExist
from .models import Address, Contact, Education, PersonalInformation, Resume, WorkEntry, User, Job
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from django.db.models import Prefetch
from django.contrib.auth.hashers import make_password, check_password

user_email = None


@csrf_exempt
def login(request):
    global user_email
    try:
        form_data = json.loads(request.body)
        user_email = form_data.get('email')
        print('The user_email in login is ', user_email)
        user_password = form_data.get('password')
        user = User.objects.get(email=user_email)
        password_matches = check_password(user_password, user.password)
        if password_matches:
            response_data = {
                'loginMessage': "Login successful", "email": user_email, "register_type": user.register_type}
            return JsonResponse(response_data)
        else:
            # return JsonResponse({'loginMessage': 'Incorrect password'}, status=400)
            response_data = {
                'loginMessage': "Incorrect password"}
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


@csrf_exempt
@transaction.atomic
def create_job(request):
    try:
        form_data = json.loads(request.body)
        company_data = form_data.get('company')
        job_description_data = form_data.get('jobDescription')
        job_requirement_data = form_data.get('jobRequirement')
        company = company_data[0]['company']
        job_description = job_description_data[0]['job_description']
        print("company_data:", company_data)
        print("parsed description", job_description)
        position_data = form_data.get('position')
        location_data = form_data.get('location')

        # Create Job
        job = Job.objects.create(
            # email=form_data.get('email'),
            company=company_data[0]['company'],
            # Access nested data correctly
            position=position_data[0].get('position'),
            level=position_data[0].get('level'),
            pay=position_data[0].get('pay'),
            # Access nested data correctly
            country=location_data[0].get('country'),
            region=location_data[0].get('region'),
            job_description=job_description_data[0]['job_description'],
            job_requirement=job_requirement_data[0]['job_requirement']
        )
        response_data = {'postJobMessage': "Job successfully posted"}
        return JsonResponse(response_data)
    except json.JSONDecodeError as e:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        transaction.rollback(True)
        return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
def get_resume(request):
    global user_email
    # form_data = json.loads(request.body)
    # email = form_data.get('email'),
    print('The email in get resume is ', user_email)
    try:
        resume = Resume.objects.filter(contact__email=user_email).prefetch_related(
            Prefetch('personalinformation_set'),
            Prefetch('contact_set'),
            Prefetch('address_set'),
            Prefetch('education_set'),
            Prefetch('workentry_set')
        )

        if not resume.exists():
            print("No resume found for the email:", user_email)
            resume_data = ''
            return JsonResponse({'resume': resume_data})
        else:
            # Resumes found, continue processing
            # Example: Print the titles of the resumes
            print("Resume Title:", resume.title)
    except ObjectDoesNotExist:
        print("No matching email found in the database.")
    except Exception as e:
        # Handle other exceptions
        print("An error occurred:", e)

        print(resume_data)

    resume_data = [{'id': resume.id, 'title': resume.title, 'personal_information': [
        {'firstName': pi.firstName, 'lastName': pi.lastName} for pi in resume.personalinformation_set.all()],
        'contact': [{'email': c.email, 'phoneNumber': c.phoneNumber} for c in resume.contact_set.all()],
        'address': [{'country': a.country, 'streetAddress': a.streetAddress, 'city': a.city, 'postCode': a.postCode} for a in resume.address_set.all()],
        'education_entries': [{'levelOfEducation': e.levelOfEducation, 'fieldOfStudy': e.fieldOfStudy, 'schoolName': e.schoolName, 'countryOfStudy': e.countryOfStudy,
                              'studiedFrom': e.studiedFrom, 'studiedUntil': e.studiedUntil} for e in resume.education_set.all()],
        'work_entries': [{'jobTitle': w.jobTitle, 'company': w.company, 'countryOfWork': w.countryOfWork,
                          'workedFrom': w.workedFrom, 'workedUntil': w.workedUntil, 'description': w.description} for w in resume.workentry_set.all()]
    }]

    return JsonResponse({'resume': resume_data})


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


def get_all_jobs(request):
    jobs = Job.objects.all()

    job_data = [
        {'id': job.id,
         'company': job.company,
         'position': job.position,
         'level': job.level,
         'pay': job.pay,
         'country': job.country,
         'region': job.region,
         'job_description': job.job_description,
         'job_requirement': job.job_requirement

         } for job in jobs]

    return JsonResponse({'jobs': job_data})
