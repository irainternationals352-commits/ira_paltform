import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { company } from '../config/company';

const getItemName = (item) => (typeof item === 'string' ? item : item?.name || '');

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getServices();
        setServices(res.data);
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
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white pt-40 pb-28 px-4 text-center relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 relative z-10">Our Services</h1>
        <div className="w-24 h-1.5 bg-secondary-500 mx-auto rounded-full mb-8 relative z-10"></div>
        <p className="text-xl text-primary-100 max-w-2xl mx-auto relative z-10">
          Comprehensive guidance and support for every step of your international education journey.
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
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
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
