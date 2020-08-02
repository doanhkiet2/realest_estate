from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from .models import Contact
# Create your views here.


class ContactCreateView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        print(data)

        try:
            send_mail(
                data['subject'],
                'Name: '
                + data['name']
                + '\nEmail: '
                + data['email']
                + '\n\n Massage:\n'
                + data['message'],
                'doanhkiet2@gmail.com',
                ['doanhkiet2@gmail.com'],
                fail_silently=False
            )

            contact = Contact(name=data['name'], email=data['email'],
                              subject=data['subject'], message=data['message'])
            contact.save()
            return Response({'success': 'Message sent successfully'})

        except:
            return Response({'fail': 'Message failed to send'})
