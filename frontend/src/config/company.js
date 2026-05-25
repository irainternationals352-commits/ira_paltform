export const company = {
  name: import.meta.env.VITE_COMPANY_NAME || 'Company Name',
  tagline: import.meta.env.VITE_COMPANY_TAGLINE || 'Global Education Consultants',
  description: import.meta.env.VITE_COMPANY_DESCRIPTION || '',
  email: import.meta.env.VITE_COMPANY_EMAIL || '',
  phone: import.meta.env.VITE_COMPANY_PHONE || '',
  whatsapp: import.meta.env.VITE_COMPANY_WHATSAPP || '',
  address: import.meta.env.VITE_COMPANY_ADDRESS || '',
  facebook: import.meta.env.VITE_COMPANY_FACEBOOK || '',
  instagram: import.meta.env.VITE_COMPANY_INSTAGRAM || '',
  linkedin: import.meta.env.VITE_COMPANY_LINKEDIN || '',
  youtube: import.meta.env.VITE_COMPANY_YOUTUBE || '',
  heroBadge: import.meta.env.VITE_COMPANY_HERO_BADGE || '',
  statVisaSuccess: import.meta.env.VITE_COMPANY_STAT_VISA_SUCCESS || '',
  statUniversities: import.meta.env.VITE_COMPANY_STAT_UNIVERSITIES || '',
  statStudents: import.meta.env.VITE_COMPANY_STAT_STUDENTS || '',
  statCountries: import.meta.env.VITE_COMPANY_STAT_COUNTRIES || '',
  contactIntro: import.meta.env.VITE_COMPANY_CONTACT_INTRO || '',
  homeCtaText: import.meta.env.VITE_COMPANY_HOME_CTA_TEXT || '',
  footerDescription: import.meta.env.VITE_COMPANY_FOOTER_DESCRIPTION || 'Whether you want to study abroad, build an international career, move globally, or create something bigger Ira International helps you turn ambition into reality with premium global guidance designed for the next generation.',
};

export const hasCompanyContact = Boolean(company.address || company.phone || company.email);
