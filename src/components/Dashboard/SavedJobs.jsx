import React from 'react';
import { FaBookmark, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import styles from './SavedJobs.module.css';

export default function SavedJobs() {
  // Sample saved jobs data
  const savedJobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechVision',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      posted: '2 days ago'
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      company: 'CreativeMinds',
      location: 'Remote',
      salary: '$90,000 - $110,000',
      posted: '1 week ago'
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      company: 'CloudSystems',
      location: 'New York, NY',
      salary: '$130,000 - $160,000',
      posted: '3 days ago'
    }
  ];

  return (
    <div className={styles.savedJobs}>
      <h2>Saved Jobs</h2>
      
      {savedJobs.length === 0 ? (
        <div className={styles.emptyState}>
          <FaBookmark className={styles.emptyIcon} />
          <h3>No saved jobs yet</h3>
          <p>Save jobs you're interested in by clicking the bookmark icon</p>
          <button className={styles.browseButton}>Browse Jobs</button>
        </div>
      ) : (
        <div className={styles.jobsList}>
          {savedJobs.map(job => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobHeader}>
                <h3>{job.title}</h3>
                <button className={styles.unsaveButton}>
                  <FaBookmark /> Unsave
                </button>
              </div>
              <p className={styles.company}>{job.company}</p>
              
              <div className={styles.jobDetails}>
                <div className={styles.detailItem}>
                  <FaMapMarkerAlt />
                  <span>{job.location}</span>
                </div>
                <div className={styles.detailItem}>
                  <FaMoneyBillWave />
                  <span>{job.salary}</span>
                </div>
                <div className={styles.detailItem}>
                  <FaClock />
                  <span>{job.posted}</span>
                </div>
              </div>
              
              <div className={styles.jobActions}>
                <button className={styles.applyButton}>Apply Now</button>
                <button className={styles.viewButton}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}