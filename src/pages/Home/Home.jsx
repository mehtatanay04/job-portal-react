import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaArrowRight, FaStar } from 'react-icons/fa';
import styles from './Home.module.css';

const featuredJobs = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'TechVision',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'CreativeMinds',
    location: 'Remote',
    salary: '$90,000 - $110,000',
    type: 'Contract',
    rating: 4.5,
    reviews: 87
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    location: 'New York, NY',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    rating: 4.7,
    reviews: 142
  }
];

const categories = [
  { name: 'Technology', icon: '💻', count: 1243 },
  { name: 'Finance', icon: '💰', count: 876 },
  { name: 'Healthcare', icon: '⚕️', count: 645 },
  { name: 'Education', icon: '🎓', count: 432 },
  { name: 'Marketing', icon: '📢', count: 567 },
  { name: 'Design', icon: '🎨', count: 389 }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Designer',
    company: 'InnovateTech',
    content: 'JobPortal helped me find my dream job in just two weeks! The application process was smooth and I received multiple offers.',
    avatar: 'SJ'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Engineer',
    company: 'TechVision',
    content: 'As a hiring manager, JobPortal has been invaluable for finding top talent. The quality of candidates is exceptional.',
    avatar: 'MC'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'GrowthHackers',
    content: 'I was able to connect with companies that matched my values and career goals. Highly recommend JobPortal!',
    avatar: 'ER'
  }
];

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Find Your <span>Dream Job</span> Today</h1>
          <p>Join thousands of companies and job seekers on the #1 job platform</p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchInput}>
              <FaSearch className={styles.searchIcon} />
              <input type="text" placeholder="Job title, keywords, or company" />
            </div>
            <div className={styles.searchInput}>
              <FaMapMarkerAlt className={styles.searchIcon} />
              <input type="text" placeholder="Location" />
            </div>
            <button className={styles.searchButton}>Search Jobs</button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Featured Jobs</h2>
          <Link to="/jobs" className={styles.viewAll}>
            View All Jobs <FaArrowRight />
          </Link>
        </div>
        
        <div className={styles.jobGrid}>
          {featuredJobs.map(job => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobLogo}>
                {job.company.charAt(0)}
              </div>
              <div className={styles.jobDetails}>
                <h3>{job.title}</h3>
                <p className={styles.company}>{job.company}</p>
                <div className={styles.jobMeta}>
                  <span><FaBriefcase /> {job.type}</span>
                  <span><FaMapMarkerAlt /> {job.location}</span>
                </div>
                <p className={styles.salary}>{job.salary}</p>
                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(job.rating) ? styles.filled : ''} />
                    ))}
                    <span>{job.rating}</span>
                  </div>
                  <span>({job.reviews} reviews)</span>
                </div>
              </div>
              <Link to={`/jobs/${job.id}`} className={styles.applyButton}>
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Job Categories */}
      <section className={styles.section}>
        <h2>Browse by Category</h2>
        <p className={styles.sectionSubtitle}>Find jobs in your preferred field</p>
        
        <div className={styles.categoryGrid}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <div className={styles.categoryIcon}>{category.icon}</div>
              <div>
                <h3>{category.name}</h3>
                <p>{category.count} Jobs Available</p>
              </div>
              <Link to={`/jobs?category=${category.name.toLowerCase()}`} className={styles.exploreLink}>
                Explore <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <h2>How JobPortal Works</h2>
        <p className={styles.sectionSubtitle}>Get your dream job in 4 simple steps</p>
        
        <div className={styles.steps}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3>Create Account</h3>
            <p>Sign up and complete your profile</p>
          </div>
          
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h3>Search Jobs</h3>
            <p>Find opportunities that match your skills</p>
          </div>
          
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h3>Apply</h3>
            <p>Submit your application with one click</p>
          </div>
          
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>4</div>
            <h3>Get Hired</h3>
            <p>Start your new career journey</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2>What Our Users Say</h2>
        <p className={styles.sectionSubtitle}>Success stories from job seekers and employers</p>
        
        <div className={styles.testimonialGrid}>
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.quote}>❝</div>
              <p className={styles.content}>{testimonial.content}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{testimonial.avatar}</div>
                <div>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Ready to take the next step in your career?</h2>
          <p>Join thousands of professionals finding their dream jobs</p>
          <div className={styles.ctaButtons}>
            <Link to="/signup" className={styles.primaryButton}>Sign Up Now</Link>
            <Link to="/jobs" className={styles.secondaryButton}>Browse Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  );
}