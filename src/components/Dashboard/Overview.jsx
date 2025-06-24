import React from 'react';
import { FaBriefcase, FaFileAlt, FaHeart, FaChartLine } from 'react-icons/fa';
import styles from './Overview.module.css';

export default function Overview() {
  const stats = [
    { title: 'Jobs Applied', value: 12, icon: <FaBriefcase />, color: '#4a6bff' },
    { title: 'Applications', value: 8, icon: <FaFileAlt />, color: '#f56565' },
    { title: 'Saved Jobs', value: 5, icon: <FaHeart />, color: '#ed64a6' },
    { title: 'Profile Views', value: 42, icon: <FaChartLine />, color: '#38b2ac' }
  ];

  const recentActivities = [
    { id: 1, action: 'Applied for Senior Developer at TechCorp', time: '2 hours ago' },
    { id: 2, action: 'Saved UX Designer position at DesignHub', time: '1 day ago' },
    { id: 3, action: 'Updated your profile information', time: '2 days ago' },
    { id: 4, action: 'Completed your skills assessment', time: '3 days ago' }
  ];

  const recommendedJobs = [
    { id: 1, title: 'Frontend Developer', company: 'WebSolutions', location: 'Remote', salary: '$90k - $120k' },
    { id: 2, title: 'UX Researcher', company: 'UserFirst', location: 'New York, NY', salary: '$85k - $110k' },
    { id: 3, title: 'DevOps Engineer', company: 'CloudTech', location: 'San Francisco, CA', salary: '$110k - $140k' }
  ];

  return (
    <div className={styles.overview}>
      <h2 className={styles.title}>Dashboard Overview</h2>
      
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard} style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3>Recent Activity</h3>
          <div className={styles.activityList}>
            {recentActivities.map(activity => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityDot}></div>
                <div className={styles.activityContent}>
                  <p>{activity.action}</p>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.column}>
          <h3>Recommended Jobs</h3>
          <div className={styles.jobsList}>
            {recommendedJobs.map(job => (
              <div key={job.id} className={styles.jobCard}>
                <h4>{job.title}</h4>
                <p className={styles.company}>{job.company}</p>
                <div className={styles.jobMeta}>
                  <span>{job.location}</span>
                  <span>{job.salary}</span>
                </div>
                <button className={styles.applyButton}>Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}