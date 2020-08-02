from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import ListingSerializer, ListingDetailSerializer
from listings.models import Listing
from datetime import datetime, timezone, timedelta
from rest_framework.response import Response


class ListingsView(ListAPIView):
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListingSerializer
    lookup_field = 'slug'


class ListingDetailView(RetrieveAPIView):
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    serializer_class = ListingDetailSerializer
    lookup_field = 'slug'


class SearchView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListingSerializer

    def post(self, request, format=None):
        print(request.data)
        queryset = Listing.objects.order_by(
            '-list_date').filter(is_published=True)
        data = self.request.data
        print(queryset)

        # home_type
        home_type = data['home_type']
        if home_type != 'Any':
            queryset = queryset.filter(home_type__iexact=home_type)
        print(queryset)

        # sale_type
        sale_type = data['sale_type']
        queryset = queryset.filter(sale_type__iexact=sale_type)
        print(queryset)

        # open_house
        open_house = data['open_house']
        queryset = queryset.filter(open_house__iexact=open_house)
        print(queryset)

        # price
        price = data['price']
        print(queryset)

        if price == '$0+':
            price = 0
        elif price == '$200,000+':
            price = 200000
        elif price == '$400,000+':
            price = 400000
        elif price == '$600,000+':
            price = 600000
        elif price == '$800,000+':
            price = 800000
        elif price == '$1,000,000+':
            price = 1000000
        elif price == '$1,200,000+':
            price = 1200000
        elif price == '$1,500,000+':
            price = 1500000
        elif price == '$2,000,000+':
            price = 2000000
        elif price == 'Any':
            price = -1

        if price != -1:
            queryset = queryset.filter(price__gte=price)

        # sqft
        sqft = data['sqft']

        if sqft == '0+':
            sqft = 0
        elif sqft == '500+':
            sqft = 500
        elif sqft == '800+':
            sqft = 800
        elif sqft == '1000+':
            sqft = 1000
        elif sqft == '1200+':
            sqft = 1200
        elif sqft == '1500+':
            sqft = 1500
        elif sqft == '2000+':
            sqft = 2000
        elif sqft == 'Any':
            sqft = -1

        if sqft != -1:
            queryset = queryset.filter(sqft__gte=sqft)
        print(queryset)

        # bedrooms
        bedrooms = data['bedrooms']

        if bedrooms == '0+':
            bedrooms = 0
        elif bedrooms == '1+':
            bedrooms = 1
        elif bedrooms == '2+':
            bedrooms = 2
        elif bedrooms == '3+':
            bedrooms = 3
        elif bedrooms == '4+':
            bedrooms = 4
        elif bedrooms == '5+':
            bedrooms = 5
        elif bedrooms == '10+':
            bedrooms = 10
        elif bedrooms == 'Any':
            bedrooms = -1

        if bedrooms != -1:
            queryset = queryset.filter(bedrooms__gte=bedrooms)

        # bathrooms
        bathrooms = data['bathrooms']

        if bathrooms == '0+':
            bathrooms = 0.0
        elif bathrooms == '1+':
            bathrooms = 1.0
        elif bathrooms == '2+':
            bathrooms = 2.0
        elif bathrooms == '3+':
            bathrooms = 3.0
        elif bathrooms == '4+':
            bathrooms = 4.0
        elif bathrooms == '5+':
            bathrooms = 5.0
        elif bathrooms == '10+':
            bathrooms = 10.0
        elif bathrooms == 'Any':
            bathrooms = -1

        if bathrooms != -1:
            queryset = queryset.filter(bathrooms__gte=bathrooms)

        # days_listed
        days_listed = data['days_listed']

        if days_listed == '1 or less':
            days_listed = 1
        elif days_listed == '3 or less':
            days_listed = 3
        elif days_listed == '5 or less':
            days_listed = 5
        elif days_listed == '10 or less':
            days_listed = 10
        elif days_listed == '20 or less':
            days_listed = 20
        elif days_listed == '30 or less':
            days_listed = 30
        elif days_listed == 'Any':
            days_listed = -1

        if days_listed != -1:
            for qs in queryset:
                num_days = (datetime.now(timezone.utc) - qs.list_date).days

                if num_days > days_listed:
                    slug = qs.slug
                    queryset = queryset.exclude(slug__iexact=slug)

        # has_photos
        has_photos = data['has_photos']
        print("photooooooooooooooooo",has_photos)

        if has_photos == '0+':
            has_photos = 0
        elif has_photos == '3+':
            has_photos = 3
        elif has_photos == '5+':
            has_photos = 5
        elif has_photos == '10+':
            has_photos = 10
        elif has_photos == '15+':
            has_photos = 15
        elif has_photos == 'Any':
            has_photos = -1
        print("photooooooooooooooooo",has_photos)

        if has_photos != -1:
            for qs in queryset:
                count = 0
                if qs.photo_1:
                    count += 1
                if qs.photo_2:
                    count += 1
                if qs.photo_3:
                    count += 1
                if qs.photo_4:
                    count += 1
                if qs.photo_5:
                    count += 1
                if qs.photo_6:
                    count += 1
                if qs.photo_7:
                    count += 1
                if qs.photo_8:
                    count += 1
                if qs.photo_9:
                    count += 1
                if qs.photo_10:
                    count += 1
                if qs.photo_11:
                    count += 1
                if qs.photo_12:
                    count += 1
                if qs.photo_13:
                    count += 1
                if qs.photo_14:
                    count += 1
                if qs.photo_15:
                    count += 1
                if qs.photo_16:
                    count += 1
                if qs.photo_17:
                    count += 1
                if qs.photo_18:
                    count += 1
                if qs.photo_19:
                    count += 1
                if qs.photo_20:
                    count += 1

                if count < has_photos:
                    slug = qs.slug
                    queryset = queryset.exclude(slug__iexact=slug)

        # keywords
        keywords = data.get('keywords')
        if keywords:
            queryset = queryset.filter(description__icontains=keywords)

        # serializer
        serializer = ListingSerializer(queryset, many=True)
        return Response(serializer.data)
