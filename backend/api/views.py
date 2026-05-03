from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from .models import Service, Country, University, Enquiry, Program
from .serializers import ServiceSerializer, CountrySerializer, UniversitySerializer, EnquirySerializer, ProgramSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    lookup_field = 'slug'

class CountryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    lookup_field = 'slug'

class UniversityViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    lookup_field = 'slug'

class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'success': True, 'message': 'Enquiry submitted successfully.'}, status=status.HTTP_201_CREATED)

class ProgramViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    lookup_field = 'slug'
