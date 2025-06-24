import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaEdit, FaSave, FaTimes, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import styles from './Profile.module.css';

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    bio: '',
    skills: '',
    website: '',
    linkedin: '',
    github: '',
    resume: null
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || 'New York, NY',
        title: user.title || 'Software Engineer',
        bio: user.bio || 'Experienced professional with a passion for innovation and problem-solving. Committed to continuous learning and growth.',
        skills: user.skills || 'JavaScript, React, Node.js, Python, UI/UX Design',
        website: user.website || '',
        linkedin: user.linkedin || '',
        github: user.github || '',
        resume: user.resume || null
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>Your Profile</h1>
        <div className={styles.actions}>
          {editMode ? (
            <>
              <button 
                className={`${styles.button} ${styles.saveButton}`}
                onClick={handleSubmit}
              >
                <FaSave /> Save Changes
              </button>
              <button 
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={() => setEditMode(false)}
              >
                <FaTimes /> Cancel
              </button>
            </>
          ) : (
            <button 
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => setEditMode(true)}
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>
      
      <div className={styles.profileCard}>
        <div className={styles.profileInfo}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              {user?.displayName?.charAt(0) || 'U'}
            </div>
            {editMode && (
              <button className={styles.avatarEdit}>
                Change Photo
              </button>
            )}
          </div>
          
          <div className={styles.userDetails}>
            {editMode ? (
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className={styles.editInput}
                placeholder="Full Name"
              />
            ) : (
              <h2>{formData.displayName}</h2>
            )}
            
            {editMode ? (
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.editInput}
                placeholder="Job Title"
              />
            ) : (
              <p className={styles.title}>{formData.title}</p>
            )}
            
            <div className={styles.meta}>
              <span><FaMapMarkerAlt /> {formData.location}</span>
              <span><FaEnvelope /> {formData.email}</span>
              {formData.phone && <span><FaPhone /> {formData.phone}</span>}
            </div>
            
            <div className={styles.socialLinks}>
              {formData.linkedin && (
                <a href={formData.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              )}
              {formData.github && (
                <a href={formData.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              )}
              {formData.website && (
                <a href={formData.website} target="_blank" rel="noopener noreferrer">
                  <FaGlobe />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.profileContent}>
          <div className={styles.section}>
            <h3><FaUser /> About Me</h3>
            {editMode ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className={styles.editTextarea}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            ) : (
              <p>{formData.bio}</p>
            )}
          </div>
          
          <div className={styles.section}>
            <h3><FaBriefcase /> Skills & Expertise</h3>
            {editMode ? (
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className={styles.editInput}
                placeholder="List your skills (comma separated)"
              />
            ) : (
              <div className={styles.skills}>
                {formData.skills.split(',').map((skill, index) => (
                  <span key={index} className={styles.skillTag}>{skill.trim()}</span>
                ))}
              </div>
            )}
          </div>
          
          <div className={styles.section}>
            <h3>Social Profiles</h3>
            {editMode ? (
              <div className={styles.socialInputs}>
                <div className={styles.inputGroup}>
                  <FaLinkedin className={styles.inputIcon} />
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn profile URL"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <FaGithub className={styles.inputIcon} />
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="GitHub profile URL"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <FaGlobe className={styles.inputIcon} />
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Personal website URL"
                  />
                </div>
              </div>
            ) : (
              <div className={styles.socialLinks}>
                {formData.linkedin ? (
                  <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaLinkedin /> LinkedIn
                  </a>
                ) : (
                  <span className={styles.noLink}>No LinkedIn added</span>
                )}
                {formData.github ? (
                  <a href={formData.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaGithub /> GitHub
                  </a>
                ) : (
                  <span className={styles.noLink}>No GitHub added</span>
                )}
                {formData.website ? (
                  <a href={formData.website} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaGlobe /> Website
                  </a>
                ) : (
                  <span className={styles.noLink}>No website added</span>
                )}
              </div>
            )}
          </div>
          
          <div className={styles.section}>
            <h3>Resume</h3>
            {editMode ? (
              <div className={styles.resumeUpload}>
                <label className={styles.uploadButton}>
                  Choose File
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    accept=".pdf,.doc,.docx" 
                    style={{ display: 'none' }}
                  />
                </label>
                {formData.resume && (
                  <span className={styles.fileName}>
                    {formData.resume.name || 'resume.pdf'}
                  </span>
                )}
              </div>
            ) : (
              <div className={styles.resume}>
                {formData.resume ? (
                  <a href={URL.createObjectURL(formData.resume)} download className={styles.resumeLink}>
                    Download Resume
                  </a>
                ) : (
                  <p>No resume uploaded</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}