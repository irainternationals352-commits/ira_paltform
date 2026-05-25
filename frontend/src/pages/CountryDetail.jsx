import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCheckCircle, FaUniversity, FaFileSignature, FaArrowRight, FaMoneyBillWave, FaClock, FaCalendarCheck, FaGlobeAmericas } from 'react-icons/fa';
import { resolveMediaUrl } from '../utils/media';

const getItemName = (item) => (typeof item === 'string' ? item : item?.name || '');

const CountryDetail = () => {
  const { slug } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await api.getCountryBySlug(slug);
        setCountry(res.data);
      } catch (error) {
        console.error("Failed to fetch country");
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [slug]);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-xl text-primary-600">Loading Country...</div>;
  if (!country) return <div className="h-screen flex items-center justify-center font-bold text-xl text-red-500">Country not found!</div>;

  return (
    <div className="bg-light-50 min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative pt-40 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={resolveMediaUrl(country.banner_image)} alt={country.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-dark-900/40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/countries" className="text-blue-200 hover:text-white flex items-center gap-2 mb-6 font-medium transition-colors">
            ← Back to Destinations
          </Link>
          <div className="inline-block bg-white/10 text-white font-bold px-4 py-1.5 rounded-full text-sm mb-4 border border-white/20 backdrop-blur-sm">
            Study in {country.name}
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6"
          >
            {country.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 max-w-2xl leading-relaxed"
          >
            {country.short_description}
          </motion.p>
        </div>
      </div>

      {/* Quick Facts Strip */}
      {country.key_facts && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-12">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 flex flex-wrap justify-between items-center gap-6">
            {country.key_facts.map((fact, index) => {
              const icons = [FaMoneyBillWave, FaMoneyBillWave, FaClock, FaCalendarCheck];
              const Icon = icons[index % icons.length];
              return (
                <div key={index} className="flex items-center gap-4 flex-1 min-w-[200px]">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">{fact.label}</p>
                    <p className="text-lg font-bold text-dark-900">{fact.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-dark-900 mb-6 flex items-center gap-3">
                <FaGlobeAmericas className="text-primary-600" /> Overview
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {country.overview}
              </p>
            </motion.div>

            {/* Why Study Here */}
            {country.why_study && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-gray-100"
              >
                <h2 className="text-3xl font-bold text-dark-900 mb-8">Why Study in {country.name}?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {country.why_study.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-medium text-lg">{getItemName(reason)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Top Universities Section */}
            {country.universities && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-dark-900 mb-8 flex items-center gap-3">
                  <FaUniversity className="text-primary-600" /> Top Universities
                </h2>
                <div className="space-y-6">
                  {country.universities.filter(uni => uni.show_in_listing !== false).map((uni, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-6">
                      <img src={resolveMediaUrl(uni.logo)} alt={uni.name} className="w-24 h-24 object-cover rounded-xl border border-gray-100" />
                      <div className="flex-grow text-center md:text-left">
                        <h3 className="text-2xl font-bold text-dark-900 mb-2">{uni.name}</h3>
                        <div className="flex flex-col md:flex-row gap-4 text-gray-500 text-sm font-medium">
                          <span className="flex items-center justify-center md:justify-start gap-2"><FaMapMarkerAlt /> {uni.location}</span>
                          <span className="hidden md:inline">•</span>
                          <span>World Rank: <strong className="text-primary-600">#{uni.ranking}</strong></span>
                        </div>
                        <p className="mt-3 text-gray-600"><strong className="text-dark-900">Popular Courses:</strong> {uni.popular_courses?.map(c => typeof c === 'string' ? c : c.name).join(', ')}</p>
                      </div>
                      <Link to={`/universities/${uni.slug}`} className="w-full md:w-auto px-6 py-3 bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl font-bold transition-colors text-center whitespace-nowrap">
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Admission Requirements */}
            {country.requirements && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary-900 text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 relative z-10">
                  <FaFileSignature className="text-secondary-400" /> Admission Requirements
                </h2>
                <ul className="space-y-4 relative z-10">
                  {country.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10">
                      <FaCheckCircle className="text-secondary-400 text-xl" />
                      <span className="text-lg font-medium">{getItemName(req)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sidebar CTA (Right Column) */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-32"
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  <FaGlobeAmericas />
                </div>
                <h3 className="text-2xl font-bold text-dark-900 mb-2">Want to study in {country.name}?</h3>
                <p className="text-gray-600">Get free counseling from our experts and start your application process today.</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><FaCheckCircle /></div> Profile Evaluation
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><FaCheckCircle /></div> University Selection
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><FaCheckCircle /></div> Visa Assistance
                </li>
              </ul>

              <Link to={`/apply?type=country&target=${country.slug}`} className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-primary-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
                Apply to {country.name} Now <FaArrowRight />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
