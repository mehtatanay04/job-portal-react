import React from 'react';
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';
import styles from './Header.module.css';

export default function Header({ user, role }) {
  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search..." 
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.userActions}>
        <button className={styles.notificationButton}>
          <FaBell />
          <span className={styles.badge}>3</span>
        </button>
        
        <div className={styles.userProfile}>
          <FaUserCircle className={styles.userAvatar} />
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.displayName || 'User'}</span>
            <span className={styles.userRole}>{role === 'jobseeker' ? 'Job Seeker' : 'Employer'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}