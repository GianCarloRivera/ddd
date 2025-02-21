from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BurgerViewSet, OrderViewSet, index

router = DefaultRouter()
router.register(r'burgers', BurgerViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', index, name='index'),
    path('react/', index, {'framework': 'react'}, name='react'),
    path('angular/', index, {'framework': 'angular'}, name='angular'),
] 