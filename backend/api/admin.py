from django.contrib import admin
from .models import (
    Service, ServiceFeature, ServiceProcess,
    Country, CountryFact, CountryWhyStudy, CountryRequirement,
    University, UniversityStat, UniversityCourse, UniversityFacility,
    Enquiry
)

# Service Admin
class ServiceFeatureInline(admin.TabularInline):
    model = ServiceFeature
    extra = 1

class ServiceProcessInline(admin.TabularInline):
    model = ServiceProcess
    extra = 1

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ServiceFeatureInline, ServiceProcessInline]

# Country Admin
class CountryFactInline(admin.TabularInline):
    model = CountryFact
    extra = 1

class CountryWhyStudyInline(admin.TabularInline):
    model = CountryWhyStudy
    extra = 1

class CountryRequirementInline(admin.TabularInline):
    model = CountryRequirement
    extra = 1

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [CountryFactInline, CountryWhyStudyInline, CountryRequirementInline]

# University Admin
class UniversityStatInline(admin.TabularInline):
    model = UniversityStat
    extra = 1

class UniversityCourseInline(admin.TabularInline):
    model = UniversityCourse
    extra = 1

class UniversityFacilityInline(admin.TabularInline):
    model = UniversityFacility
    extra = 1

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'ranking')
    list_filter = ('country',)
    search_fields = ('name', 'location')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [UniversityStatInline, UniversityCourseInline, UniversityFacilityInline]

# Enquiry Admin
@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'lead_type', 'status', 'created_at')
    list_filter = ('status', 'lead_type', 'created_at')
    search_fields = ('full_name', 'email', 'phone')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Lead Information', {
            'fields': ('status', 'lead_type', 'lead_reference', 'created_at')
        }),
        ('Personal Details', {
            'fields': ('full_name', 'email', 'phone')
        }),
        ('Specific Enquiry Details', {
            'fields': (
                'interested_country', 'interested_course', 
                'service_type', 'preferred_date', 'preferred_time',
                'target_destination', 'current_education', 'english_test', 'intake_year'
            )
        }),
        ('Message', {
            'fields': ('message',)
        }),
    )
