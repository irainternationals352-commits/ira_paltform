import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// Since the Django backend is not ready, we will use mock data for now.
// Once backend is ready, switch USE_MOCK to false and set API_BASE_URL.
const USE_MOCK = false;

const mockData = {
  home: {
    hero_title: "Shape Your Global Future Today",
    hero_subtitle: "Expert guidance for your study abroad journey. From university selection to visa assistance, we are with you every step of the way.",
    hero_image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80",
    button_text: "Book Free Consultation",
    button_link: "/contact"
  },
  about: {
    title: "Who We Are",
    description: "We are a premier educational consultancy dedicated to helping students achieve their dreams of studying abroad. With years of experience and a global network of partner universities.",
    mission: "To provide transparent, ethical, and expert guidance to students aspiring to study internationally.",
    vision: "To be the most trusted global education consultancy bridging the gap between students and world-class universities.",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80",
  },
  services: [
    { 
      slug: "career-counselling", 
      title: "Career Counselling", 
      short_description: "Expert guidance to choose the right career path and university.", 
      icon: "FaUserTie", 
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80",
      full_description: "Our career counselling service helps you identify your strengths, interests, and career goals. We use psychometric testing and expert consultations to match you with the perfect course and university.",
      features: ["Psychometric Assessment", "1-on-1 Mentorship", "Career Path Mapping", "Industry Insights"],
      process: ["Initial Assessment", "Goal Setting", "University Shortlisting", "Final Selection"]
    },
    { 
      slug: "university-selection", 
      title: "University Selection", 
      short_description: "Help in finding the best universities matching your profile.", 
      icon: "FaUniversity", 
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80",
      full_description: "With thousands of universities worldwide, finding the right fit can be overwhelming. We shortlist universities based on your academic profile, budget, location preferences, and career aspirations.",
      features: ["Profile Evaluation", "Budget Planning", "Scholarship Matching", "Alumni Connect"],
      process: ["Profile Analysis", "Requirement Gathering", "Shortlisting 10-15 Universities", "Finalizing Top 5"]
    },
    { 
      slug: "application-assistance", 
      title: "Application & SOP Assistance", 
      short_description: "End-to-end support in university applications, SOPs, and LORs.", 
      icon: "FaFileAlt", 
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
      full_description: "A strong application is crucial for admission. We assist in filling out complex application forms, drafting compelling Statements of Purpose (SOPs), and editing Letters of Recommendation (LORs).",
      features: ["SOP Brainstorming", "LOR Drafting", "Resume Review", "Application Tracking"],
      process: ["Document Collection", "Drafting SOPs", "Application Review", "Submission"]
    },
    { 
      slug: "visa-guidance", 
      title: "Visa Guidance", 
      short_description: "Complete assistance with student visa applications and interviews.", 
      icon: "FaPassport", 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80",
      full_description: "Navigating visa regulations can be tricky. Our experts provide comprehensive guidance on visa documentation, financial requirements, and conduct mock interviews to ensure a 100% success rate.",
      features: ["Document Checklist", "Financial Planning", "Mock Interviews", "Post-Visa Support"],
      process: ["Guidance on Funds", "File Preparation", "Interview Prep", "Visa Stamping"]
    },
    { 
      slug: "test-preparation", 
      title: "IELTS / PTE Preparation", 
      short_description: "High-quality coaching for English proficiency tests.", 
      icon: "FaGraduationCap", 
      image: "https://images.unsplash.com/photo-1546410531-bea4ea04d5bf?auto=format&fit=crop&q=80",
      full_description: "Achieve your target band score with our expert-led IELTS, PTE, and TOEFL coaching. We provide comprehensive study materials, regular mock tests, and personalized feedback.",
      features: ["Expert Faculty", "Mock Tests", "Study Materials", "Flexible Batches"],
      process: ["Diagnostic Test", "Customized Study Plan", "Regular Practice", "Final Exam"]
    },
    { 
      slug: "education-loan", 
      title: "Education Loan Assistance", 
      short_description: "Hassle-free student loans with our banking partners.", 
      icon: "FaHandshake", 
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80",
      full_description: "Don't let finances hold you back. We have partnered with leading banks and financial institutions to help you secure education loans with minimal documentation and lower interest rates.",
      features: ["Fast Approval", "Low Interest Rates", "Collateral Free Options", "End-to-End Support"],
      process: ["Financial Assessment", "Bank Shortlisting", "Documentation", "Disbursement"]
    }
  ],
  countries: [
    { 
      slug: "usa", 
      name: "USA", 
      short_description: "World's top destination for higher education.", 
      banner_image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80",
      overview: "The United States is home to some of the most prestigious universities in the world. It offers a diverse environment, cutting-edge technology, and unparalleled academic flexibility.",
      key_facts: [
        { label: "Tuition Fee", value: "$20k - $50k / year" },
        { label: "Living Cost", value: "$10k - $15k / year" },
        { label: "Post-study Work", value: "Up to 3 Years (STEM)" },
        { label: "Top Intakes", value: "Fall (Aug), Spring (Jan)" }
      ],
      why_study: [
        "Academic Excellence and Global Recognition",
        "Flexible Education System",
        "Excellent Support Facilities for International Students",
        "Vibrant Campus Life and Cultural Diversity"
      ],
      requirements: [
        "IELTS (6.5+) or TOEFL (80+)",
        "SAT/ACT for Undergrad",
        "GRE/GMAT for Postgrad",
        "Strong SOP & LORs"
      ],
      universities: [
        { slug: "mit", name: "Massachusetts Institute of Technology (MIT)", location: "Cambridge, MA", ranking: "1", popular_courses: "Engineering, Computer Science, Business", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80" },
        { slug: "stanford", name: "Stanford University", location: "Stanford, CA", ranking: "3", popular_courses: "Computer Science, Medicine, Law", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80" },
        { slug: "harvard", name: "Harvard University", location: "Cambridge, MA", ranking: "4", popular_courses: "Law, Business, Humanities", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80" }
      ]
    },
    { 
      slug: "uk", 
      name: "United Kingdom", 
      short_description: "Home to some of the world's oldest and best universities.", 
      banner_image: "https://images.unsplash.com/photo-1513635269975-5969336ac1fc?auto=format&fit=crop&q=80",
      overview: "The UK is known for its intensive, shorter duration courses, saving both time and money. It has a rich history of academic excellence and is culturally diverse.",
      key_facts: [
        { label: "Tuition Fee", value: "£15k - £30k / year" },
        { label: "Living Cost", value: "£10k - £12k / year" },
        { label: "Post-study Work", value: "2 Years" },
        { label: "Top Intakes", value: "September, January" }
      ],
      why_study: [
        "Shorter Course Duration (1 Year Masters)",
        "High Quality of Education (QAA Assured)",
        "Free Health Care via NHS",
        "2 Years Graduate Route Visa"
      ],
      requirements: [
        "IELTS (6.0+) or PTE (59+)",
        "Good Academic Record",
        "Personal Statement"
      ],
      universities: [
        { slug: "oxford", name: "University of Oxford", location: "Oxford, UK", ranking: "2", popular_courses: "Humanities, Sciences, Medicine", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80" },
        { slug: "imperial", name: "Imperial College London", location: "London, UK", ranking: "6", popular_courses: "Engineering, Business, Science", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80" }
      ]
    },
    { 
      slug: "canada", 
      name: "Canada", 
      short_description: "High quality education with great post-study work options.", 
      banner_image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&q=80",
      overview: "Canada is known for its welcoming environment, high living standards, and clear path to permanent residency. It offers high-quality education at a comparatively lower cost.",
      key_facts: [
        { label: "Tuition Fee", value: "CAD 15k - 35k / year" },
        { label: "Living Cost", value: "CAD 10k - 15k / year" },
        { label: "Post-study Work", value: "Up to 3 Years (PGWP)" },
        { label: "Top Intakes", value: "Fall (Sep), Winter (Jan)" }
      ],
      why_study: [
        "Affordable Quality Education",
        "Safe and Welcoming Community",
        "Excellent Post-Study Work Options",
        "Easy Path to PR (Permanent Residency)"
      ],
      requirements: [
        "IELTS (6.5+) or PTE (60+)",
        "Academic Transcripts",
        "GIC (Guaranteed Investment Certificate)"
      ],
      universities: [
        { slug: "toronto", name: "University of Toronto", location: "Toronto, ON", ranking: "21", popular_courses: "Computer Science, Business", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80" },
        { slug: "ubc", name: "University of British Columbia", location: "Vancouver, BC", ranking: "34", popular_courses: "Engineering, Arts", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80" }
      ]
    },
    { 
      slug: "australia", 
      name: "Australia", 
      short_description: "Excellent education system with a high standard of living.", 
      banner_image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80",
      overview: "Australia promotes innovation, creativity, and independent thinking throughout its universities. International students who study and live in Australia soon find that their education is challenging, fun, and rewarding.",
      key_facts: [
        { label: "Tuition Fee", value: "AUD 30k - 50k / year" },
        { label: "Living Cost", value: "AUD 21k - 25k / year" },
        { label: "Post-study Work", value: "2 to 4 Years" },
        { label: "Top Intakes", value: "February, July" }
      ],
      why_study: [
        "High Standard of Living",
        "Post-Study Work Visa up to 4 Years",
        "Part-time work up to 48 hours/fortnight",
        "Global Recognition"
      ],
      requirements: [
        "IELTS (6.5+) or PTE (58+)",
        "Academic Transcripts",
        "Statement of Purpose"
      ],
      universities: [
        { slug: "melbourne", name: "University of Melbourne", location: "Melbourne, VIC", ranking: "14", popular_courses: "Medicine, Business, Law", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80" },
        { slug: "sydney", name: "University of Sydney", location: "Sydney, NSW", ranking: "19", popular_courses: "Engineering, Architecture", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80" }
      ]
    }
  ],
  universities: [
    {
      slug: "mit", name: "Massachusetts Institute of Technology (MIT)", country: "USA", location: "Cambridge, Massachusetts", ranking: "1", 
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80",
      banner_image: "https://images.unsplash.com/photo-1564858907335-e6f777e5fc73?auto=format&fit=crop&q=80",
      overview: "MIT is widely recognized as one of the most prestigious universities in the world, particularly renowned for its programs in engineering and physical sciences.",
      key_stats: [
        { label: "Acceptance Rate", value: "4%" },
        { label: "Total Students", value: "11,520" },
        { label: "Intl Students", value: "3,400+" }
      ],
      tuition_fee: "$50,000 - $60,000 / year",
      popular_courses: [
        { name: "Computer Science", duration: "4 Years", fee: "$55,878 / year", intake: "Fall (Aug)" },
        { name: "Mechanical Engineering", duration: "4 Years", fee: "$55,878 / year", intake: "Fall (Aug)" },
        { name: "Mathematics", duration: "4 Years", fee: "$55,878 / year", intake: "Fall (Aug)" },
        { name: "Physics", duration: "4 Years", fee: "$55,878 / year", intake: "Fall (Aug)" }
      ],
      facilities: ["Cutting-edge Labs", "On-campus Housing", "Entrepreneurship Center", "Athletic Complex"]
    },
    {
      slug: "oxford", name: "University of Oxford", country: "United Kingdom", location: "Oxford, England", ranking: "2", 
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80",
      banner_image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
      overview: "As the oldest university in the English-speaking world, Oxford is a unique and historic institution. It offers a distinct collegiate structure and world-class teaching.",
      key_stats: [
        { label: "Acceptance Rate", value: "17%" },
        { label: "Total Students", value: "24,000" },
        { label: "Intl Students", value: "43%" }
      ],
      tuition_fee: "£28,000 - £40,000 / year",
      popular_courses: [
        { name: "Law", duration: "3 Years", fee: "£28,000 / year", intake: "Autumn (Oct)" },
        { name: "Medicine", duration: "6 Years", fee: "£40,000 / year", intake: "Autumn (Oct)" },
        { name: "Philosophy, Politics and Economics (PPE)", duration: "3 Years", fee: "£30,000 / year", intake: "Autumn (Oct)" }
      ],
      facilities: ["Historic Libraries (Bodleian)", "Museums", "Collegiate System", "Research Centers"]
    },
    {
      slug: "toronto", name: "University of Toronto", country: "Canada", location: "Toronto, Ontario", ranking: "21", 
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80",
      banner_image: "https://images.unsplash.com/photo-1590494483783-f38b29f0cecb?auto=format&fit=crop&q=80",
      overview: "The University of Toronto is Canada's leading institution of learning, discovery and knowledge creation. It offers a vibrant campus life in the heart of Canada's biggest city.",
      key_stats: [
        { label: "Acceptance Rate", value: "43%" },
        { label: "Total Students", value: "97,000" },
        { label: "Intl Students", value: "27,000" }
      ],
      tuition_fee: "CAD 40,000 - 60,000 / year",
      popular_courses: [
        { name: "Computer Science", duration: "4 Years", fee: "CAD 60,000 / year", intake: "Fall, Winter" },
        { name: "Business", duration: "4 Years", fee: "CAD 55,000 / year", intake: "Fall, Winter" },
        { name: "Engineering", duration: "4 Years", fee: "CAD 58,000 / year", intake: "Fall, Winter" },
        { name: "Psychology", duration: "4 Years", fee: "CAD 40,000 / year", intake: "Fall, Winter" }
      ],
      facilities: ["Robarts Library", "Varsity Centre", "Innovation Hub", "Health & Wellness"]
    },
    {
      slug: "melbourne", name: "University of Melbourne", country: "Australia", location: "Melbourne, Victoria", ranking: "14", 
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80",
      banner_image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80",
      overview: "Ranked #1 in Australia, the University of Melbourne is a leading international university with a tradition of excellence in teaching and research.",
      key_stats: [
        { label: "Acceptance Rate", value: "70%" },
        { label: "Total Students", value: "54,000" },
        { label: "Intl Students", value: "44%" }
      ],
      tuition_fee: "AUD 35,000 - 50,000 / year",
      popular_courses: [
        { name: "Medicine", duration: "4 Years (MD)", fee: "AUD 50,000 / year", intake: "Feb" },
        { name: "Law", duration: "3 Years (JD)", fee: "AUD 45,000 / year", intake: "Feb" },
        { name: "Business", duration: "3 Years", fee: "AUD 40,000 / year", intake: "Feb, July" },
        { name: "Arts", duration: "3 Years", fee: "AUD 35,000 / year", intake: "Feb, July" }
      ],
      facilities: ["Baillieu Library", "Melbourne Model Curriculum", "Research Institutes"]
    },
    {
      slug: "stanford", name: "Stanford University", country: "USA", location: "Stanford, California", ranking: "3", 
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80",
      banner_image: "https://images.unsplash.com/photo-1564858907335-e6f777e5fc73?auto=format&fit=crop&q=80",
      overview: "Located in the heart of Silicon Valley, Stanford University is one of the world's leading teaching and research institutions.",
      key_stats: [
        { label: "Acceptance Rate", value: "4%" },
        { label: "Total Students", value: "17,000" },
        { label: "Intl Students", value: "24%" }
      ],
      tuition_fee: "$50,000 - $65,000 / year",
      popular_courses: [
        { name: "Computer Science", duration: "4 Years", fee: "$56,000 / year", intake: "Fall (Sept)" },
        { name: "Business", duration: "2 Years (MBA)", fee: "$70,000 / year", intake: "Fall (Sept)" },
        { name: "Engineering", duration: "4 Years", fee: "$56,000 / year", intake: "Fall (Sept)" }
      ],
      facilities: ["Research Labs", "Entrepreneurship Centers", "Athletic Fields"]
    },
    {
      slug: "harvard", name: "Harvard University", country: "USA", location: "Cambridge, Massachusetts", ranking: "4", 
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80",
      banner_image: "https://images.unsplash.com/photo-1564858907335-e6f777e5fc73?auto=format&fit=crop&q=80",
      overview: "Harvard is the oldest institution of higher education in the United States, widely regarded in terms of its influence, reputation, and academic pedigree.",
      key_stats: [
        { label: "Acceptance Rate", value: "5%" },
        { label: "Total Students", value: "23,000" },
        { label: "Intl Students", value: "25%" }
      ],
      tuition_fee: "$50,000 - $60,000 / year",
      popular_courses: [
        { name: "Law", duration: "3 Years (JD)", fee: "$54,000 / year", intake: "Fall (Sept)" },
        { name: "Medicine", duration: "4 Years (MD)", fee: "$60,000 / year", intake: "Fall (Sept)" },
        { name: "Business", duration: "2 Years (MBA)", fee: "$70,000 / year", intake: "Fall (Sept)" }
      ],
      facilities: ["Widener Library", "Harvard Yard", "Museums"]
    },
    {
      slug: "imperial", name: "Imperial College London", country: "United Kingdom", location: "London, England", ranking: "6", 
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80",
      banner_image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
      overview: "Imperial is a global top ten university with a world-class reputation in science, engineering, business and medicine.",
      key_stats: [
        { label: "Acceptance Rate", value: "14%" },
        { label: "Total Students", value: "19,000" },
        { label: "Intl Students", value: "59%" }
      ],
      tuition_fee: "£30,000 - £35,000 / year",
      popular_courses: [
        { name: "Engineering", duration: "4 Years", fee: "£35,000 / year", intake: "Autumn (Oct)" },
        { name: "Medicine", duration: "6 Years", fee: "£42,000 / year", intake: "Autumn (Oct)" },
        { name: "Business", duration: "1 Year (MSc)", fee: "£30,000", intake: "Autumn (Oct)" }
      ],
      facilities: ["Cutting-edge Labs", "Central Library", "Innovation Hub"]
    },
    {
      slug: "ubc", name: "University of British Columbia", country: "Canada", location: "Vancouver, BC", ranking: "34", 
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80",
      banner_image: "https://images.unsplash.com/photo-1590494483783-f38b29f0cecb?auto=format&fit=crop&q=80",
      overview: "UBC is a global center for research and teaching, consistently ranked among the top 20 public universities in the world.",
      key_stats: [
        { label: "Acceptance Rate", value: "52%" },
        { label: "Total Students", value: "66,000" },
        { label: "Intl Students", value: "28%" }
      ],
      tuition_fee: "CAD 40,000 - 55,000 / year",
      popular_courses: [
        { name: "Computer Science", duration: "4 Years", fee: "CAD 45,000 / year", intake: "Fall, Winter" },
        { name: "Engineering", duration: "4 Years", fee: "CAD 50,000 / year", intake: "Fall" },
        { name: "Arts", duration: "4 Years", fee: "CAD 40,000 / year", intake: "Fall, Winter" }
      ],
      facilities: ["Museum of Anthropology", "Botanical Garden", "Research Labs"]
    },
    {
      slug: "sydney", name: "University of Sydney", country: "Australia", location: "Sydney, NSW", ranking: "19", 
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80",
      banner_image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80",
      overview: "The University of Sydney is one of Australia's leading research-intensive universities and is the oldest university in Australia.",
      key_stats: [
        { label: "Acceptance Rate", value: "30%" },
        { label: "Total Students", value: "60,000" },
        { label: "Intl Students", value: "38%" }
      ],
      tuition_fee: "AUD 38,000 - 50,000 / year",
      popular_courses: [
        { name: "Medicine", duration: "4 Years (MD)", fee: "AUD 50,000 / year", intake: "Feb" },
        { name: "Law", duration: "3 Years (JD)", fee: "AUD 48,000 / year", intake: "Feb" },
        { name: "Engineering", duration: "4 Years", fee: "AUD 45,000 / year", intake: "Feb, July" }
      ],
      facilities: ["Fisher Library", "Research Centers", "Student Unions"]
    }
  ],
  whyChooseUs: [
    { title: "100% Transparency", description: "Clear and honest guidance throughout your journey." },
    { title: "Expert Counsellors", description: "Certified professionals with years of experience." },
    { title: "High Success Rate", description: "98% visa success rate for our students." },
    { title: "End-to-End Support", description: "From course selection to pre-departure briefing." }
  ],
  process: [
    { step_number: 1, title: "Initial Consultation", description: "Profile evaluation and career counselling." },
    { step_number: 2, title: "University Selection", description: "Shortlisting universities based on your profile." },
    { step_number: 3, title: "Application Processing", description: "Document preparation and application submission." },
    { step_number: 4, title: "Visa Processing", description: "Visa application and interview preparation." }
  ]
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getHomeContent: async () => {
    await delay(500); return { data: mockData.home };
  },
  getAboutContent: async () => {
    await delay(500); return { data: mockData.about };
  },
  getServices: async () => {
    if (USE_MOCK) { await delay(500); return { data: mockData.services }; }
    return axios.get(`${API_BASE_URL}/services/`);
  },
  getServiceBySlug: async (slug) => {
    if (USE_MOCK) { 
      await delay(500); 
      const service = mockData.services.find(s => s.slug === slug);
      if (!service) throw new Error("Service not found");
      return { data: service }; 
    }
    return axios.get(`${API_BASE_URL}/services/${slug}/`);
  },
  getCountries: async () => {
    if (USE_MOCK) { await delay(500); return { data: mockData.countries }; }
    return axios.get(`${API_BASE_URL}/countries/`);
  },
  getCountryBySlug: async (slug) => {
    if (USE_MOCK) { 
      await delay(500); 
      const country = mockData.countries.find(c => c.slug === slug);
      if (!country) throw new Error("Country not found");
      return { data: country }; 
    }
    return axios.get(`${API_BASE_URL}/countries/${slug}/`);
  },
  getUniversities: async () => {
    if (USE_MOCK) { await delay(500); return { data: mockData.universities }; }
    return axios.get(`${API_BASE_URL}/universities/`);
  },
  getUniversityBySlug: async (slug) => {
    if (USE_MOCK) { 
      await delay(500); 
      const university = mockData.universities.find(u => u.slug === slug);
      if (!university) throw new Error("University not found");
      return { data: university }; 
    }
    return axios.get(`${API_BASE_URL}/universities/${slug}/`);
  },
  getWhyChooseUs: async () => {
    await delay(500); return { data: mockData.whyChooseUs };
  },
  getProcess: async () => {
    await delay(500); return { data: mockData.process };
  },
  submitEnquiry: async (formData) => {
    if (USE_MOCK) { 
      await delay(1000); 
      console.log("Mock Enquiry Submitted:", formData);
      return { data: { success: true, message: "Enquiry submitted successfully." } }; 
    }
    return axios.post(`${API_BASE_URL}/enquiries/`, formData);
  }
};
