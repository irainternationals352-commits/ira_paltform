import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { api } from '../services/api';
import { FaCalendarCheck, FaArrowLeft, FaClock, FaUserAlt } from 'react-icons/fa';

const AppointmentForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    service_type: '',
    preferred_date: '',
    preferred_time: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    if (service) {
      const formattedService = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      setFormData(prev => ({ ...prev, service_type: formattedService }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // Re-using submitEnquiry but you could create a specific submitAppointment endpoint later
      const payload = { ...formData, lead_type: 'Appointment' };
      const res = await api.submitEnquiry(payload);
      if (res.data.success) {
        setStatus('success');
        setFormData({ full_name: '', email: '', phone: '', service_type: formData.service_type, preferred_date: '', preferred_time: '', message: '' });
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
              <FaCalendarCheck />
            </div>
            <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
            <p className="text-primary-100">Schedule a free consultation session with our expert counsellors.</p>
          </div>

          <div className="p-8 md:p-10">
            {status === 'success' && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-200">
                Your appointment request has been received! Our team will contact you shortly to confirm the timing.
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200">
                Failed to book appointment. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Service Type Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Service You Need Help With <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select 
                    required 
                    name="service_type" 
                    value={formData.service_type} 
                    onChange={handleChange} 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all appearance-none outline-none"
                  >
                    <option value="" disabled>Select a Service</option>
                    <option value="Career Counselling">Career Counselling</option>
                    <option value="University Selection">University Selection</option>
                    <option value="Application Assistance">Application & SOP Assistance</option>
                    <option value="Visa Guidance">Visa Guidance</option>
                    <option value="Test Preparation">IELTS / PTE Preparation</option>
                    <option value="Education Loan">Education Loan Assistance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
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
              </div>

              {/* Date & Time Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-primary-50 rounded-2xl border border-primary-100">
                <div>
                  <label className="block text-sm font-bold text-primary-900 mb-2 flex items-center gap-2"><FaCalendarCheck /> Preferred Date</label>
                  <input required type="date" name="preferred_date" value={formData.preferred_date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="w-full px-5 py-3 bg-white border border-primary-200 rounded-xl text-dark-900 focus:ring-2 focus:ring-primary-500 transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary-900 mb-2 flex items-center gap-2"><FaClock /> Preferred Time Slot</label>
                  <select required name="preferred_time" value={formData.preferred_time} onChange={handleChange} className="w-full px-5 py-3 bg-white border border-primary-200 rounded-xl text-dark-900 focus:ring-2 focus:ring-primary-500 transition-all appearance-none outline-none">
                    <option value="" disabled>Select Time</option>
                    <option value="Morning (10 AM - 12 PM)">Morning (10 AM - 12 PM)</option>
                    <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Any additional notes?</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark-900 focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all outline-none resize-none" placeholder="Tell us a bit about your current situation..."></textarea>
              </div>

              <button type="submit" disabled={status === 'submitting'} className="w-full bg-primary-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-primary-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
                {status === 'submitting' ? 'Booking...' : 'Confirm Appointment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
