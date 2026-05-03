import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Countries from './pages/Countries';
import CountryDetail from './pages/CountryDetail';
import Universities from './pages/Universities';
import UniversityDetail from './pages/UniversityDetail';
import ProgramDetail from './pages/ProgramDetail';
import Contact from './pages/Contact';
import AppointmentForm from './pages/AppointmentForm';
import ApplicationForm from './pages/ApplicationForm';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import LeadsManager from './pages/admin/LeadsManager';
import UniversitiesManager from './pages/admin/UniversitiesManager';
import CountriesManager from './pages/admin/CountriesManager';
import ServicesManager from './pages/admin/ServicesManager';
import ProgramsManager from './pages/admin/ProgramsManager';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<LeadsManager />} />
            <Route path="universities" element={<UniversitiesManager />} />
            <Route path="countries" element={<CountriesManager />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="programs" element={<ProgramsManager />} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="countries" element={<Countries />} />
            <Route path="countries/:slug" element={<CountryDetail />} />
            <Route path="universities" element={<Universities />} />
            <Route path="universities/:slug" element={<UniversityDetail />} />
            <Route path="programs/:programName" element={<ProgramDetail />} />
            <Route path="book-appointment" element={<AppointmentForm />} />
            <Route path="apply" element={<ApplicationForm />} />
            <Route path="contact" element={<Contact />} />
            {/* Fallback route */}
            <Route path="*" element={<div className="pt-24 text-center min-h-screen">404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
