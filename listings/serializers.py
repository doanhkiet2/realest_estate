from rest_framework import serializers
from .models import Listing


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = (
            'city',
            'state',
            'zipcode',
            'address',
            'realtor',
            'slug',
            'title',
            'home_type',
            'sale_type',
            'description',
            'price',
            'sqft',
            'bedrooms',
            'bathrooms',
            'open_house',
            'photo_main',
        )

class  ListingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'
