from django.db import models

class Service(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=200)
    short_description = models.CharField(max_length=500)
    full_description = models.TextField()
    icon = models.CharField(max_length=50, help_text="e.g. FaUserTie")
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    is_visible = models.BooleanField(default=True)
    show_on_home = models.BooleanField(default=True)
    show_in_listing = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class ServiceFeature(models.Model):
    service = models.ForeignKey(Service, related_name='features', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class ServiceProcess(models.Model):
    service = models.ForeignKey(Service, related_name='process', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Country(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    short_description = models.CharField(max_length=500)
    overview = models.TextField()
    banner_image = models.ImageField(upload_to='countries/', blank=True, null=True)
    is_visible = models.BooleanField(default=True)
    show_on_home = models.BooleanField(default=True)
    show_in_listing = models.BooleanField(default=True)
    show_in_footer = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Countries"

    def __str__(self):
        return self.name

class CountryFact(models.Model):
    country = models.ForeignKey(Country, related_name='key_facts', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.label}: {self.value}"

class CountryWhyStudy(models.Model):
    country = models.ForeignKey(Country, related_name='why_study', on_delete=models.CASCADE)
    reason = models.CharField(max_length=300)

    def __str__(self):
        return self.reason

class CountryRequirement(models.Model):
    country = models.ForeignKey(Country, related_name='requirements', on_delete=models.CASCADE)
    requirement = models.CharField(max_length=300)

    def __str__(self):
        return self.requirement

class University(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=200)
    country = models.ForeignKey(Country, related_name='universities', on_delete=models.CASCADE)
    location = models.CharField(max_length=200)
    ranking = models.CharField(max_length=50)
    tuition_fee = models.CharField(max_length=100, blank=True, null=True)
    overview = models.TextField()
    logo = models.ImageField(upload_to='universities/logos/', blank=True, null=True)
    banner_image = models.ImageField(upload_to='universities/banners/', blank=True, null=True)
    show_in_listing = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Universities"

    def __str__(self):
        return self.name

class UniversityStat(models.Model):
    university = models.ForeignKey(University, related_name='key_stats', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.label}: {self.value}"

class UniversityCourse(models.Model):
    university = models.ForeignKey(University, related_name='popular_courses', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    duration = models.CharField(max_length=100, blank=True, null=True)
    fee = models.CharField(max_length=100, blank=True, null=True)
    intake = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name

class UniversityFacility(models.Model):
    university = models.ForeignKey(University, related_name='facilities', on_delete=models.CASCADE)
    facility_name = models.CharField(max_length=200)

    def __str__(self):
        return self.facility_name

class Enquiry(models.Model):
    STATUS_CHOICES = (
        ('New', 'New'),
        ('Contacted', 'Contacted'),
        ('Converted', 'Converted'),
        ('Dead', 'Dead'),
    )

    lead_type = models.CharField(max_length=100, default="General Enquiry")
    lead_reference = models.CharField(max_length=200, blank=True, null=True)
    
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
    # Specific form fields
    interested_country = models.CharField(max_length=100, blank=True, null=True)
    interested_course = models.CharField(max_length=200, blank=True, null=True)
    service_type = models.CharField(max_length=100, blank=True, null=True)
    preferred_date = models.DateField(blank=True, null=True)
    preferred_time = models.CharField(max_length=100, blank=True, null=True)
    target_destination = models.CharField(max_length=200, blank=True, null=True)
    current_education = models.CharField(max_length=200, blank=True, null=True)
    english_test = models.CharField(max_length=100, blank=True, null=True)
    intake_year = models.CharField(max_length=100, blank=True, null=True)
    
    message = models.TextField(blank=True, null=True)
    
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='New')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Enquiries"

    def __str__(self):
        return f"{self.full_name} - {self.lead_type}"

class Program(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    duration = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    average_fee = models.CharField(max_length=100)
    career_opportunities = models.JSONField(default=list)
    skills = models.JSONField(default=list)
    requirements = models.JSONField(default=list)
    universities = models.JSONField(default=list)
    show_in_listing = models.BooleanField(default=True)

    def __str__(self):
        return self.name
