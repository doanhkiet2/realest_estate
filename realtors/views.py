from .serializers import RealtorSerializer
from .models import Realtor
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
# Create your views here.


class RealtorListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer
    pagination_class = None


class RealtorView(RetrieveAPIView):
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer


class TopSellerView(ListAPIView):
    permission_classes =  (permissions.AllowAny,)
    queryset = Realtor.objects.filter(top_seller=True)
    serializer_class = RealtorSerializer
    pagination_class = None