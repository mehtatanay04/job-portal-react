import React from 'react';
import { FaCheck, FaClock, FaTimes, FaFileAlt } from 'react-icons/fa';
import styles from './Applications.module.css';

export default function Applications() {
  // Sample applications data
  const applications = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechVision',
      status: 'Submitted',
      date: '2023-06-15',
      icon: <FaFileAlt />,
      color: '#4a6bff'
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      company: 'CreativeMinds',
      status: 'In Review',
      date: '2023-06-10',
      icon: <FaClock />,
      color: '#f6ad55'
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      company: 'CloudSystems',
      status: 'Rejected',
      date: '2023-06-05',
      icon: <FaTimes />,
      color: '#e53e3e'
    },
    {
      id: '4',
      title: 'Product Manager',
      company: 'InnovateTech',
      status: 'Accepted',
      date: '2023-05-28',
      icon: <FaCheck />,
      color: '#38a169'
    }
  ];

  return (
    <div className={styles.applications}>
      <h2>Job Applications</h2>
      
      {applications.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No applications yet</h3>
          <p>Apply to jobs to track your application status here</p>
          <button className={styles.browseButton}>Browse Jobs</button>
        </div>
      ) : (
        <div className={styles.applicationsList}>
          {applications.map(app => (
            <div key={app.id} className={styles.applicationCard}>
              <div className={styles.applicationHeader}>
                <div className={styles.statusIcon} style={{ backgroundColor: `${app.color}20`, color: app.color }}>
                  {app.icon}
                </div>
                <div>
                  <h3>{app.title}</h3>
                  <p className={styles.company}>{app.company}</p>
                </div>
              </div>
              
              <div className={styles.applicationDetails}>
                <div className={styles.statusBadge} style={{ backgroundColor: `${app.color}20`, color: app.color }}>
                  {app.status}
                </div>
                <div className={styles.applicationDate}>
                  Applied on: {app.date}
                </div>
              </div>
              
              <div className={styles.applicationActions}>
                <button className={styles.viewButton}>View Application</button>
                <button className={styles.withdrawButton}>Withdraw</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}