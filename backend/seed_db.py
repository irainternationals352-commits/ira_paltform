import os
import django
import sys

# Set up Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import (
    Service, ServiceFeature, ServiceProcess,
    Country, CountryFact, CountryWhyStudy, CountryRequirement,
    University, UniversityStat, UniversityCourse, UniversityFacility
)

mockData = {
  "services": [
    { 
      "slug": "career-counselling", 
      "title": "Career Counselling", 
      "short_description": "Expert guidance to choose the right career path and university.", 
      "icon": "FaUserTie", 
      "full_description": "Our career counselling service helps you identify your strengths, interests, and career goals. We use psychometric testing and expert consultations to match you with the perfect course and university.",
      "features": ["Psychometric Assessment", "1-on-1 Mentorship", "Career Path Mapping", "Industry Insights"],
      "process": ["Initial Assessment", "Goal Setting", "University Shortlisting", "Final Selection"]
    },
    { 
      "slug": "university-selection", 
      "title": "University Selection", 
      "short_description": "Help in finding the best universities matching your profile.", 
      "icon": "FaUniversity", 
      "full_description": "With thousands of universities worldwide, finding the right fit can be overwhelming. We shortlist universities based on your academic profile, budget, location preferences, and career aspirations.",
      "features": ["Profile Evaluation", "Budget Planning", "Scholarship Matching", "Alumni Connect"],
      "process": ["Profile Analysis", "Requirement Gathering", "Shortlisting 10-15 Universities", "Finalizing Top 5"]
    },
    { 
      "slug": "application-assistance", 
      "title": "Application & SOP Assistance", 
      "short_description": "End-to-end support in university applications, SOPs, and LORs.", 
      "icon": "FaFileAlt", 
      "full_description": "A strong application is crucial for admission. We assist in filling out complex application forms, drafting compelling Statements of Purpose (SOPs), and editing Letters of Recommendation (LORs).",
      "features": ["SOP Brainstorming", "LOR Drafting", "Resume Review", "Application Tracking"],
      "process": ["Document Collection", "Drafting SOPs", "Application Review", "Submission"]
    },
    { 
      "slug": "visa-guidance", 
      "title": "Visa Guidance", 
      "short_description": "Complete assistance with student visa applications and interviews.", 
      "icon": "FaPassport", 
      "full_description": "Navigating visa regulations can be tricky. Our experts provide comprehensive guidance on visa documentation, financial requirements, and conduct mock interviews to ensure a 100% success rate.",
      "features": ["Document Checklist", "Financial Planning", "Mock Interviews", "Post-Visa Support"],
      "process": ["Guidance on Funds", "File Preparation", "Interview Prep", "Visa Stamping"]
    },
    { 
      "slug": "test-preparation", 
      "title": "IELTS / PTE Preparation", 
      "short_description": "High-quality coaching for English proficiency tests.", 
      "icon": "FaGraduationCap", 
      "full_description": "Achieve your target band score with our expert-led IELTS, PTE, and TOEFL coaching. We provide comprehensive study materials, regular mock tests, and personalized feedback.",
      "features": ["Expert Faculty", "Mock Tests", "Study Materials", "Flexible Batches"],
      "process": ["Diagnostic Test", "Customized Study Plan", "Regular Practice", "Final Exam"]
    },
    { 
      "slug": "education-loan", 
      "title": "Education Loan Assistance", 
      "short_description": "Hassle-free student loans with our banking partners.", 
      "icon": "FaHandshake", 
      "full_description": "Don't let finances hold you back. We have partnered with leading banks and financial institutions to help you secure education loans with minimal documentation and lower interest rates.",
      "features": ["Fast Approval", "Low Interest Rates", "Collateral Free Options", "End-to-End Support"],
      "process": ["Financial Assessment", "Bank Shortlisting", "Documentation", "Disbursement"]
    }
  ],
  "countries": [
    { 
      "slug": "usa", 
      "name": "USA", 
      "short_description": "World's top destination for higher education.", 
      "overview": "The United States is home to some of the most prestigious universities in the world. It offers a diverse environment, cutting-edge technology, and unparalleled academic flexibility.",
      "key_facts": [
        { "label": "Tuition Fee", "value": "$20k - $50k / year" },
        { "label": "Living Cost", "value": "$10k - $15k / year" },
        { "label": "Post-study Work", "value": "Up to 3 Years (STEM)" },
        { "label": "Top Intakes", "value": "Fall (Aug), Spring (Jan)" }
      ],
      "why_study": [
        "Academic Excellence and Global Recognition",
        "Flexible Education System",
        "Excellent Support Facilities for International Students",
        "Vibrant Campus Life and Cultural Diversity"
      ],
      "requirements": [
        "IELTS (6.5+) or TOEFL (80+)",
        "SAT/ACT for Undergrad",
        "GRE/GMAT for Postgrad",
        "Strong SOP & LORs"
      ]
    },
    { 
      "slug": "uk", 
      "name": "United Kingdom", 
      "short_description": "Home to some of the world's oldest and best universities.", 
      "overview": "The UK is known for its intensive, shorter duration courses, saving both time and money. It has a rich history of academic excellence and is culturally diverse.",
      "key_facts": [
        { "label": "Tuition Fee", "value": "£15k - £30k / year" },
        { "label": "Living Cost", "value": "£10k - £12k / year" },
        { "label": "Post-study Work", "value": "2 Years" },
        { "label": "Top Intakes", "value": "September, January" }
      ],
      "why_study": [
        "Shorter Course Duration (1 Year Masters)",
        "High Quality of Education (QAA Assured)",
        "Free Health Care via NHS",
        "2 Years Graduate Route Visa"
      ],
      "requirements": [
        "IELTS (6.0+) or PTE (59+)",
        "Good Academic Record",
        "Personal Statement"
      ]
    },
    { 
      "slug": "canada", 
      "name": "Canada", 
      "short_description": "High quality education with great post-study work options.", 
      "overview": "Canada is known for its welcoming environment, high living standards, and clear path to permanent residency. It offers high-quality education at a comparatively lower cost.",
      "key_facts": [
        { "label": "Tuition Fee", "value": "CAD 15k - 35k / year" },
        { "label": "Living Cost", "value": "CAD 10k - 15k / year" },
        { "label": "Post-study Work", "value": "Up to 3 Years (PGWP)" },
        { "label": "Top Intakes", "value": "Fall (Sep), Winter (Jan)" }
      ],
      "why_study": [
        "Affordable Quality Education",
        "Safe and Welcoming Community",
        "Excellent Post-Study Work Options",
        "Easy Path to PR (Permanent Residency)"
      ],
      "requirements": [
        "IELTS (6.5+) or PTE (60+)",
        "Academic Transcripts",
        "GIC (Guaranteed Investment Certificate)"
      ]
    },
    { 
      "slug": "australia", 
      "name": "Australia", 
      "short_description": "Excellent education system with a high standard of living.", 
      "overview": "Australia promotes innovation, creativity, and independent thinking throughout its universities. International students who study and live in Australia soon find that their education is challenging, fun, and rewarding.",
      "key_facts": [
        { "label": "Tuition Fee", "value": "AUD 30k - 50k / year" },
        { "label": "Living Cost", "value": "AUD 21k - 25k / year" },
        { "label": "Post-study Work", "value": "2 to 4 Years" },
        { "label": "Top Intakes", "value": "February, July" }
      ],
      "why_study": [
        "High Standard of Living",
        "Post-Study Work Visa up to 4 Years",
        "Part-time work up to 48 hours/fortnight",
        "Global Recognition"
      ],
      "requirements": [
        "IELTS (6.5+) or PTE (58+)",
        "Academic Transcripts",
        "Statement of Purpose"
      ]
    }
  ],
  "universities": [
    {
      "slug": "mit", "name": "Massachusetts Institute of Technology (MIT)", "country": "USA", "location": "Cambridge, Massachusetts", "ranking": "1", 
      "overview": "MIT is widely recognized as one of the most prestigious universities in the world, particularly renowned for its programs in engineering and physical sciences.",
      "key_stats": [
        { "label": "Acceptance Rate", "value": "4%" },
        { "label": "Total Students", "value": "11,520" },
        { "label": "Intl Students", "value": "3,400+" }
      ],
      "tuition_fee": "$50,000 - $60,000 / year",
      "popular_courses": [
        { "name": "Computer Science", "duration": "4 Years", "fee": "$55,878 / year", "intake": "Fall (Aug)" },
        { "name": "Mechanical Engineering", "duration": "4 Years", "fee": "$55,878 / year", "intake": "Fall (Aug)" },
        { "name": "Mathematics", "duration": "4 Years", "fee": "$55,878 / year", "intake": "Fall (Aug)" },
        { "name": "Physics", "duration": "4 Years", "fee": "$55,878 / year", "intake": "Fall (Aug)" }
      ],
      "facilities": ["Cutting-edge Labs", "On-campus Housing", "Entrepreneurship Center", "Athletic Complex"]
    },
    {
      "slug": "oxford", "name": "University of Oxford", "country": "United Kingdom", "location": "Oxford, England", "ranking": "2", 
      "overview": "As the oldest university in the English-speaking world, Oxford is a unique and historic institution. It offers a distinct collegiate structure and world-class teaching.",
      "key_stats": [
        { "label": "Acceptance Rate", "value": "17%" },
        { "label": "Total Students", "value": "24,000" },
        { "label": "Intl Students", "value": "43%" }
      ],
      "tuition_fee": "£28,000 - £40,000 / year",
      "popular_courses": [
        { "name": "Law", "duration": "3 Years", "fee": "£28,000 / year", "intake": "Autumn (Oct)" },
        { "name": "Medicine", "duration": "6 Years", "fee": "£40,000 / year", "intake": "Autumn (Oct)" },
        { "name": "Philosophy, Politics and Economics (PPE)", "duration": "3 Years", "fee": "£30,000 / year", "intake": "Autumn (Oct)" }
      ],
      "facilities": ["Historic Libraries (Bodleian)", "Museums", "Collegiate System", "Research Centers"]
    },
    {
      "slug": "toronto", "name": "University of Toronto", "country": "Canada", "location": "Toronto, Ontario", "ranking": "21", 
      "overview": "The University of Toronto is Canada's leading institution of learning, discovery and knowledge creation. It offers a vibrant campus life in the heart of Canada's biggest city.",
      "key_stats": [
        { "label": "Acceptance Rate", "value": "43%" },
        { "label": "Total Students", "value": "97,000" },
        { "label": "Intl Students", "value": "27,000" }
      ],
      "tuition_fee": "CAD 40,000 - 60,000 / year",
      "popular_courses": [
        { "name": "Computer Science", "duration": "4 Years", "fee": "CAD 60,000 / year", "intake": "Fall, Winter" },
        { "name": "Business", "duration": "4 Years", "fee": "CAD 55,000 / year", "intake": "Fall, Winter" },
        { "name": "Engineering", "duration": "4 Years", "fee": "CAD 58,000 / year", "intake": "Fall, Winter" },
        { "name": "Psychology", "duration": "4 Years", "fee": "CAD 40,000 / year", "intake": "Fall, Winter" }
      ],
      "facilities": ["Robarts Library", "Varsity Centre", "Innovation Hub", "Health & Wellness"]
    },
    {
      "slug": "melbourne", "name": "University of Melbourne", "country": "Australia", "location": "Melbourne, Victoria", "ranking": "14", 
      "overview": "Ranked #1 in Australia, the University of Melbourne is a leading international university with a tradition of excellence in teaching and research.",
      "key_stats": [
        { "label": "Acceptance Rate", "value": "70%" },
        { "label": "Total Students", "value": "54,000" },
        { "label": "Intl Students", "value": "44%" }
      ],
      "tuition_fee": "AUD 35,000 - 50,000 / year",
      "popular_courses": [
        { "name": "Medicine", "duration": "4 Years (MD)", "fee": "AUD 50,000 / year", "intake": "Feb" },
        { "name": "Law", "duration": "3 Years (JD)", "fee": "AUD 45,000 / year", "intake": "Feb" },
        { "name": "Business", "duration": "3 Years", "fee": "AUD 40,000 / year", "intake": "Feb, July" },
        { "name": "Arts", "duration": "3 Years", "fee": "AUD 35,000 / year", "intake": "Feb, July" }
      ],
      "facilities": ["Baillieu Library", "Melbourne Model Curriculum", "Research Institutes"]
    },
    {
      "slug": "stanford", "name": "Stanford University", "country": "USA", "location": "Stanford, California", "ranking": "3", 
      "overview": "Located in the heart of Silicon Valley, Stanford University is one of the world's leading teaching and research institutions.",
      "key_stats": [
        { "label": "Acceptance Rate", "value": "4%" },
        { "label": "Total Students", "value": "17,000" },
        { "label": "Intl Students", "value": "24%" }
      ],
      "tuition_fee": "$50,000 - $65,000 / year",
      "popular_courses": [
        { "name": "Computer Science", "duration": "4 Years", "fee": "$56,000 / year", "intake": "Fall (Sept)" },
        { "name": "Business", "duration": "2 Years (MBA)", "fee": "$70,000 / year", "intake": "Fall (Sept)" },
        { "name": "Engineering", "duration": "4 Years", "fee": "$56,000 / year", "intake": "Fall (Sept)" }
      ],
      "facilities": ["Research Labs", "Entrepreneurship Centers", "Athletic Fields"]
    },
    {
      "slug": "harvard", "name": "Harvard University", "country": "USA", "location": "Cambridge, Massachusetts", "ranking": "4", 
      "overview": "Harvard is the oldest institution of higher education in the United States, widely regarded in terms of its influence, reputation, and academic pedigree.",
      "key_stats": [
        { "label": "Acceptance Rate", "value": "5%" },
        { "label": "Total Students", "value": "23,000" },
        { "label": "Intl Students", "value": "25%" }
      ],
      "tuition_fee": "$50,000 - $60,000 / year",
      "popular_courses": [
        { "name": "Law", "duration": "3 Years (JD)", "fee": "$54,000 / year", "intake": "Fall (Sept)" },
        { "name": "Medicine", "duration": "4 Years (MD)", "fee": "$60,000 / year", "intake": "Fall (Sept)" },
        { "name": "Business", "duration": "2 Years (MBA)", "fee": "$70,000 / year", "intake": "Fall (Sept)" }
      ],
      "facilities": ["Widener Library", "Harvard Yard", "Museums"]
    },
    {
      "slug": "imperial", "name": "Imperial College London", "country": "United Kingdom", "location": "London, England", "ranking": "6", 
      "overview": "Imperial is a global top ten university with a world-class reputation in science, engineering, business and medicine.",
      "key_stats": [
        { "label": "Acceptance Rate", "value": "14%" },
        { "label": "Total Students", "value": "19,000" },
        { "label": "Intl Students", "value": "59%" }
      ],
      "tuition_fee": "£30,000 - £35,000 / year",
      "popular_courses": [
        { "name": "Engineering", "duration": "4 Years", "fee": "£35,000 / year", "intake": "Autumn (Oct)" },
        { "name": "Medicine", "duration": "6 Years", "fee": "£42,000 / year", "intake": "Autumn (Oct)" },
        { "name": "Business", "duration": "1 Year (MSc)", "fee": "£30,000", "intake": "Autumn (Oct)" }
      ],
      "facilities": ["Cutting-edge Labs", "Central Library", "Innovation Hub"]
    },
    {
      "slug": "ubc", "name": "University of British Columbia", "country": "Canada", "location": "Vancouver, BC", "ranking": "34", 
      "overview": "UBC is a global center for research and teaching, consistently ranked among the top 20 public universities in the world.",
      "key_stats": [
        { "label": "Acceptance Rate", "value": "52%" },
        { "label": "Total Students", "value": "66,000" },
        { "label": "Intl Students", "value": "28%" }
      ],
      "tuition_fee": "CAD 40,000 - 55,000 / year",
      "popular_courses": [
        { "name": "Computer Science", "duration": "4 Years", "fee": "CAD 45,000 / year", "intake": "Fall, Winter" },
        { "name": "Engineering", "duration": "4 Years", "fee": "CAD 50,000 / year", "intake": "Fall" },
        { "name": "Arts", "duration": "4 Years", "fee": "CAD 40,000 / year", "intake": "Fall, Winter" }
      ],
      "facilities": ["Museum of Anthropology", "Botanical Garden", "Research Labs"]
    },
    {
      "slug": "sydney", "name": "University of Sydney", "country": "Australia", "location": "Sydney, NSW", "ranking": "19", 
      "overview": "The University of Sydney is one of Australia's leading research-intensive universities and is the oldest university in Australia.",
      "key_stats": [
        { "label": "Acceptance Rate", "value": "30%" },
        { "label": "Total Students", "value": "60,000" },
        { "label": "Intl Students", "value": "38%" }
      ],
      "tuition_fee": "AUD 38,000 - 50,000 / year",
      "popular_courses": [
        { "name": "Medicine", "duration": "4 Years (MD)", "fee": "AUD 50,000 / year", "intake": "Feb" },
        { "name": "Law", "duration": "3 Years (JD)", "fee": "AUD 48,000 / year", "intake": "Feb" },
        { "name": "Engineering", "duration": "4 Years", "fee": "AUD 45,000 / year", "intake": "Feb, July" }
      ],
      "facilities": ["Fisher Library", "Research Centers", "Student Unions"]
    }
  ]
}

