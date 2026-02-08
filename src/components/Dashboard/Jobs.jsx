import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaClock,
  FaStar,
  FaFilter,
  FaTimes,
  FaBuilding,
  FaUserTie
} from 'react-icons/fa';
import styles from './Jobs.module.css';

const jobCategories = [
  { id: 1, name: 'Technology', count: 1243, icon: '💻' },
  { id: 2, name: 'Finance', count: 876, icon: '💰' },
  { id: 3, name: 'Healthcare', count: 645, icon: '🏥' },
  { id: 4, name: 'Education', count: 432, icon: '📚' },
  { id: 5, name: 'Marketing', count: 567, icon: '📢' },
  { id: 6, name: 'Design', count: 389, icon: '🎨' },
  { id: 7, name: 'Engineering', count: 912, icon: '⚙️' },
  { id: 8, name: 'Sales', count: 754, icon: '📊' },
  { id: 9, name: 'Remote', count: 1032, icon: '🏠' }
];

const jobsData = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechVision',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    experience: 'Senior',
    category: 'Technology',
    description: 'We are looking for an experienced React developer to join our frontend team. You will be responsible for building user interfaces and implementing new features.',
    posted: '2 days ago',
    remote: false,
    featured: true,
    urgent: false
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'CreativeMinds',
    location: 'Remote',
    salary: '$90,000 - $110,000',
    type: 'Contract',
    experience: 'Mid-level',
    category: 'Design',
    description: 'Join our design team to create beautiful and intuitive user experiences for our products. Portfolio required.',
    posted: '1 week ago',
    remote: true,
    featured: true,
    urgent: false
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    location: 'New York, NY',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    experience: 'Senior',
    category: 'Technology',
    description: 'Looking for a DevOps engineer to help us build and maintain our cloud infrastructure.',
    posted: '3 days ago',
    remote: false,
    featured: false,
    urgent: true
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Austin, TX',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    experience: 'Senior',
    category: 'Technology',
    description: 'Lead product development from conception to launch. Work with cross-functional teams to deliver great products.',
    posted: '5 days ago',
    remote: false,
    featured: true,
    urgent: false
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'DataCorp',
    location: 'Boston, MA',
    salary: '$140,000 - $180,000',
    type: 'Full-time',
    experience: 'Senior',
    category: 'Technology',
    description: 'Join our data science team to build predictive models and derive insights from large datasets.',
    posted: '1 day ago',
    remote: true,
    featured: true,
    urgent: true
  },
  {
    id: '6',
    title: 'Frontend Developer',
    company: 'WebSolutions',
    location: 'Chicago, IL',
    salary: '$85,000 - $110,000',
    type: 'Full-time',
    experience: 'Mid-level',
    category: 'Technology',
    description: 'Looking for a frontend developer with experience in React, Vue, or Angular.',
    posted: '4 days ago',
    remote: false,
    featured: false,
    urgent: false
  },
  {
    id: '7',
    title: 'Financial Analyst',
    company: 'GlobalFinance',
    location: 'London, UK',
    salary: '£65,000 - £85,000',
    type: 'Full-time',
    experience: 'Mid-level',
    category: 'Finance',
    description: 'Analyze financial data and prepare reports for senior management.',
    posted: '2 weeks ago',
    remote: false,
    featured: false,
    urgent: false
  },
  {
    id: '8',
    title: 'Nurse Practitioner',
    company: 'HealthFirst',
    location: 'Miami, FL',
    salary: '$95,000 - $120,000',
    type: 'Full-time',
    experience: 'Senior',
    category: 'Healthcare',
    description: 'Provide primary care services in a fast-paced healthcare environment.',
    posted: '6 days ago',
    remote: false,
    featured: false,
    urgent: true
  },
  {
    id: '9',
    title: 'Marketing Manager',
    company: 'BrandBoost',
    location: 'Remote',
    salary: '$80,000 - $100,000',
    type: 'Full-time',
    experience: 'Senior',
    category: 'Marketing',
    description: 'Develop and execute marketing strategies to drive brand awareness.',
    posted: '3 days ago',
    remote: true,
    featured: true,
    urgent: false
  },
  {
    id: '10',
    title: 'Software Engineer',
    company: 'CodeMasters',
    location: 'Seattle, WA',
    salary: '$130,000 - $170,000',
    type: 'Full-time',
    experience: 'Mid-level',
    category: 'Technology',
    description: 'Build scalable backend systems using Node.js and Python.',
    posted: 'Today',
    remote: true,
    featured: true,
    urgent: true
  },
  {
    id: '11',
    title: 'Graphic Designer',
    company: 'VisualArts',
    location: 'Los Angeles, CA',
    salary: '$70,000 - $90,000',
    type: 'Part-time',
    experience: 'Junior',
    category: 'Design',
    description: 'Create visual content for digital and print media.',
    posted: '1 week ago',
    remote: true,
    featured: false,
    urgent: false
  },
  {
    id: '12',
    title: 'Sales Executive',
    company: 'SalesPro',
    location: 'Dallas, TX',
    salary: '$75,000 + Commission',
    type: 'Full-time',
    experience: 'Mid-level',
    category: 'Sales',
    description: 'Drive sales growth through strategic client relationships.',
    posted: '2 days ago',
    remote: false,
    featured: false,
    urgent: false
  },
  {
    id: '13',
    title: 'Teacher - Mathematics',
    company: 'EduFuture',
    location: 'Denver, CO',
    salary: '$55,000 - $70,000',
    type: 'Full-time',
    experience: 'Mid-level',
    category: 'Education',
    description: 'Teach high school mathematics and develop curriculum.',
    posted: '1 week ago',
    remote: false,
    featured: false,
    urgent: false
  },
  {
    id: '14',
    title: 'Mechanical Engineer',
    company: 'IndustrialTech',
    location: 'Detroit, MI',
    salary: '$90,000 - $115,000',
    type: 'Full-time',
    experience: 'Senior',
    category: 'Engineering',
    description: 'Design and develop mechanical systems for automotive industry.',
    posted: '5 days ago',
    remote: false,
    featured: true,
    urgent: false
  },
  {
    id: '15',
    title: 'Cybersecurity Analyst',
    company: 'SecureNet',
    location: 'Remote',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    experience: 'Senior',
    category: 'Technology',
    description: 'Protect our network infrastructure from security threats.',
    posted: 'Yesterday',
    remote: true,
    featured: true,
    urgent: true
  }
];

