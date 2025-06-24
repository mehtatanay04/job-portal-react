import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye, FaChartLine, FaBriefcase } from 'react-icons/fa';
import styles from './ManageJobs.module.css';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      applications: 24,
      views: 156,
      status: 'Active',
      posted: '2023-06-10'
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      applications: 18,
      views: 98,
      status: 'Active',
      posted: '2023-06-05'
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      applications: 32,
      views: 210,
      status: 'Closed',
      posted: '2023-05-20'
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  return (
    <div className={styles.manageJobs}>
      <div className={styles.header}>
        <h2>Manage Jobs</h2>
        <button className={styles.newJobButton}>+ New Job</button>
      </div>
      
      {jobs.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No jobs posted yet</h3>
          <p>Create your first job posting to get started</p>
          <button className={styles.createButton}>Create Job</button>
        </div>
      ) : (
        <div className={styles.jobsList}>
          {jobs.map(job => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobHeader}>
                <div className={styles.jobIcon}>
                  <FaBriefcase />
                </div>
                <div>
                  <h3>{job.title}</h3>
                  <div className={styles.jobMeta}>
                    <span>Posted: {job.posted}</span>
                    <span className={`${styles.status} ${job.status === 'Active' ? styles.active : styles.closed}`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className={styles.jobStats}>
                <div className={styles.statItem}>
                  <FaChartLine />
                  <span>{job.views} Views</span>
                </div>
                <div className={styles.statItem}>
                  <FaEye />
                  <span>{job.applications} Applications</span>
                </div>
              </div>
              
              <div className={styles.jobActions}>
                <button className={styles.viewButton}>
                  <FaEye /> View
                </button>
                <button className={styles.editButton}>
                  <FaEdit /> Edit
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDelete(job.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}