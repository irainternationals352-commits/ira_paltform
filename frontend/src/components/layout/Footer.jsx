import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { company, hasCompanyContact } from '../../config/company';
import { api } from '../../services/api';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerCountries, setFooterCountries] = useState([]);

  useEffect(() => {
    const fetchFooterCountries = async () => {
      try {
        const res = await api.getCountries();
        setFooterCountries(
          res.data
            .filter(country => country.show_in_footer !== false)
            .slice(0, 4)
        );
      } catch (error) {
        console.error('Failed to load footer countries', error);
      }
    };
    fetchFooterCountries();
  }, []);

  return (
    <footer className="bg-dark-900 text-white pt-16 pb-8 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-primary-500 mb-6">
              {company.name}
            </h3>
            {company.footerDescription && (
              <p className="text-gray-400 mb-6 leading-relaxed">
                {company.footerDescription}
              </p>
            )}
            <div className="flex space-x-4">
              {company.facebook && (
                <a href={company.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                  <FaFacebookF />
                </a>
              )}
              {company.instagram && (
                <a href={company.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                  <FaInstagram />
                </a>
              )}
              {company.linkedin && (
                <a href={company.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                  <FaLinkedinIn />
                </a>
              )}
              {company.youtube && (
                <a href={company.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors">
                  <FaYoutube />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary-500 after:bottom-[-8px] after:left-0">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary-500 transition-colors">Our Services</Link></li>
              <li><Link to="/countries" className="text-gray-400 hover:text-primary-500 transition-colors">Study Destinations</Link></li>
              <li><Link to="/universities" className="text-gray-400 hover:text-primary-500 transition-colors">Universities</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary-500 after:bottom-[-8px] after:left-0">Top Destinations</h4>
            <ul className="space-y-3">
              {footerCountries.map(country => (
                <li key={country.slug}>
                  <Link to={`/countries/${country.slug}`} className="text-gray-400 hover:text-primary-500 transition-colors">
                    Study in {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          {hasCompanyContact && (
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary-500 after:bottom-[-8px] after:left-0">Contact Info</h4>
            <ul className="space-y-4">
              {company.address && <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">{company.address}</span>
              </li>}
              {company.phone && <li className="flex items-center">
                <FaPhoneAlt className="text-primary-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">{company.phone}</span>
              </li>}
              {company.email && <li className="flex items-center">
                <FaEnvelope className="text-primary-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">{company.email}</span>
              </li>}
            </ul>
          </div>
          )}

        </div>

        <div className="border-t border-dark-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} {company.name}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-primary-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
