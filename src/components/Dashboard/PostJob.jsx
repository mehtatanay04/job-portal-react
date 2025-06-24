import React, { useState } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaFileAlt, FaPlus } from 'react-icons/fa';
import styles from './PostJob.module.css';

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full-time',
    description: '',
    requirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to your backend
    console.log('Job posted:', formData);
    alert('Job posted successfully!');
    setFormData({
      title: '',
      company: '',
      location: '',
      salary: '',
      type: 'Full-time',
      description: '',
      requirements: ''
    });
  };

  return (
    <div className={styles.postJob}>
      <h2>Post a New Job</h2>
      
      <form onSubmit={handleSubmit} className={styles.jobForm}>
        <div className={styles.formGroup}>
          <label>Job Title</label>
          <div className={styles.inputGroup}>
            <FaBriefcase className={styles.inputIcon} />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Developer"
              required
            />
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label>Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company name"
            required
          />
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Location</label>
            <div className={styles.inputGroup}>
              <FaMapMarkerAlt className={styles.inputIcon} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. New York, NY or Remote"
                required
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Salary Range</label>
            <div className={styles.inputGroup}>
              <FaMoneyBillWave className={styles.inputIcon} />
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. $90,000 - $120,000"
              />
            </div>
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Employment Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label>Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the job responsibilities and requirements"
            rows={5}
            required
          ></textarea>
        </div>
        
        <div className={styles.formGroup}>
          <label>Requirements</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="List required skills, qualifications, and experience (one per line)"
            rows={3}
            required
          ></textarea>
        </div>
        
        <button type="submit" className={styles.submitButton}>
          <FaPlus /> Post Job
        </button>
      </form>
    </div>
  );
}