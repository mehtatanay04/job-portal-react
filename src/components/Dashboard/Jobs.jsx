import React, { useState } from 'react';
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import styles from './Jobs.module.css';

const jobCategories = [
  { id: 1, name: 'Technology', count: 1243 },
  { id: 2, name: 'Finance', count: 876 },
  { id: 3, name: 'Healthcare', count: 645 },
  { id: 4, name: 'Education', count: 432 },
  { id: 5, name: 'Marketing', count: 567 },
  { id: 6, name: 'Design', count: 389 }
];

const jobsData = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechVision',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    description: 'We are looking for an experienced React developer to join our frontend team. You will be responsible for building user interfaces and implementing new features.',
    posted: '2 days ago'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'CreativeMinds',
    location: 'Remote',
    salary: '$90,000 - $110,000',
    type: 'Contract',
    description: 'Join our design team to create beautiful and intuitive user experiences for our products. Portfolio required.',
    posted: '1 week ago'
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    location: 'New York, NY',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    description: 'Looking for a DevOps engineer to help us build and maintain our cloud infrastructure.',
    posted: '3 days ago'
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Austin, TX',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    description: 'Lead product development from conception to launch. Work with cross-functional teams to deliver great products.',
    posted: '5 days ago'
  }
];

export default function Jobs() {
  const [jobs] = useState(jobsData);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    category: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.jobsDashboard}>
      <div className={styles.header}>
        <h2>Browse Jobs</h2>
        <p>Find your next career opportunity</p>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            name="search"
            placeholder="Job title, keywords, or company"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>

        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
            >
              <option value="">All Locations</option>
              <option value="remote">Remote</option>
              <option value="new york">New York</option>
              <option value="san francisco">San Francisco</option>
              <option value="london">London</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {jobCategories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.jobsList}>
          {jobs.map(job => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobHeader}>
                <div className={styles.companyLogo}>
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h3>{job.title}</h3>
                  <p className={styles.company}>{job.company}</p>
                </div>
              </div>

              <p className={styles.description}>{job.description}</p>

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
                  <FaBriefcase />
                  <span>{job.type}</span>
                </div>
                <div className={styles.detailItem}>
                  <FaClock />
                  <span>{job.posted}</span>
                </div>
              </div>

              <div className={styles.jobActions}>
                <button className={styles.applyButton}>Apply Now</button>
                <button className={styles.saveButton}>Save Job</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h3>Job Categories</h3>
            <ul className={styles.categoryList}>
              {jobCategories.map(category => (
                <li
                  key={category.id}
                  className={filters.category === category.name ? styles.active : ''}
                >
                  <button onClick={() => setFilters(prev => ({ ...prev, category: category.name }))}>
                    {category.name}
                    <span>{category.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sidebarSection}>
            <h3>Job Alerts</h3>
            <p>Get notified when new jobs match your criteria</p>
            <button className={styles.alertButton}>Create Job Alert</button>
          </div>
        </div>
      </div>
    </div>
  );
}
