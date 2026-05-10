import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaGlobeAmericas, FaArrowRight } from 'react-icons/fa';
import { company } from '../config/company';
import { resolveMediaUrl } from '../utils/media';

const Home = () => {
  const [data, setData] = useState(null);
  const [services, setServices] = useState([]);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, servicesRes, countriesRes] = await Promise.all([
          api.getHomeContent(),
          api.getServices(),
          api.getCountries()
        ]);
        setData(homeRes.data);
        setServices(servicesRes.data.slice(0, 4));
        setCountries(countriesRes.data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load home page data', err);
        setError('Unable to load services and countries right now. Please try again later.');
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="h-screen flex items-center justify-center text-red-500 font-bold text-xl px-4 text-center">{error}</div>;
  if (!data) return <div className="h-screen flex items-center justify-center text-primary-600 font-bold text-xl">Loading Experience...</div>;

  return (
    <div className="bg-white">
      {/* Redesigned Split Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              {company.heroBadge && (
                <div className="inline-block bg-primary-100 text-primary-800 font-bold px-4 py-1.5 rounded-full text-sm mb-6 border border-primary-200 shadow-sm">
                  {company.heroBadge}
                </div>
              )}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-dark-900 mb-6 leading-[1.1] tracking-tight">
                Shape Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Global Future</span> Today
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                {data.hero_subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={data.button_link} className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                  {data.button_text} <FaArrowRight />
                </Link>
                <Link to="/services" className="bg-white hover:bg-gray-50 text-dark-800 border-2 border-gray-200 px-8 py-4 rounded-full text-lg font-bold transition-all flex items-center justify-center transform hover:-translate-y-1">
                  Explore Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex items-center gap-8 border-t border-gray-200 pt-8">
                {company.statVisaSuccess && <div>
                  <h4 className="text-3xl font-black text-dark-900">{company.statVisaSuccess}</h4>
                  <p className="text-gray-500 font-medium">Visa Success</p>
                </div>}
                {company.statUniversities && <div>
                  <h4 className="text-3xl font-black text-dark-900">{company.statUniversities}</h4>
                  <p className="text-gray-500 font-medium">Universities</p>
                </div>}
                {company.statStudents && <div>
                  <h4 className="text-3xl font-black text-dark-900">{company.statStudents}</h4>
                  <p className="text-gray-500 font-medium">Students Placed</p>
                </div>}
              </div>
            </motion.div>

            {/* Right Image/Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              {/* Decorative blobs */}
              <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src={data.hero_image} alt="Students studying abroad" className="w-full h-auto object-cover" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl">
                  <FaGlobeAmericas />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Global Network</p>
                  <p className="font-bold text-dark-900">{company.statCountries}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-dark-900 mb-4">Our Premium Services</h2>
            <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">End-to-end support for your international education journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link to={`/services/${service.slug}`} key={service.slug || index} className="block h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-light-50 p-8 rounded-3xl border border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all group h-full cursor-pointer"
                >
                  <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 text-primary-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <FaGraduationCap /> {/* Default Icon */}
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.short_description}</p>
                  <span className="text-primary-600 font-bold hover:text-primary-800 flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read more <FaArrowRight />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations - Better contrast and gradients */}
      <section className="py-24 bg-dark-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold mb-4">Top Destinations</h2>
              <div className="w-24 h-1.5 bg-primary-500 rounded-full mb-6"></div>
              <p className="text-xl text-gray-400">Discover world-class education systems and find the perfect country for your career goals.</p>
            </div>
            <Link to="/countries" className="hidden md:flex items-center gap-2 text-primary-400 font-bold hover:text-white transition-colors">
              Explore All Countries <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <Link to={`/countries/${country.slug}`} key={country.slug || index}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-3xl overflow-hidden h-96 group cursor-pointer shadow-2xl"
                >
                  <img src={resolveMediaUrl(country.banner_image)} alt={country.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {/* Better gradient for text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 transform group-hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-3xl font-bold text-white mb-2">{country.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{country.short_description}</p>
                    <span className="text-primary-400 font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      View Details <FaArrowRight />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 md:hidden text-center">
            <Link to="/countries" className="inline-flex items-center gap-2 text-primary-400 font-bold hover:text-white transition-colors">
              Explore All Countries <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Vibrant CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600"></div>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Ready to start your <span className="text-secondary-400">global</span> journey?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 mb-12"
          >
            {company.homeCtaText}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="bg-white text-primary-900 px-10 py-5 rounded-full text-xl font-extrabold hover:bg-primary-50 hover:scale-105 transition-all inline-flex items-center gap-3 shadow-2xl">
              Talk to an Expert Today <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
