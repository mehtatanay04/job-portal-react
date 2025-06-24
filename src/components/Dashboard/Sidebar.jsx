import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaHeart, FaFileAlt, FaPlus, FaBriefcase, 
  FaCog, FaSignOutAlt, FaUser, FaSearch 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.css';

export default function Sidebar({ activeTab, setActiveTab, role }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isJobSeeker = role === 'jobseeker';
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <span>Job</span>Portal
      </div>
      
      <nav className={styles.nav}>
        <button 
          className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaHome /> <span>Overview</span>
        </button>
        
        <button 
          className={`${styles.navItem} ${activeTab === 'jobs' ? styles.active : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          <FaSearch /> <span>Browse Jobs</span>
        </button>
        
        {isJobSeeker ? (
          <>
            <button 
              className={`${styles.navItem} ${activeTab === 'saved' ? styles.active : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              <FaHeart /> <span>Saved Jobs</span>
            </button>
            
            <button 
              className={`${styles.navItem} ${activeTab === 'applications' ? styles.active : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              <FaFileAlt /> <span>Applications</span>
            </button>
          </>
        ) : (
          <>
            <button 
              className={`${styles.navItem} ${activeTab === 'post' ? styles.active : ''}`}
              onClick={() => setActiveTab('post')}
            >
              <FaPlus /> <span>Post a Job</span>
            </button>
            
            <button 
              className={`${styles.navItem} ${activeTab === 'manage' ? styles.active : ''}`}
              onClick={() => setActiveTab('manage')}
            >
              <FaBriefcase /> <span>Manage Jobs</span>
            </button>
          </>
        )}
        
        <div className={styles.divider}></div>
        
        <NavLink to="/profile" className={styles.navItem}>
          <FaUser /> <span>My Profile</span>
        </NavLink>
        
        <button className={styles.navItem}>
          <FaCog /> <span>Settings</span>
        </button>
      </nav>
      
      <div className={styles.footer}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
}