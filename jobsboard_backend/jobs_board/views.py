from django.shortcuts import render
from django.http import JsonResponse
import json
from django.middleware.csrf import get_token
import math
from scipy.stats import norm
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def create_user_account(request):
    if request.method == 'POST':
        try:
            form_data = json.loads(request.body)

            print(f'Form data received: {form_data}')

            # Form data
            lastName = form_data['lastName']

            response_data = {'registerMessage': "Account has been created"}

            return JsonResponse(response_data)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
