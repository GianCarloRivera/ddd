from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Burger, Order
from .serializers import BurgerSerializer, OrderSerializer

# API ViewSets
class BurgerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Burger.objects.all()
    serializer_class = BurgerSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Template Views
def index(request, framework=None):
    context = {
        'burgers': Burger.objects.all(),
        'use_react': framework == 'react',
        'use_angular': framework == 'angular'
    }
    return render(request, 'index.html', context) 