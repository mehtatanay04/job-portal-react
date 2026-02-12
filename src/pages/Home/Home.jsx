import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaArrowRight, 
  FaStar, 
  FaRegBuilding,
  FaUserTie,
  FaChartLine,
  FaRegClock,
  FaCheckCircle,
  FaRegSmile,
  FaRocket,
  FaShieldAlt,
  FaBolt,
  FaUsers,
  FaUserPlus,
  FaSignInAlt
} from 'react-icons/fa';
import styles from './Home.module.css';

const featuredJobs = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'TechVision',
    location: 'San Francisco, CA',
    salary: '$140k - $180k',
    type: 'Full-time',
    rating: 4.9,
    reviews: 156,
    posted: '2 hours ago',
    urgent: true,
    logo: 'TV',
    color: '#4f46e5'
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'CreativeMinds',
    location: 'Remote',
    salary: '$110k - $140k',
    type: 'Full-time',
    rating: 4.8,
    reviews: 98,
    posted: '5 hours ago',
    urgent: false,
    logo: 'CM',
    color: '#7c3aed'
  },
  {
    id: 3,
    title: 'DevOps Lead',
    company: 'CloudSystems',
    location: 'New York, NY',
    salary: '$160k - $200k',
    type: 'Full-time',
    rating: 4.9,
    reviews: 203,
    posted: '1 hour ago',
    urgent: true,
    logo: 'CS',
    color: '#0ea5e9'
  },
  {
    id: 4,
    title: 'Marketing Manager',
    company: 'GrowthLabs',
    location: 'Austin, TX',
    salary: '$95k - $120k',
    type: 'Hybrid',
    rating: 4.7,
    reviews: 67,
    posted: '3 hours ago',
    urgent: false,
    logo: 'GL',
    color: '#f59e0b'
  }
];

const categories = [
  { 
    name: 'Software Engineering', 
    icon: '💻', 
    count: 2453, 
    gradient: 'linear-gradient(145deg, #2563eb, #1d4ed8)',
    trending: true 
  },
  { 
    name: 'Data Science', 
    icon: '📊', 
    count: 876, 
    gradient: 'linear-gradient(145deg, #7c3aed, #6d28d9)',
    trending: true 
  },
  { 
    name: 'Product Management', 
    icon: '📱', 
    count: 654, 
    gradient: 'linear-gradient(145deg, #db2777, #be185d)',
    trending: false 
  },
  { 
    name: 'UX/UI Design', 
    icon: '🎨', 
    count: 789, 
    gradient: 'linear-gradient(145deg, #ea580c, #c2410c)',
    trending: true 
  },
  { 
    name: 'Sales & Marketing', 
    icon: '📢', 
    count: 1123, 
    gradient: 'linear-gradient(145deg, #16a34a, #15803d)',
    trending: false 
  },
  { 
    name: 'Finance', 
    icon: '💰', 
    count: 567, 
    gradient: 'linear-gradient(145deg, #f59e0b, #d97706)',
    trending: false 
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Alex Rivera',
    role: 'Senior Frontend Engineer',
    company: 'Stripe',
    content: 'Found my role at Stripe within 2 weeks. The platform made it incredibly easy to connect with top tech companies.',
    avatar: 'AR',
    rating: 5,
    years: '3+'
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Product Lead',
    company: 'Notion',
    content: 'As a hiring manager, I love how JobPortal streamlines recruitment. We found our lead product manager in just 5 days!',
    avatar: 'PP',
    rating: 5,
    years: '5+'
  },
  {
    id: 3,
    name: 'Marcus Chen',
    role: 'DevOps Architect',
    company: 'Netflix',
    content: 'The personalized job matches are incredibly accurate. Received 4 interview requests in the first week.',
    avatar: 'MC',
    rating: 5,
    years: '7+'
  }
];

