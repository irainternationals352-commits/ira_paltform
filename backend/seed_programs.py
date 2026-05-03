import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Program

programs_data = [
    {
      'slug': 'computer-science',
      'name': 'Computer Science',
      'description': 'Study the fundamentals of computing, algorithms, data structures, and software development. Learn programming languages, computer systems, and emerging technologies like AI and machine learning.',
      'duration': '4 years',
      'degree': 'Bachelor of Science (BSc)',
      'average_fee': '$45,000 - $60,000 per year',
      'career_opportunities': ['Software Engineer', 'Data Scientist', 'Systems Analyst', 'AI/ML Engineer', 'Tech Entrepreneur'],
      'skills': ['Programming (Python, Java, C++)', 'Data Structures & Algorithms', 'Database Management', 'Web Development', 'Machine Learning'],
      'requirements': ['High School Diploma', 'Mathematics background', 'Programming knowledge (preferred)', 'English proficiency (TOEFL/IELTS)'],
      'universities': ['MIT', 'Stanford', 'Harvard', 'Carnegie Mellon', 'UC Berkeley']
    },
    {
      'slug': 'mechanical-engineering',
      'name': 'Mechanical Engineering',
      'description': 'Design, analyze, manufacture, and maintain mechanical systems. Learn about thermodynamics, fluid mechanics, materials science, and engineering design principles.',
      'duration': '4 years',
      'degree': 'Bachelor of Engineering (BEng)',
      'average_fee': '$40,000 - $55,000 per year',
      'career_opportunities': ['Mechanical Engineer', 'Design Engineer', 'Manufacturing Engineer', 'Automotive Engineer', 'Aerospace Engineer'],
      'skills': ['CAD/CAM Software', 'Thermodynamics', 'Fluid Mechanics', 'Materials Science', 'Project Management'],
      'requirements': ['High School Diploma', 'Physics & Mathematics', 'Engineering aptitude', 'English proficiency'],
      'universities': ['MIT', 'Stanford', 'University of Michigan', 'Imperial College London', 'ETH Zurich']
    },
    {
      'slug': 'mathematics',
      'name': 'Mathematics',
      'description': 'Explore pure and applied mathematics, including algebra, calculus, statistics, and mathematical modeling. Develop analytical thinking and problem-solving skills.',
      'duration': '3-4 years',
      'degree': 'Bachelor of Science (BSc)',
      'average_fee': '$35,000 - $50,000 per year',
      'career_opportunities': ['Data Analyst', 'Actuary', 'Financial Analyst', 'Research Scientist', 'Professor'],
      'skills': ['Advanced Calculus', 'Linear Algebra', 'Statistics', 'Mathematical Modeling', 'Programming'],
      'requirements': ['High School Diploma', 'Strong Mathematics background', 'Analytical thinking', 'English proficiency'],
      'universities': ['MIT', 'Harvard', 'Princeton', 'Cambridge', 'Oxford']
    },
    {
      'slug': 'physics',
      'name': 'Physics',
      'description': 'Study the fundamental laws of nature, from quantum mechanics to cosmology. Learn experimental techniques, theoretical physics, and computational modeling.',
      'duration': '4 years',
      'degree': 'Bachelor of Science (BSc)',
      'average_fee': '$38,000 - $52,000 per year',
      'career_opportunities': ['Research Scientist', 'Physics Teacher', 'Data Scientist', 'Engineer', 'Medical Physicist'],
      'skills': ['Mathematical Analysis', 'Laboratory Techniques', 'Computational Physics', 'Research Methods', 'Problem Solving'],
      'requirements': ['High School Diploma', 'Physics & Mathematics', 'Strong analytical skills', 'English proficiency'],
      'universities': ['MIT', 'Caltech', 'Harvard', 'Stanford', 'Cambridge']
    },
    {
      'slug': 'law',
      'name': 'Law',
      'description': 'Study legal principles, case law, and legal systems. Develop skills in legal research, writing, argumentation, and ethical reasoning.',
      'duration': '3 years (LLB)',
      'degree': 'Bachelor of Laws (LLB)',
      'average_fee': '$30,000 - $45,000 per year',
      'career_opportunities': ['Lawyer', 'Legal Consultant', 'Judge', 'Corporate Counsel', 'Policy Advisor'],
      'skills': ['Legal Research', 'Contract Drafting', 'Negotiation', 'Public Speaking', 'Ethical Reasoning'],
      'requirements': ['High School Diploma', 'Strong English skills', 'Critical thinking', 'English proficiency'],
      'universities': ['Harvard', 'Oxford', 'Cambridge', 'Yale', 'Stanford']
    },
    {
      'slug': 'medicine',
      'name': 'Medicine',
      'description': 'Comprehensive medical education covering anatomy, physiology, pathology, and clinical practice. Prepare for a career in healthcare with hands-on clinical training.',
      'duration': '5-6 years',
      'degree': 'Doctor of Medicine (MD)',
      'average_fee': '$50,000 - $70,000 per year',
      'career_opportunities': ['Physician', 'Surgeon', 'Medical Researcher', 'Public Health Specialist', 'Medical Educator'],
      'skills': ['Clinical Diagnosis', 'Patient Care', 'Medical Research', 'Anatomy & Physiology', 'Pharmacology'],
      'requirements': ['High School Diploma', 'Biology & Chemistry', 'MCAT exam', 'Clinical experience', 'English proficiency'],
      'universities': ['Harvard', 'Johns Hopkins', 'Stanford', 'Oxford', 'Cambridge']
    },
    {
      'slug': 'business-administration',
      'name': 'Business Administration',
      'description': 'Learn business fundamentals including finance, marketing, operations, and strategy. Develop leadership and entrepreneurial skills for the corporate world.',
      'duration': '4 years',
      'degree': 'Bachelor of Business Administration (BBA)',
      'average_fee': '$35,000 - $50,000 per year',
      'career_opportunities': ['Business Analyst', 'Management Consultant', 'Entrepreneur', 'Financial Analyst', 'Marketing Manager'],
      'skills': ['Financial Analysis', 'Marketing Strategy', 'Operations Management', 'Leadership', 'Data Analysis'],
      'requirements': ['High School Diploma', 'Mathematics', 'Business interest', 'English proficiency'],
      'universities': ['Harvard', 'Stanford', 'Wharton (UPenn)', 'London Business School', 'INSEAD']
    },
    {
      'slug': 'engineering',
      'name': 'Engineering',
      'description': 'Broad engineering education covering multiple disciplines including civil, electrical, and chemical engineering. Learn design, analysis, and problem-solving.',
      'duration': '4 years',
      'degree': 'Bachelor of Engineering (BEng)',
      'average_fee': '$40,000 - $55,000 per year',
      'career_opportunities': ['Engineer', 'Project Manager', 'Consultant', 'Research Scientist', 'Technical Specialist'],
      'skills': ['Engineering Design', 'Technical Analysis', 'Project Management', 'CAD Software', 'Problem Solving'],
      'requirements': ['High School Diploma', 'Physics & Mathematics', 'Technical aptitude', 'English proficiency'],
      'universities': ['MIT', 'Stanford', 'Imperial College', 'ETH Zurich', 'NTU Singapore']
    },
    {
      'slug': 'arts-humanities',
      'name': 'Arts & Humanities',
      'description': 'Study literature, history, philosophy, and cultural studies. Develop critical thinking, communication, and analytical skills.',
      'duration': '3-4 years',
      'degree': 'Bachelor of Arts (BA)',
      'average_fee': '$30,000 - $45,000 per year',
      'career_opportunities': ['Writer', 'Journalist', 'Teacher', 'Researcher', 'Policy Analyst'],
      'skills': ['Critical Analysis', 'Research', 'Communication', 'Cultural Understanding', 'Writing'],
      'requirements': ['High School Diploma', 'Strong English skills', 'Curiosity about humanities', 'English proficiency'],
      'universities': ['Oxford', 'Cambridge', 'Harvard', 'Yale', 'UCL']
    }
]

print("Seeding programs...")
for prog in programs_data:
    p, created = Program.objects.get_or_create(slug=prog['slug'], defaults=prog)
    if not created:
        for k, v in prog.items():
            setattr(p, k, v)
        p.save()
    print(f"Loaded {p.name}")
print("Done!")
