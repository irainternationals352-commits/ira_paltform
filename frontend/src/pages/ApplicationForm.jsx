import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { api } from '../services/api';
import { FaFileSignature, FaArrowLeft, FaGraduationCap, FaGlobeAmericas } from 'react-icons/fa';

const ApplicationForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    target_destination: '',
    current_education: '',
    english_test: '',
    intake_year: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [type, setType] = useState('country'); // 'country' or 'university'

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const targetType = params.get('type') || 'country';
    const target = params.get('target');
    
    setType(targetType);
    
    if (target) {
      const formattedTarget = target.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      setFormData(prev => ({ ...prev, target_destination: formattedTarget }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const payload = { ...formData, lead_type: `Application - ${type}` };
      const res = await api.submitEnquiry(payload);
      if (res.data.success) {
        setStatus('success');
        setFormData({ ...formData, full_name: '', email: '', phone: '', current_education: '', english_test: '', intake_year: '', message: '' });
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-light-50 min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to={-1} className="text-primary-600 hover:text-primary-800 flex items-center gap-2 mb-8 font-semibold w-fit">
          <FaArrowLeft /> Go Back
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-primary-900 to-primary-700 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              <FaFileSignature />
            </div>
            <h1 className="text-3xl font-bold mb-2">Start Your Application</h1>
            <p className="text-primary-100">Tell us about your background to start the admission process.</p>
          </div>

          <div className="p-8 md:p-10">
            {status === 'success' && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-200">
                Application details submitted! Our admissions expert will review your profile and contact you.
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200">
                Failed to submit application. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Target Destination */}
              <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 mb-6">
                <label className="block text-sm font-bold text-primary-900 mb-2 flex items-center gap-2">
                  <FaGlobeAmericas /> Applying To ({type === 'university' ? 'University' : 'Country'})
                </label>
                <input 
                  required 
                  type="text" 
                  name="target_destination" 
                  value={formData.target_destination} 
                  onChange={handleChange} 
                  className="w-full px-5 py-3 bg-white border border-primary-200 rounded-xl text-dark-900 focus:ring-2 focus:ring-primary-500 transition-all outline-none font-semibold text-lg" 
                  placeholder={type === 'university' ? 'e.g. Stanford University' : 'e.g. USA'} 
                />
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input required type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all outline-none" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all outline-none" placeholder="you@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all outline-none" placeholder="+1 234 567 890" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Intake <span className="text-red-500">*</span></label>
                  <select required name="intake_year" value={formData.intake_year} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all appearance-none outline-none">
                    <option value="" disabled>Select Intake</option>
                    <option value="Fall (Aug/Sep) 2024">Fall (Aug/Sep) 2024</option>
                    <option value="Spring (Jan/Feb) 2025">Spring (Jan/Feb) 2025</option>
                    <option value="Fall (Aug/Sep) 2025">Fall (Aug/Sep) 2025</option>
                  </select>
                </div>
              </div>

              {/* Academic Profile */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <h3 className="text-lg font-bold text-dark-900 mb-4 flex items-center gap-2"><FaGraduationCap className="text-primary-600" /> Academic Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Highest Education Level <span className="text-red-500">*</span></label>
                    <select required name="current_education" value={formData.current_education} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all appearance-none outline-none">
                      <option value="" disabled>Select Education</option>
                      <option value="High School (12th)">High School (12th)</option>
                      <option value="Undergraduate (Bachelor's)">Undergraduate (Bachelor's)</option>
                      <option value="Postgraduate (Master's)">Postgraduate (Master's)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">English Test Taken?</label>
                    <select name="english_test" value={formData.english_test} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all appearance-none outline-none">
                      <option value="">Not taken yet</option>
                      <option value="IELTS">IELTS</option>
                      <option value="TOEFL">TOEFL</option>
                      <option value="PTE">PTE</option>
                      <option value="Duolingo">Duolingo</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Additional Comments / Intended Course</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all outline-none resize-none" placeholder="E.g. I want to study MS in Computer Science..."></textarea>
              </div>

              <button type="submit" disabled={status === 'submitting'} className="w-full bg-primary-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-primary-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
                {status === 'submitting' ? 'Submitting...' : 'Submit Profile for Review'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
