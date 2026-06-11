import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'react-icons/fa';
import { FaArrowRight, FaBriefcase, FaGlobeAmericas, FaPassport, FaPlaneDeparture, FaUniversity } from 'react-icons/fa';
import { company } from '../config/company';
import { resolveMediaUrl } from '../utils/media';

const heroSlides = [
  '/hero1.jpeg',
  '/hero2.jpeg',
  '/hero3.jpeg'
];

const serviceIcons = [FaUniversity, FaPassport, FaPlaneDeparture, FaBriefcase];

const Home = () => {
  const [data, setData] = useState(null);
  const [services, setServices] = useState([]);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, servicesRes, countriesRes] = await Promise.all([
          api.getHomeContent(),
          api.getServices(),
          api.getCountries()
        ]);
        setData(homeRes.data);
        setServices(servicesRes.data.filter(item => item.show_on_home !== false).slice(0, 4));
        setCountries(countriesRes.data.filter(item => item.show_on_home !== false).slice(0, 4));
      } catch (err) {
        console.error('Failed to load home page data', err);
        setError('Unable to load services and countries right now. Please try again later.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    heroSlides.forEach(src => {
      const image = new Image();
      image.src = resolveMediaUrl(src);
    });

    const intervalId = window.setInterval(() => {
      setHeroSlideIndex(index => (index + 1) % heroSlides.length);
    }, 4200);

    const taglineInterval = window.setInterval(() => {
      setTaglineIndex(index => (index + 1) % 3);
    }, 4200);

    return () => {
      window.clearInterval(intervalId);
      window.clearInterval(taglineInterval);
    };
  }, [heroSlides.length]);

  if (error) return <div className="h-screen flex items-center justify-center text-red-500 font-bold text-xl px-4 text-center">{error}</div>;
  if (!data) return <div className="h-screen flex items-center justify-center text-primary-600 font-bold text-xl">Loading Experience...</div>;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[760px] pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#0D355C]">
        {heroSlides.map((image, index) => (
          <img
            key={image}
            src={resolveMediaUrl(image)}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === heroSlideIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== heroSlideIndex}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D355C]/95 via-[#0D355C]/78 to-[#0D355C]/32"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D355C]/65 via-transparent to-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center min-h-[560px]">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              {company.heroBadge && (
                <div className="inline-block bg-white/12 text-blue-50 font-bold px-4 py-1.5 rounded-full text-sm mb-6 border border-white/20 shadow-sm backdrop-blur">
                  {company.heroBadge}
                </div>
              )}
              <h1 className="text-5xl md:text-6xl lg:text-7.5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight min-h-[160px] md:min-h-[120px] flex items-center">
                <span className="w-full">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={taglineIndex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="block"
                    >
                      {taglineIndex === 0 && <>Build The <span className="text-[#79B586]">Future</span> Others Wish For</>}
                      {taglineIndex === 1 && <>Build The <span className="text-[#79B586]">Life</span> Most People Only Imagine</>}
                      {taglineIndex === 2 && <>Live The <span className="text-[#79B586]">Global Life</span> You Deserve</>}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>
              <p className="text-xl text-blue-50/88 mb-10 leading-relaxed max-w-2xl">
                {data.hero_subtitle || "Ira International helps ambitious students, creators, entrepreneurs, and professionals unlock global opportunities through world-class education, international mobility, and borderless career pathways."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={data.button_link} className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg shadow-black/25 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                  {data.button_text} <FaArrowRight />
                </Link>
                <Link to="/services" className="bg-white/95 hover:bg-white text-[#0D355C] border border-white/30 px-8 py-4 rounded-full text-lg font-bold transition-all flex items-center justify-center transform hover:-translate-y-1">
                  Explore Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-6 md:gap-8 border-t border-white/18 pt-8 text-left">
                {company.statVisaSuccess && <div>
                  <h4 className="text-2xl sm:text-3xl font-black text-white">{company.statVisaSuccess}</h4>
                  <p className="text-[11px] sm:text-sm text-blue-100/80 font-semibold leading-tight">Visa Success</p>
                </div>}
                {company.statUniversities && <div>
                  <h4 className="text-2xl sm:text-3xl font-black text-white">{company.statUniversities}</h4>
                  <p className="text-[11px] sm:text-sm text-blue-100/80 font-semibold leading-tight">Universities</p>
                </div>}
                {company.statStudents && <div>
                  <h4 className="text-2xl sm:text-3xl font-black text-white">{company.statStudents}</h4>
                  <p className="text-[11px] sm:text-sm text-blue-100/80 font-semibold leading-tight">Students Placed</p>
                </div>}
              </div>
            </motion.div>

            {/* Right Visual Story */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block min-h-[460px]"
            >
              <div className="absolute right-0 top-4 w-[440px] overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
                <div
                  className="h-72 w-full rounded-2xl bg-[#0D355C] bg-cover bg-center transition-all duration-700"
                  style={{ backgroundImage: `url("${resolveMediaUrl(heroSlides[(heroSlideIndex + 1) % heroSlides.length])}")` }}
                  aria-hidden="true"
                />
              </div>
              <div className="absolute left-10 bottom-24 w-64 overflow-hidden rounded-3xl border border-white/25 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
                <div
                  className="h-44 w-full rounded-2xl bg-[#0D355C] bg-cover bg-center transition-all duration-700"
                  style={{ backgroundImage: `url("${resolveMediaUrl(heroSlides[(heroSlideIndex + 3) % heroSlides.length])}")` }}
                  aria-hidden="true"
                />
              </div>
              
              <div className="absolute bottom-8 right-14 bg-white p-4 rounded-2xl shadow-xl border border-white/70 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center text-2xl">
                  <FaGlobeAmericas />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Global Network</p>
                  <p className="font-bold text-[#0D355C]">{company.statCountries}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-dark-900 mb-4">Our Premium Services</h2>
            <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full mb-8"></div>
            
            <p className="text-xl md:text-2xl font-extrabold text-dark-900 mb-6 leading-relaxed">
              <span className="text-primary-600 block md:inline md:mr-2">We are not just another consultancy.</span>
              We are a modern global movement for people who think bigger.
            </p>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              From studying in Europe to building businesses in Singapore, from global careers to international migration Ira International creates opportunities designed for the next generation.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="inline-block bg-primary-50 border border-primary-100 text-primary-700 font-bold px-5 py-2.5 rounded-full text-sm shadow-sm">
                Your Future Deserves A Bigger Map
              </span>
              <span className="inline-block bg-secondary-50 border border-secondary-200 text-secondary-700 font-bold px-5 py-2.5 rounded-full text-sm shadow-sm">
                Your Global Future Starts With One Conversation
              </span>
            </div>
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
                    {React.createElement(serviceIcons[index] || Icons[service.icon] || Icons.FaGraduationCap)}
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

      {/* Top Destinations */}
      <section className="py-24 bg-[#0D355C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,144,90,0.30),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold mb-4">Top Destinations</h2>
              <div className="w-24 h-1.5 bg-primary-500 rounded-full mb-6"></div>
              <p className="text-xl text-blue-100/85">Discover world-class education systems and find the perfect country for your career goals.</p>
            </div>
            <Link to="/countries" className="hidden md:flex items-center gap-2 text-blue-100 font-bold hover:text-white transition-colors">
              Explore All Countries <FaArrowRight />
            </Link>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <Link to={`/countries/${country.slug}`} key={country.slug || index}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-2xl overflow-hidden h-96 group cursor-pointer shadow-2xl ring-1 ring-white/12 bg-[#0D355C]"
                >
                  <img src={resolveMediaUrl(country.banner_image)} alt={country.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D355C] via-[#0D355C]/70 to-[#4A905A]/10 opacity-95 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4A905A] via-white/70 to-[#0D355C] opacity-80"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 transform group-hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-3xl font-bold text-white mb-2">{country.name}</h3>
                    <p className="text-blue-50/85 text-sm mb-4 line-clamp-2">{country.short_description}</p>
                    <span className="text-white font-bold inline-flex items-center gap-2 rounded-full bg-primary-500/90 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      View Details <FaArrowRight />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          
          <div className="relative z-10 mt-10 md:hidden text-center">
            <Link to="/countries" className="inline-flex items-center gap-2 text-blue-100 font-bold hover:text-white transition-colors">
              Explore All Countries <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Vibrant CTA Section */}
      <section className="py-24 relative overflow-hidden bg-[#0D355C]">
        {/* Background Image */}
        <img 
          src="/home_cta_bg.jpeg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        {/* Dark Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D355C]/88 via-[#0D355C]/80 to-[#0D355C]/88"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            The World’s Best Opportunities, One Click Away.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 mb-12 font-medium"
          >
            Connect with us today and take the first step toward a future without borders
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="bg-primary-500 text-white px-10 py-5 rounded-full text-xl font-extrabold hover:bg-primary-600 hover:scale-105 transition-all inline-flex items-center gap-3 shadow-2xl">
              Talk to an Expert Today <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
