import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import { resolveMediaUrl } from '../../utils/media';

const CountriesManager = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const initialFormState = {
    name: '', slug: '', short_description: '', overview: '',
    show_on_home: true, show_in_listing: true, show_in_footer: true,
    key_facts: [], why_study: [], requirements: []
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/countries/`);
      setCountries(res.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, banner_image: e.target.files?.[0] || formData.banner_image });
  };

  const handleArrayChange = (index, field, key, value) => {
    const newArray = [...formData[field]];
    newArray[index] = { ...newArray[index], [key]: value };
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    const emptyItem = field === 'key_facts' ? { label: '', value: '' } : { name: '' };
    setFormData({ ...formData, [field]: [...formData[field], emptyItem] });
  };

  const removeArrayItem = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const cleanCountryPayload = (data) => ({
    ...data,
    key_facts: (data.key_facts || [])
      .map(({ label = '', value = '' }) => ({ label: label.trim(), value: value.trim() }))
      .filter(fact => fact.label || fact.value),
    why_study: (data.why_study || [])
      .map(({ name = '' }) => ({ name: name.trim() }))
      .filter(item => item.name),
    requirements: (data.requirements || [])
      .map(({ name = '' }) => ({ name: name.trim() }))
      .filter(item => item.name)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = { ...formData };
      if (!dataToSubmit.slug) {
          dataToSubmit.slug = dataToSubmit.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }

      const cleanedData = cleanCountryPayload(dataToSubmit);

      const payload = new FormData();
      Object.entries(cleanedData).forEach(([key, value]) => {
        if (key === 'key_facts' || key === 'why_study' || key === 'requirements') {
          payload.append(key, JSON.stringify(value));
        } else if (key === 'banner_image') {
          if (value instanceof File) payload.append(key, value);
        } else if (value !== undefined && value !== null) {
          payload.append(key, value);
        }
      });
      
      if (formData.id) {
        await axios.patch(`${API_BASE_URL}/countries/${formData.slug}/`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/countries/`, payload);
      }
      setShowForm(false);
      setFormData(initialFormState);
      fetchData();
    } catch (error) {
      alert("Error saving country.");
    }
  };

  const deleteCountry = async (slug) => {
    if (window.confirm("Delete this country? This might delete associated universities!")) {
      try {
        await axios.delete(`${API_BASE_URL}/countries/${slug}/`);
        fetchData();
      } catch (error) {
        alert("Failed to delete.");
      }
    }
  };

  const editCountry = (country) => {
    setFormData({
      ...country,
      key_facts: country.key_facts || [],
      why_study: country.why_study?.map(w => typeof w === 'string' ? {name: w} : w) || [],
      requirements: country.requirements?.map(r => typeof r === 'string' ? {name: r} : r) || []
    });
    setShowForm(true);
  };

  const renderSimpleArray = (title, field, placeholder) => (
    <div className="mt-6 p-4 bg-white border rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-gray-800">{title}</h4>
        <button type="button" onClick={() => addArrayItem(field)} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded font-bold hover:bg-blue-100">+ Add {title.split(' ')[1] || 'Item'}</button>
      </div>
      {formData[field].map((item, idx) => (
        <div key={idx} className="flex gap-2 mb-2 items-center">
          <input 
            placeholder={placeholder} 
            value={item.name || ''} 
            onChange={(e) => handleArrayChange(idx, field, 'name', e.target.value)} 
            className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm" 
          />
          <button type="button" onClick={() => removeArrayItem(idx, field)} className="text-red-500 hover:text-red-700 px-2 font-bold">✕</button>
        </div>
      ))}
      {formData[field].length === 0 && <p className="text-gray-400 text-sm italic">No items added yet.</p>}
    </div>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-dark-900">Manage Countries</h2>
        <button 
          onClick={() => {
            setFormData(initialFormState);
            setShowForm(!showForm);
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add New Country'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Country Name *</label>
              <input name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Short Description</label>
              <input name="short_description" value={formData.short_description} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Overview</label>
              <textarea name="overview" value={formData.overview} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 rounded-lg border border-gray-300"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Banner Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white" />
              {formData.banner_image && !(formData.banner_image instanceof File) && (
                <img src={resolveMediaUrl(formData.banner_image)} alt="Current country banner" className="mt-3 h-28 w-48 rounded-lg object-cover border border-gray-200" />
              )}
            </div>
            <label className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700">
              <input
                type="checkbox"
                name="show_on_home"
                checked={Boolean(formData.show_on_home)}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              Show on home page
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700">
              <input
                type="checkbox"
                name="show_in_listing"
                checked={Boolean(formData.show_in_listing)}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              Show in countries page
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700">
              <input
                type="checkbox"
                name="show_in_footer"
                checked={Boolean(formData.show_in_footer)}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              Show this country in footer
            </label>
          </div>

          <div className="mt-6 p-4 bg-white border rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-800">Quick Facts</h4>
              <button type="button" onClick={() => addArrayItem('key_facts')} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded font-bold hover:bg-blue-100">+ Add Fact</button>
            </div>
            {formData.key_facts.map((fact, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input placeholder="Label (e.g., Average Cost)" value={fact.label} onChange={(e) => handleArrayChange(idx, 'key_facts', 'label', e.target.value)} className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm" />
                <input placeholder="Value (e.g., $30,000)" value={fact.value} onChange={(e) => handleArrayChange(idx, 'key_facts', 'value', e.target.value)} className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm" />
                <button type="button" onClick={() => removeArrayItem(idx, 'key_facts')} className="text-red-500 hover:text-red-700 px-2 font-bold mt-1">✕</button>
              </div>
            ))}
            {formData.key_facts.length === 0 && <p className="text-gray-400 text-sm italic">No facts added yet.</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderSimpleArray('Why Study Here', 'why_study', 'Reason (e.g., World Class Education)')}
            {renderSimpleArray('Admission Requirements', 'requirements', 'Requirement (e.g., IELTS 6.5+)')}
          </div>
          <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors">
            Save Country
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Description</th>
              <th className="p-4 font-semibold">Home</th>
              <th className="p-4 font-semibold">Countries Page</th>
              <th className="p-4 font-semibold">Footer</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {countries.map(country => (
              <tr key={country.slug} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-dark-900">{country.name}</td>
                <td className="p-4 text-sm text-gray-600">{country.short_description}</td>
                <td className="p-4 text-sm font-bold">
                  <span className={country.show_on_home ? 'text-green-600' : 'text-gray-400'}>
                    {country.show_on_home ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="p-4 text-sm font-bold">
                  <span className={country.show_in_listing ? 'text-green-600' : 'text-gray-400'}>
                    {country.show_in_listing ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="p-4 text-sm font-bold">
                  <span className={country.show_in_footer ? 'text-green-600' : 'text-gray-400'}>
                    {country.show_in_footer ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => editCountry(country)} className="text-primary-600 hover:text-primary-800 font-medium text-sm mr-4 transition-colors">Edit</button>
                  <button onClick={() => deleteCountry(country.slug)} className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountriesManager;
