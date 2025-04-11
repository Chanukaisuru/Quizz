//src/components/UserInfoForm.jsx
import React, { useState } from 'react';
import '../styles/UserInfoForm.css';

const UserInfoForm = ({ onSubmit , initialValues}) => {
    const [formData , setFormData] = useState(initialValues || {
        fullName: '',
        email: '',
        phone: '',
        workPlace: '',
        jobRole: '',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };
    
      return (
        <div className="user-info-form">
          <h2>Tell Us About Yourself</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label>Mobile Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label>Current Work Place</label>
              <input
                type="text"
                name="workplace"
                value={formData.workplace}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label>Select Job Role</label>
              <select
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                required
              >
                <option value="">Select your role</option>
                <option value="Marketing / Branding">Marketing / Branding</option>
                <option value="Digital Marketing - Brand Side">Digital Marketing - Brand Side</option>
                <option value="Digital Marketing - Agency Side">Digital Marketing - Agency Side</option>
                <option value="Marketing Student">Marketing Student</option>
                <option value="Not Employed">Not Employed</option>
                <option value="Entrepreneur / Business Owner">Entrepreneur / Business Owner</option>
                <option value="Other">Other</option>
              </select>
            </div>
    
            <button type="submit" className="submit-button">
              Show Me My Results
            </button>
          </form>
        </div>
      );
    };
    
    export default UserInfoForm;