const stats = [
  { value: '75K+', label: 'Active Jobs', icon: FaBriefcase, suffix: 'Open positions' },
  { value: '150K+', label: 'Job Seekers', icon: FaUsers, suffix: 'Placed' },
  { value: '12K+', label: 'Companies', icon: FaRegBuilding, suffix: 'Hiring now' },
  { value: '4.8', label: 'User Rating', icon: FaStar, suffix: 'From 50K+ reviews' }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  return (
    <div className={styles.home}>
      {/* Floating Auth Bar */}
      <div className={styles.authBar}>
        <div className={styles.authContainer}>
          <div className={styles.authBrand}>
            <span className={styles.authLogo}>🎯</span>
            <span className={styles.authBrandName}>JobPortal</span>
          </div>
          <div className={styles.authButtons}>
            <Link to="/login" className={styles.authSignIn}>
              <FaSignInAlt /> Sign In
            </Link>
            <Link to="/signup" className={styles.authSignUp}>
              <FaUserPlus /> Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section with Integrated Auth */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient}></div>
          <div className={styles.heroPattern}></div>
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>✨</span>
            Join 150K+ professionals who found their dream jobs
          </div>
          
          <h1>
            Your Dream Job is<br />
            <span className={styles.highlight}>Waiting for You</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            Connect with 12,000+ top companies and get personalized job recommendations<br className={styles.desktopOnly} />
            powered by AI matching technology
          </p>

          {/* Quick Auth Options */}
          <div className={styles.heroAuthOptions}>
            <p className={styles.heroAuthTitle}>Get started today:</p>
            <div className={styles.heroAuthButtons}>
              <Link to="/signup" className={styles.heroPrimaryButton}>
                <FaUserPlus /> Create Free Account
              </Link>
              <Link to="/login" className={styles.heroSecondaryButton}>
                <FaSignInAlt /> Sign In
              </Link>
            </div>
          </div>

          <div className={styles.searchCard}>
            <form className={styles.searchForm}>
              <div className={styles.searchInputGroup}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className={styles.searchDivider}></div>
              <div className={styles.searchInputGroup}>
                <FaMapMarkerAlt className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Location or 'Remote'"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              <button type="submit" className={styles.searchButton}>
                <FaSearch />
                Search Jobs
              </button>
            </form>

            <div className={styles.searchFooter}>
              <span className={styles.popularLabel}>Popular:</span>
              <div className={styles.popularTags}>
                <button type="button">Remote</button>
                <button type="button">React</button>
                <button type="button">Design</button>
                <button type="button">Product</button>
                <button type="button">Marketing</button>
              </div>
            </div>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <FaShieldAlt /> No credit card required
            </div>
            <div className={styles.trustBadge}>
              <FaRocket /> Free forever
            </div>
            <div className={styles.trustBadge}>
              <FaRegSmile /> 4.8/5 from 50K+ users
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statIconWrapper}>
                <stat.icon />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statSuffix}>{stat.suffix}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Value Proposition */}
      <section className={styles.valueProps}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Why choose us</span>
            <h2>Your career growth starts here</h2>
            <p className={styles.sectionDescription}>
              We're reimagining how professionals connect with opportunities
            </p>
          </div>

          <div className={styles.valueGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon} style={{ background: 'linear-gradient(145deg, #2563eb15, #1d4ed815)' }}>
                <FaBolt style={{ color: '#2563eb' }} />
              </div>
              <h3>AI-Powered Matching</h3>
              <p>Get personalized job recommendations based on your skills, experience, and preferences</p>
              <div className={styles.valueStats}>95% match accuracy</div>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon} style={{ background: 'linear-gradient(145deg, #7c3aed15, #6d28d915)' }}>
                <FaRocket style={{ color: '#7c3aed' }} />
              </div>
              <h3>One-Click Apply</h3>
              <p>Apply to multiple jobs instantly with your saved profile and resume</p>
              <div className={styles.valueStats}>Apply in 30 seconds</div>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon} style={{ background: 'linear-gradient(145deg, #db277715, #be185d15)' }}>
                <FaUsers style={{ color: '#db2777' }} />
              </div>
              <h3>Direct Employer Contact</h3>
              <p>Connect directly with hiring managers and skip the recruiter queue</p>
              <div className={styles.valueStats}>2x faster responses</div>
            </div>
          </div>

          <div className={styles.signupCTA}>
            <Link to="/signup" className={styles.ctaPrimaryButton}>
              Create your free account <FaArrowRight />
            </Link>
            <p className={styles.ctaNote}>No credit card needed • 5-minute setup</p>
          </div>
        </div>
      </section>

      {/* Featured Jobs with Auth Nudge */}
      <section className={styles.featuredJobs}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionTag}>Hiring now</span>
              <h2>Featured opportunities</h2>
              <p className={styles.sectionDescription}>
                Hand-picked positions from our top employers
              </p>
            </div>
            <Link to="/jobs" className={styles.viewAllLink}>
              View all jobs <FaArrowRight />
            </Link>
          </div>

          <div className={styles.jobGrid}>
            {featuredJobs.map(job => (
              <div key={job.id} className={styles.jobCard}>
                {job.urgent && <span className={styles.urgentBadge}>⚡ Urgent</span>}
                <div className={styles.jobCardHeader}>
                  <div className={styles.companyLogo} style={{ background: job.color }}>
                    {job.logo}
                  </div>
                  <div className={styles.jobInfo}>
                    <h3>{job.title}</h3>
                    <p className={styles.companyName}>{job.company}</p>
                  </div>
                </div>
                
                <div className={styles.jobDetails}>
                  <div className={styles.jobTags}>
                    <span className={styles.jobType}>
                      <FaBriefcase /> {job.type}
                    </span>
                    <span className={styles.jobLocation}>
                      <FaMapMarkerAlt /> {job.location}
                    </span>
                  </div>
                  
                  <div className={styles.jobMeta}>
                    <div className={styles.jobSalary}>
                      <span>Salary</span>
                      <strong>{job.salary}</strong>
                    </div>
                    <div className={styles.jobRating}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(job.rating) ? styles.starFilled : styles.starEmpty} />
                        ))}
                      </div>
                      <span>{job.rating}</span>
                      <span className={styles.reviewCount}>({job.reviews})</span>
                    </div>
                  </div>

                  <div className={styles.jobFooter}>
                    <span className={styles.postedTime}>
                      <FaRegClock /> {job.posted}
                    </span>
                    <Link to={`/jobs/${job.id}`} className={styles.jobLink}>
                      View details <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Auth Nudge for Job Seekers */}
          <div className={styles.jobSeekerNudge}>
            <div className={styles.nudgeContent}>
              <div className={styles.nudgeIcon}>👋</div>
              <div className={styles.nudgeText}>
                <h4>See your personalized matches</h4>
                <p>Sign up to get jobs tailored to your skills and experience</p>
              </div>
              <Link to="/signup" className={styles.nudgeButton}>
                Get started <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories with Visual Design */}
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionTag}>Browse by category</span>
            <h2>Explore opportunities</h2>
            <p className={styles.sectionDescription}>
              Find your perfect role in these high-demand fields
            </p>
          </div>

          <div className={styles.categoryGrid}>
            {categories.map((category, index) => (
              <Link 
                to={`/jobs?category=${category.name.toLowerCase()}`} 
                key={index} 
                className={styles.categoryCard}
                style={{ background: category.gradient }}
              >
                <div className={styles.categoryCardInner}>
                  <div className={styles.categoryIcon}>
                    {category.icon}
                  </div>
                  <h3>{category.name}</h3>
                  <p>{category.count.toLocaleString()} open positions</p>
                  {category.trending && (
                    <span className={styles.trendingBadge}>
                      📈 Trending
                    </span>
                  )}
                </div>
                <div className={styles.categoryArrow}>
                  <FaArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Simplified */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionTag}>Simple process</span>
            <h2>Get hired in 3 easy steps</h2>
            <p className={styles.sectionDescription}>
              We've simplified the job search process so you can focus on what matters
            </p>
          </div>

          <div className={styles.stepsFlow}>
            <div className={styles.stepFlowItem}>
              <div className={styles.stepFlowNumber}>1</div>
              <div className={styles.stepFlowContent}>
                <h3>Create your profile</h3>
                <p>Add your experience, skills, and resume</p>
                <div className={styles.stepFlowTime}>
                  <FaRegClock /> Takes 5 minutes
                </div>
              </div>
            </div>
            <div className={styles.stepFlowConnector}></div>
            <div className={styles.stepFlowItem}>
              <div className={styles.stepFlowNumber}>2</div>
              <div className={styles.stepFlowContent}>
                <h3>Get matched</h3>
                <p>Receive AI-curated job recommendations</p>
                <div className={styles.stepFlowFeature}>
                  <FaCheckCircle /> Personalized matches
                </div>
              </div>
            </div>
            <div className={styles.stepFlowConnector}></div>
            <div className={styles.stepFlowItem}>
              <div className={styles.stepFlowNumber}>3</div>
              <div className={styles.stepFlowContent}>
                <h3>Apply & get hired</h3>
                <p>One-click applications, direct employer contact</p>
                <div className={styles.stepFlowFeature}>
                  <FaCheckCircle /> 50% faster hiring
                </div>
              </div>
            </div>
          </div>

          <div className={styles.stepsCTA}>
            <Link to="/signup" className={styles.stepsButton}>
              Start your journey <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials with Success Metrics */}
      <section className={styles.testimonials}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionTag}>Success stories</span>
            <h2>Real people, real results</h2>
            <p className={styles.sectionDescription}>
              Join thousands of professionals who advanced their careers
            </p>
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <div className={styles.testimonialRating}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={styles.starFilled} />
                  ))}
                </div>
                <p className={styles.testimonialQuote}>"{testimonial.content}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>
                    {testimonial.avatar}
                  </div>
                  <div className={styles.authorInfo}>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role} at {testimonial.company}</p>
                    <span className={styles.authorExperience}>{testimonial.years} years experience</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Strong Auth Focus */}
      <section className={styles.finalCTA}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaCardContent}>
              <span className={styles.ctaTag}>Start today</span>
              <h2>Ready to advance your career?</h2>
              <p className={styles.ctaDescription}>
                Join 150,000+ professionals who found their dream jobs through JobPortal
              </p>
              
              <div className={styles.ctaGrid}>
                <div className={styles.ctaFeature}>
                  <FaCheckCircle className={styles.ctaCheck} />
                  <span>Free account</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FaCheckCircle className={styles.ctaCheck} />
                  <span>No credit card</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FaCheckCircle className={styles.ctaCheck} />
                  <span>Cancel anytime</span>
                </div>
                <div className={styles.ctaFeature}>
                  <FaCheckCircle className={styles.ctaCheck} />
                  <span>AI-powered matches</span>
                </div>
              </div>

              <div className={styles.ctaActions}>
                <Link to="/signup" className={styles.ctaPrimary}>
                  Create free account <FaArrowRight />
                </Link>
                <Link to="/login" className={styles.ctaSecondary}>
                  Sign in
                </Link>
              </div>
              
              <p className={styles.ctaDisclaimer}>
                Already have an account? <Link to="/login">Sign in here</Link>
              </p>
            </div>
            
            <div className={styles.ctaStats}>
              <div className={styles.ctaStatItem}>
                <div className={styles.ctaStatValue}>150K+</div>
                <div className={styles.ctaStatLabel}>Job seekers placed</div>
              </div>
              <div className={styles.ctaStatDivider}></div>
              <div className={styles.ctaStatItem}>
                <div className={styles.ctaStatValue}>4.8/5</div>
                <div className={styles.ctaStatLabel}>User satisfaction</div>
              </div>
              <div className={styles.ctaStatDivider}></div>
              <div className={styles.ctaStatItem}>
                <div className={styles.ctaStatValue}>24h</div>
                <div className={styles.ctaStatLabel}>Avg response time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA - Newsletter */}
      <section className={styles.newsletterSection}>
        <div className={styles.container}>
          <div className={styles.newsletterCard}>
            <div className={styles.newsletterContent}>
              <h3>Get job alerts in your inbox</h3>
              <p>Receive personalized job recommendations directly in your email</p>
              
              <form className={styles.newsletterForm}>
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterButton}>
                  Subscribe
                </button>
              </form>
              
              <p className={styles.newsletterNote}>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}