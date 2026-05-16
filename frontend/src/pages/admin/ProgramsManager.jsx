import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const ProgramsManager = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const initialFormState = {
    name: '', slug: '', description: '', duration: '', degree: '', average_fee: '',
    show_in_listing: true,
    career_opportunities: [],
    skills: [],
    requirements: [],
    universities: []
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/programs/`);
      setPrograms(res.data);
    } catch (error) {
      console.error("Failed to fetch programs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // --- Array Handlers for Simple Strings ---
  const handleStringArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addStringArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeStringArrayItem = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = { ...formData };
      if (!dataToSubmit.slug) {
          dataToSubmit.slug = dataToSubmit.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }

      // Filter out empty strings from arrays
      dataToSubmit.career_opportunities = dataToSubmit.career_opportunities.filter(s => s.trim());
      dataToSubmit.skills = dataToSubmit.skills.filter(s => s.trim());
      dataToSubmit.requirements = dataToSubmit.requirements.filter(s => s.trim());
      dataToSubmit.universities = dataToSubmit.universities.filter(s => s.trim());
      
      if (formData.id) {
        await axios.patch(`${API_BASE_URL}/programs/${formData.slug}/`, dataToSubmit);
      } else {
        await axios.post(`${API_BASE_URL}/programs/`, dataToSubmit);
      }
      setShowForm(false);
      setFormData(initialFormState);
      fetchData();
    } catch (error) {
      alert("Error saving program.");
      console.error(error);
    }
  };

  const deleteProgram = async (slug) => {
    if (window.confirm("Delete this program?")) {
      try {
        await axios.delete(`${API_BASE_URL}/programs/${slug}/`);
        fetchData();
      } catch (error) {
        alert("Failed to delete.");
      }
    }
  };

  const editProgram = (program) => {
    setFormData({
      ...program,
      career_opportunities: program.career_opportunities || [],
      skills: program.skills || [],
      requirements: program.requirements || [],
      universities: program.universities || []
    });
    setShowForm(true);
  };

  const renderArraySection = (title, field, placeholder) => (
    <div className="mb-6 p-4 bg-white border rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-gray-800">{title}</h4>
        <button type="button" onClick={() => addStringArrayItem(field)} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded font-bold hover:bg-blue-100">+ Add Item</button>
      </div>
      {formData[field].map((item, idx) => (
        <div key={idx} className="flex gap-2 mb-2 items-center">
          <input 
            placeholder={placeholder} 
            value={item} 
            onChange={(e) => handleStringArrayChange(idx, field, e.target.value)} 
            className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm" 
          />
          <button type="button" onClick={() => removeStringArrayItem(idx, field)} className="text-red-500 hover:text-red-700 px-2 font-bold">✕</button>
        </div>
      ))}
      {formData[field].length === 0 && <p className="text-gray-400 text-sm italic">No items added yet. Click "+ Add Item".</p>}
    </div>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-dark-900">Manage Global Programs</h2>
        <button 
          onClick={() => {
            setFormData(initialFormState);
            setShowForm(!showForm);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add New Program'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">{formData.id ? 'Edit Program' : 'Add Program'}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Program Name *</label>
              <input name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Degree (e.g., BSc, BEng) *</label>
              <input name="degree" required value={formData.degree} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Duration *</label>
              <input name="duration" required value={formData.duration} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Average Fee *</label>
              <input name="average_fee" required value={formData.average_fee} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Description *</label>
              <textarea name="description" required value={formData.description} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 rounded-lg border border-gray-300"></textarea>
            </div>
            <label className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700">
              <input
                type="checkbox"
                name="show_in_listing"
                checked={Boolean(formData.show_in_listing)}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              Show on program page
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderArraySection('Career Opportunities', 'career_opportunities', 'e.g. Software Engineer')}
            {renderArraySection('Skills You\'ll Learn', 'skills', 'e.g. Programming, Analytics')}
            {renderArraySection('Admission Requirements', 'requirements', 'e.g. High School Diploma')}
            {renderArraySection('Top Universities', 'universities', 'e.g. Harvard, MIT')}
          </div>

          <button type="submit" className="w-full mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
            {formData.id ? 'Save Program Changes' : 'Create Program'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Program</th>
              <th className="p-4 font-semibold">Degree & Duration</th>
              <th className="p-4 font-semibold">Fee</th>
              <th className="p-4 font-semibold">Program Page</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {programs.map(prog => (
              <tr key={prog.slug} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-dark-900">{prog.name}</div>
                  <div className="text-xs text-gray-500 truncate max-w-xs">{prog.description}</div>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  <div className="font-bold">{prog.degree}</div>
                  <div>{prog.duration}</div>
                </td>
                <td className="p-4 text-sm text-gray-600">{prog.average_fee}</td>
                <td className="p-4 text-sm font-bold">
                  <span className={prog.show_in_listing ? 'text-green-600' : 'text-gray-400'}>
                    {prog.show_in_listing ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => editProgram(prog)} className="text-primary-600 hover:text-primary-800 font-medium text-sm mr-4 transition-colors">Edit</button>
                  <button onClick={() => deleteProgram(prog.slug)} className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramsManager;
