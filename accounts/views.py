from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
User = get_user_model()


class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password != password2:
            return Response({'error': 'Passwords do not match'})

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'})

        if len(password) < 2:
            return Response({'error': 'Passwords must be at least 2 character'})

        user = User.objects.create_user(
            email=email, password=password, name=name)
        user.save()
        return Response({'success': 'User create successfully'})
