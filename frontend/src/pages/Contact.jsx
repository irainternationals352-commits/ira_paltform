import React, { useState } from 'react';
import { api } from '../services/api';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { company } from '../config/company';

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    interested_country: '',
    interested_course: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const payload = { ...formData, lead_type: 'General Enquiry' };
      const res = await api.submitEnquiry(payload);
      if (res.data.success) {
        setStatus('success');
        setFormData({
          full_name: '', email: '', phone: '', interested_country: '', interested_course: '', message: ''
        });
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-light-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white pt-40 pb-28 px-4 text-center relative overflow-hidden mb-16">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 relative z-10">Contact Us</h1>
        <div className="w-24 h-1.5 bg-secondary-500 mx-auto rounded-full mb-8 relative z-10"></div>
        <p className="text-xl text-primary-100 max-w-2xl mx-auto relative z-10">
          {company.contactIntro}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-24 relative z-20">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-dark-900 mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0 mr-4">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900">Address</h4>
                    <p className="text-gray-600 mt-1">{company.address || 'Address not configured'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0 mr-4">
                    <FaPhoneAlt size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900">Phone</h4>
                    <p className="text-gray-600 mt-1">{company.phone || 'Phone not configured'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0 mr-4">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900">Email</h4>
                    <p className="text-gray-600 mt-1">{company.email || 'Email not configured'}</p>
                  </div>
                </div>
              </div>

              {company.whatsapp && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <a href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#128C7E] transition-colors">
                    <FaWhatsapp size={24} className="mr-2" /> Chat on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Enquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-dark-900 mb-6">Send Us a Message</h3>
              
              {status === 'success' && (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-200">
                  Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200">
                  Something went wrong. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
                    <input required type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all outline-none" placeholder="e.g. John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all outline-none" placeholder="e.g. john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Phone Number <span className="text-red-500">*</span></label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all outline-none" placeholder="+1 234 567 890" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Interested Country</label>
                    <select name="interested_country" value={formData.interested_country} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all appearance-none outline-none">
                      <option value="">Select a country</option>
                      <option value="usa">USA</option>
                      <option value="uk">United Kingdom</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Interested Course/Program</label>
                  <input type="text" name="interested_course" value={formData.interested_course} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-300 outline-none" placeholder="e.g. Master's in Computer Science" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Your Message <span className="text-red-500">*</span></label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-300 outline-none resize-none" placeholder="Tell us about your study abroad plans..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg flex justify-center items-center gap-3 ${
                    status === 'submitting' ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 hover:shadow-primary-600/30 transform hover:-translate-y-1'
                  }`}
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
