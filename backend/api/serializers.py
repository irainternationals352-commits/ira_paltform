from rest_framework import serializers
import json
from .models import (
    Service, ServiceFeature, ServiceProcess,
    Country, CountryFact, CountryWhyStudy, CountryRequirement,
    University, UniversityStat, UniversityCourse, UniversityFacility,
    Enquiry, Program
)

def parse_json_list(value, field_name):
    if value in (None, ''):
        return []
    if isinstance(value, str):
        try:
            parsed = json.loads(value)
        except json.JSONDecodeError:
            raise serializers.ValidationError({field_name: 'Invalid JSON list.'})
        if not isinstance(parsed, list):
            raise serializers.ValidationError({field_name: 'Expected a list.'})
        return parsed
    return value

# Service Serializers
class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ['id', 'name']

class ServiceProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProcess
        fields = ['id', 'name']

class ServiceSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, required=False)
    process = ServiceProcessSerializer(many=True, required=False)

    class Meta:
        model = Service
        fields = ['id', 'slug', 'title', 'short_description', 'full_description', 'icon', 'image', 'features', 'process']

    def to_internal_value(self, data):
        data = data.copy()
        if 'features' in data:
            data['features'] = parse_json_list(data.get('features'), 'features')
        if 'process' in data:
            data['process'] = parse_json_list(data.get('process'), 'process')
        return super().to_internal_value(data)

    def create(self, validated_data):
        features_data = validated_data.pop('features', [])
        process_data = validated_data.pop('process', [])
        
        service = Service.objects.create(**validated_data)
        
        for feature_data in features_data:
            ServiceFeature.objects.create(service=service, **feature_data)
        for process_step in process_data:
            ServiceProcess.objects.create(service=service, **process_step)
            
        return service

    def update(self, instance, validated_data):
        features_data = validated_data.pop('features', None)
        process_data = validated_data.pop('process', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if features_data is not None:
            instance.features.all().delete()
            for feature_data in features_data:
                ServiceFeature.objects.create(service=instance, **feature_data)
                
        if process_data is not None:
            instance.process.all().delete()
            for process_step in process_data:
                ServiceProcess.objects.create(service=instance, **process_step)
                
        return instance

class UniversityCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniversityCourse
        fields = ['id', 'name', 'duration', 'fee', 'intake']

class UniversityStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniversityStat
        fields = ['id', 'label', 'value']

class UniversityFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UniversityFacility
        fields = ['id', 'facility_name']

# University Serializers
class UniversitySerializer(serializers.ModelSerializer):
    key_stats = UniversityStatSerializer(many=True, required=False)
    popular_courses = UniversityCourseSerializer(many=True, required=False)
    facilities = UniversityFacilitySerializer(many=True, required=False)
    country_name = serializers.CharField(source='country.name', read_only=True)
    country = serializers.CharField(write_only=True, required=False)
    country_id = serializers.PrimaryKeyRelatedField(
        source='country', queryset=Country.objects.all(), write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = University
        fields = ['id', 'slug', 'name', 'country', 'country_id', 'country_name', 'location', 'ranking', 'tuition_fee', 'overview', 'logo', 'banner_image', 'key_stats', 'popular_courses', 'facilities']

    def to_internal_value(self, data):
        data = data.copy()
        if 'key_stats' in data:
            data['key_stats'] = parse_json_list(data.get('key_stats'), 'key_stats')
        if 'popular_courses' in data:
            data['popular_courses'] = parse_json_list(data.get('popular_courses'), 'popular_courses')
        if 'facilities' in data:
            data['facilities'] = parse_json_list(data.get('facilities'), 'facilities')
        country_value = data.get('country')

        if country_value and not data.get('country_id'):
            try:
                data['country_id'] = Country.objects.get(name__iexact=str(country_value).strip()).id
            except Country.DoesNotExist:
                raise serializers.ValidationError({'country': 'Selected country does not exist.'})

        data.pop('country', None)
        return super().to_internal_value(data)

    def validate(self, attrs):
        if attrs.get('country') is None:
            attrs.pop('country', None)

        if self.instance is None and 'country' not in attrs:
            raise serializers.ValidationError({'country': 'This field is required.'})

        return attrs

    def create(self, validated_data):
        key_stats_data = validated_data.pop('key_stats', [])
        popular_courses_data = validated_data.pop('popular_courses', [])
        facilities_data = validated_data.pop('facilities', [])
        
        university = University.objects.create(**validated_data)
        
        for stat_data in key_stats_data:
            UniversityStat.objects.create(university=university, **stat_data)
        for course_data in popular_courses_data:
            UniversityCourse.objects.create(university=university, **course_data)
        for facility_data in facilities_data:
            UniversityFacility.objects.create(university=university, **facility_data)
            
        return university

    def update(self, instance, validated_data):
        key_stats_data = validated_data.pop('key_stats', None)
        popular_courses_data = validated_data.pop('popular_courses', None)
        facilities_data = validated_data.pop('facilities', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if key_stats_data is not None:
            instance.key_stats.all().delete()
            for stat_data in key_stats_data:
                UniversityStat.objects.create(university=instance, **stat_data)
                
        if popular_courses_data is not None:
            instance.popular_courses.all().delete()
            for course_data in popular_courses_data:
                UniversityCourse.objects.create(university=instance, **course_data)
                
        if facilities_data is not None:
            instance.facilities.all().delete()
            for facility_data in facilities_data:
                UniversityFacility.objects.create(university=instance, **facility_data)
                
        return instance

# Country Serializers
class CountryFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryFact
        fields = ['id', 'label', 'value']

class CountryWhyStudySerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='reason')
    class Meta:
        model = CountryWhyStudy
        fields = ['id', 'name']

class CountryRequirementSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='requirement')
    class Meta:
        model = CountryRequirement
        fields = ['id', 'name']

class CountrySerializer(serializers.ModelSerializer):
    key_facts = CountryFactSerializer(many=True, required=False)
    why_study = CountryWhyStudySerializer(many=True, required=False)
    requirements = CountryRequirementSerializer(many=True, required=False)
    universities = UniversitySerializer(many=True, read_only=True)

    class Meta:
        model = Country
        fields = ['id', 'slug', 'name', 'short_description', 'overview', 'banner_image', 'key_facts', 'why_study', 'requirements', 'universities']

    def to_internal_value(self, data):
        data = data.copy()
        if 'key_facts' in data:
            data['key_facts'] = parse_json_list(data.get('key_facts'), 'key_facts')
        if 'why_study' in data:
            data['why_study'] = parse_json_list(data.get('why_study'), 'why_study')
        if 'requirements' in data:
            data['requirements'] = parse_json_list(data.get('requirements'), 'requirements')
        return super().to_internal_value(data)

    def create(self, validated_data):
        key_facts_data = validated_data.pop('key_facts', [])
        why_study_data = validated_data.pop('why_study', [])
        requirements_data = validated_data.pop('requirements', [])
        
        country = Country.objects.create(**validated_data)
        
        for fact_data in key_facts_data:
            CountryFact.objects.create(country=country, **fact_data)
        for reason_data in why_study_data:
            CountryWhyStudy.objects.create(country=country, **reason_data)
        for req_data in requirements_data:
            CountryRequirement.objects.create(country=country, **req_data)
            
        return country

    def update(self, instance, validated_data):
        key_facts_data = validated_data.pop('key_facts', None)
        why_study_data = validated_data.pop('why_study', None)
        requirements_data = validated_data.pop('requirements', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if key_facts_data is not None:
            instance.key_facts.all().delete()
            for fact_data in key_facts_data:
                CountryFact.objects.create(country=instance, **fact_data)
                
        if why_study_data is not None:
            instance.why_study.all().delete()
            for reason_data in why_study_data:
                CountryWhyStudy.objects.create(country=instance, **reason_data)
                
        if requirements_data is not None:
            instance.requirements.all().delete()
            for req_data in requirements_data:
                CountryRequirement.objects.create(country=instance, **req_data)
                
        return instance

# Enquiry Serializer
class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        exclude = ['status', 'created_at'] # We don't need client sending status or created_at

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'
