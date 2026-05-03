from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, CountryViewSet, UniversityViewSet, EnquiryViewSet, ProgramViewSet

router = DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'countries', CountryViewSet)
router.register(r'universities', UniversityViewSet)
router.register(r'enquiries', EnquiryViewSet)
router.register(r'programs', ProgramViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
