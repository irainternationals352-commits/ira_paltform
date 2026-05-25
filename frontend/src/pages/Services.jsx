import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { company } from '../config/company';
import { resolveMediaUrl } from '../utils/media';

const getItemName = (item) => (typeof item === 'string' ? item : item?.name || '');

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getServices();
        setServices(res.data.filter(item => item.show_in_listing !== false));
      } catch (err) {
        console.error('Failed to fetch services', err);
        setError('Unable to load services right now. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center text-primary-600 font-bold text-xl">Loading Services...</div>;
  if (error) return <div className="h-screen flex items-center justify-center text-red-500 font-bold text-xl px-4 text-center">{error}</div>;

  return (
    <div className="bg-light-50 min-h-screen">
      {/* Header */}
      <div className="relative pt-40 pb-28 px-4 text-center overflow-hidden bg-[#062544]">
        {/* Background Image */}
        <img 
          src="/services_bg.jpeg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        {/* Dark Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031122]/92 via-[#09223c]/88 to-[#05162b]/92"></div>
        
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 relative z-10 text-white uppercase tracking-wider">Our Services</h1>
        <div className="w-24 h-1.5 bg-secondary-500 mx-auto rounded-full mb-8 relative z-10"></div>
        <p className="text-xl text-blue-100/90 max-w-3xl mx-auto relative z-10 font-medium leading-relaxed">
          With a modern approach, premium client experience, and global perspective, we help students, professionals, entrepreneurs, and investors navigate international pathways with confidence and clarity.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.slug || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden">
                <img src={resolveMediaUrl(service.image)} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-dark-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.short_description}</p>
                
                {service.features && (
                  <ul className="mb-6 space-y-2 flex-grow">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2"></span>
                        {getItemName(feature)}
                      </li>
                    ))}
                  </ul>
                )}
                
                <Link to={`/services/${service.slug}`} className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-500 transition-colors mt-auto">
                  Read Full Details <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* CTA Section inside Services */}
      <div className="bg-primary-50 py-16 text-center">
        <h2 className="text-3xl font-bold text-dark-900 mb-4">Need personalized assistance?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{company.contactIntro}</p>
        <Link to="/contact" className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition-colors shadow-lg">
          Book Free Counselling
        </Link>
      </div>
    </div>
  );
};

export default Services;
