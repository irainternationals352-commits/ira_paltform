import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { resolveMediaUrl } from '../utils/media';

const getItemName = (item) => (typeof item === 'string' ? item : item?.name || '');

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.getServiceBySlug(slug);
        setService(res.data);
      } catch (error) {
        console.error("Failed to fetch service");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-xl text-primary-600">Loading...</div>;
  if (!service) return <div className="h-screen flex items-center justify-center font-bold text-xl text-red-500">Service not found!</div>;

  return (
    <div className="bg-light-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="relative pt-40 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={resolveMediaUrl(service.image)} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D355C] via-[#0D355C]/90 to-[#0D355C]/40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/services" className="text-gray-300 hover:text-white flex items-center gap-2 mb-6 font-medium">
            ← Back to Services
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6"
          >
            {service.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 max-w-2xl leading-relaxed"
          >
            {service.short_description}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-16 relative z-20">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-dark-900 mb-6">Overview</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.full_description}
              </p>
            </motion.div>

            {/* Key Features */}
            {service.features && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
              >
                <h2 className="text-3xl font-bold text-dark-900 mb-8">Key Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-medium text-lg">{getItemName(feature)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Process */}
            {service.process && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
              >
                <h2 className="text-3xl font-bold text-dark-900 mb-8">Our Process</h2>
                <div className="space-y-8">
                  {service.process.map((step, idx) => (
                    <div key={idx} className="flex gap-6 relative">
                      {idx !== service.process.length - 1 && (
                        <div className="absolute top-12 left-6 bottom-[-2rem] w-0.5 bg-gray-200"></div>
                      )}
                      <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xl flex-shrink-0 z-10 border-4 border-white shadow-sm">
                        {idx + 1}
                      </div>
                      <div className="pt-2 pb-4">
                        <h3 className="text-xl font-bold text-dark-900 mb-2">{getItemName(step)}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#0D355C] to-[#174B75] rounded-3xl p-8 shadow-2xl sticky top-32 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Start Your Journey Today</h3>
              <p className="text-primary-100 mb-8 leading-relaxed">
                Book a free consultation session with our expert counsellors to discuss your options.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-primary-400" /> Free Profile Evaluation
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-primary-400" /> 1-on-1 Mentorship
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-primary-400" /> Clear Roadmap
                </li>
              </ul>

              <Link to={`/book-appointment?service=${service.slug}`} className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-primary-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
                Book Free Appointment <FaArrowRight />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