def run():
    print("Clearing DB...")
    Service.objects.all().delete()
    Country.objects.all().delete()
    University.objects.all().delete()

    print("Seeding Services...")
    for s_data in mockData['services']:
        s = Service.objects.create(
            slug=s_data['slug'],
            title=s_data['title'],
            short_description=s_data['short_description'],
            full_description=s_data['full_description'],
            icon=s_data['icon']
        )
        for f in s_data['features']:
            ServiceFeature.objects.create(service=s, name=f)
        for p in s_data['process']:
            ServiceProcess.objects.create(service=s, name=p)

    print("Seeding Countries...")
    for c_data in mockData['countries']:
        c = Country.objects.create(
            slug=c_data['slug'],
            name=c_data['name'],
            short_description=c_data['short_description'],
            overview=c_data['overview']
        )
        for f in c_data['key_facts']:
            CountryFact.objects.create(country=c, label=f['label'], value=f['value'])
        for w in c_data['why_study']:
            CountryWhyStudy.objects.create(country=c, reason=w)
        for r in c_data['requirements']:
            CountryRequirement.objects.create(country=c, requirement=r)

    print("Seeding Universities...")
    for u_data in mockData['universities']:
        c = Country.objects.filter(name__icontains=u_data['country'].split()[0]).first()
        if not c:
            print(f"Skipping {u_data['name']} because country {u_data['country']} not found.")
            continue
            
        u = University.objects.create(
            slug=u_data['slug'],
            name=u_data['name'],
            country=c,
            location=u_data['location'],
            ranking=u_data['ranking'],
            overview=u_data['overview'],
            tuition_fee=u_data['tuition_fee']
        )
        for s in u_data['key_stats']:
            UniversityStat.objects.create(university=u, label=s['label'], value=s['value'])
        for f in u_data['facilities']:
            UniversityFacility.objects.create(university=u, facility_name=f)
        for course in u_data['popular_courses']:
            UniversityCourse.objects.create(
                university=u, 
                name=course['name'],
                duration=course['duration'],
                fee=course['fee'],
                intake=course['intake']
            )

    print("Done!")

if __name__ == "__main__":
    run()