const experienceLevels = ['All Levels', 'Junior', 'Mid-level', 'Senior'];
const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];

export default function Jobs() {
  const [jobs, setJobs] = useState(jobsData);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    category: '',
    experience: '',
    remote: false,
    featured: false,
    urgent: false
  });
  const [savedJobs, setSavedJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      type: '',
      category: '',
      experience: '',
      remote: false,
      featured: false,
      urgent: false
    });
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filterJobs = () => {
    let filtered = [...jobsData];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type && filters.type !== 'All Types') {
      filtered = filtered.filter(job => job.type === filters.type);
    }

    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    if (filters.experience && filters.experience !== 'All Levels') {
      filtered = filtered.filter(job => job.experience === filters.experience);
    }

    if (filters.remote) {
      filtered = filtered.filter(job => job.remote);
    }

    if (filters.featured) {
      filtered = filtered.filter(job => job.featured);
    }

    if (filters.urgent) {
      filtered = filtered.filter(job => job.urgent);
    }

    // Sorting
    switch(sortBy) {
      case 'newest':
        filtered.sort((a, b) => {
          const daysA = parseInt(a.posted);
          const daysB = parseInt(b.posted);
          return daysA - daysB;
        });
        break;
      case 'salary-high':
        filtered.sort((a, b) => {
          const salaryA = parseInt(a.salary.replace(/[^0-9]/g, '').split('-')[0]);
          const salaryB = parseInt(b.salary.replace(/[^0-9]/g, '').split('-')[0]);
          return salaryB - salaryA;
        });
        break;
      case 'salary-low':
        filtered.sort((a, b) => {
          const salaryA = parseInt(a.salary.replace(/[^0-9]/g, '').split('-')[0]);
          const salaryB = parseInt(b.salary.replace(/[^0-9]/g, '').split('-')[0]);
          return salaryA - salaryB;
        });
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredJobs = filterJobs();

  return (
    <div className={styles.jobsDashboard}>
      <div className={styles.header}>
        <div>
          <h1>Find Your Dream Job</h1>
          <p>Discover {filteredJobs.length} opportunities matching your criteria</p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.statItem}>
            <FaBriefcase />
            <span>{jobsData.length} Total Jobs</span>
          </div>
          <div className={styles.statItem}>
            <FaBuilding />
            <span>{new Set(jobsData.map(job => job.company)).size} Companies</span>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <div className={styles.filterToggle} onClick={() => setShowFilters(!showFilters)}>
            <FaFilter />
            <span>Filters</span>
            {Object.values(filters).some(val => val) && (
              <span className={styles.filterCount}>
                {Object.values(filters).filter(val => val).length}
              </span>
            )}
          </div>

          <div className={`${styles.filterPanel} ${showFilters ? styles.show : ''}`}>
            <div className={styles.filterHeader}>
              <h3>Filters</h3>
              <button onClick={clearFilters} className={styles.clearFilters}>
                Clear All
              </button>
            </div>

            <div className={styles.filterSection}>
              <h4>Job Type</h4>
              <div className={styles.filterOptions}>
                {jobTypes.map(type => (
                  <label key={type} className={styles.filterOption}>
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={filters.type === type}
                      onChange={handleFilterChange}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Experience Level</h4>
              <div className={styles.filterOptions}>
                {experienceLevels.map(level => (
                  <label key={level} className={styles.filterOption}>
                    <input
                      type="radio"
                      name="experience"
                      value={level}
                      checked={filters.experience === level}
                      onChange={handleFilterChange}
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Categories</h4>
              <div className={styles.categoryFilters}>
                {jobCategories.map(category => (
                  <label key={category.id} className={styles.categoryOption}>
                    <input
                      type="radio"
                      name="category"
                      value={category.name}
                      checked={filters.category === category.name}
                      onChange={handleFilterChange}
                    />
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    <span className={styles.categoryName}>{category.name}</span>
                    <span className={styles.categoryCount}>({category.count})</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h4>Additional Filters</h4>
              <div className={styles.checkboxFilters}>
                <label className={styles.checkboxOption}>
                  <input
                    type="checkbox"
                    name="remote"
                    checked={filters.remote}
                    onChange={handleFilterChange}
                  />
                  <span>Remote Only</span>
                </label>
                <label className={styles.checkboxOption}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={filters.featured}
                    onChange={handleFilterChange}
                  />
                  <span>Featured Jobs</span>
                </label>
                <label className={styles.checkboxOption}>
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={filters.urgent}
                    onChange={handleFilterChange}
                  />
                  <span>Urgent Hiring</span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h3>Quick Stats</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>{jobsData.length}</span>
                <span className={styles.statLabel}>Total Jobs</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>
                  {jobsData.filter(job => job.remote).length}
                </span>
                <span className={styles.statLabel}>Remote Jobs</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>
                  {jobsData.filter(job => job.featured).length}
                </span>
                <span className={styles.statLabel}>Featured</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.jobsContent}>
          <div className={styles.searchBar}>
            <div className={styles.searchContainer}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                name="search"
                placeholder="Job title, keywords, or company"
                value={filters.search}
                onChange={handleFilterChange}
                className={styles.searchInput}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={filters.location}
                onChange={handleFilterChange}
                className={styles.locationInput}
              />
              <button className={styles.searchButton}>
                <FaSearch /> Search
              </button>
            </div>

            <div className={styles.sortContainer}>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="newest">Newest First</option>
                <option value="salary-high">Salary (High to Low)</option>
                <option value="salary-low">Salary (Low to High)</option>
              </select>
            </div>
          </div>

          {Object.values(filters).some(val => val) && (
            <div className={styles.activeFilters}>
              {filters.search && (
                <span className={styles.activeFilter}>
                  Search: {filters.search}
                  <FaTimes onClick={() => setFilters(prev => ({ ...prev, search: '' }))} />
                </span>
              )}
              {filters.category && (
                <span className={styles.activeFilter}>
                  Category: {filters.category}
                  <FaTimes onClick={() => setFilters(prev => ({ ...prev, category: '' }))} />
                </span>
              )}
              {filters.type && filters.type !== 'All Types' && (
                <span className={styles.activeFilter}>
                  Type: {filters.type}
                  <FaTimes onClick={() => setFilters(prev => ({ ...prev, type: '' }))} />
                </span>
              )}
              {filters.remote && (
                <span className={styles.activeFilter}>
                  Remote
                  <FaTimes onClick={() => setFilters(prev => ({ ...prev, remote: false }))} />
                </span>
              )}
              <button onClick={clearFilters} className={styles.clearAllFilters}>
                Clear All
              </button>
            </div>
          )}

          <div className={styles.jobsList}>
            {filteredJobs.length === 0 ? (
              <div className={styles.noResults}>
                <h3>No jobs found matching your criteria</h3>
                <p>Try adjusting your filters or search terms</p>
                <button onClick={clearFilters}>Clear All Filters</button>
              </div>
            ) : (
              filteredJobs.map(job => (
                <div key={job.id} className={`${styles.jobCard} ${job.featured ? styles.featured : ''}`}>
                  {job.featured && (
                    <div className={styles.featuredBadge}>
                      <FaStar /> Featured
                    </div>
                  )}
                  {job.urgent && (
                    <div className={styles.urgentBadge}>
                      Urgent
                    </div>
                  )}
                  
                  <div className={styles.jobHeader}>
                    <div className={styles.companyLogo}>
                      {job.company.charAt(0)}
                    </div>
                    <div className={styles.jobTitleSection}>
                      <h3>{job.title}</h3>
                      <div className={styles.companyInfo}>
                        <FaBuilding className={styles.companyIcon} />
                        <span className={styles.company}>{job.company}</span>
                        <span className={styles.experienceBadge}>{job.experience}</span>
                        {job.remote && <span className={styles.remoteBadge}>Remote</span>}
                      </div>
                    </div>
                    <button 
                      className={`${styles.saveButton} ${savedJobs.includes(job.id) ? styles.saved : ''}`}
                      onClick={() => toggleSaveJob(job.id)}
                    >
                      <FaStar />
                    </button>
                  </div>

                  <p className={styles.description}>{job.description}</p>

                  <div className={styles.jobDetails}>
                    <div className={styles.detailsRow}>
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
                        <FaUserTie />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    <div className={styles.postedTime}>
                      <FaClock />
                      <span>{job.posted}</span>
                    </div>
                  </div>

                  <div className={styles.jobActions}>
                    <div className={styles.categoryTag}>
                      {jobCategories.find(cat => cat.name === job.category)?.icon} {job.category}
                    </div>
                    <div className={styles.actionButtons}>
                      <button className={styles.applyButton}>Apply Now</button>
                      <button className={styles.detailsButton}>View Details</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredJobs.length > 0 && (
            <div className={styles.pagination}>
              <button className={styles.pageButton}>← Previous</button>
              <span className={styles.pageInfo}>Page 1 of 3</span>
              <button className={styles.pageButton}>Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}