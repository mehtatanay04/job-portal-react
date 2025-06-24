import { useState } from 'react';
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import JobFilter from '../../components/JobFilter/JobFilter';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Jobs.module.css';

// Sample job data (30 jobs)
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
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'DataInsights',
    location: 'Boston, MA',
    salary: '$140,000 - $170,000',
    type: 'Full-time',
    description: 'Use your analytical skills to derive insights from large datasets and help drive business decisions.',
    posted: '1 day ago'
  },
  {
    id: '6',
    title: 'Backend Developer (Node.js)',
    company: 'WebSolutions',
    location: 'Chicago, IL',
    salary: '$100,000 - $130,000',
    type: 'Full-time',
    description: 'Build scalable backend services and APIs for our web applications. Strong Node.js experience required.',
    posted: '2 weeks ago'
  },
  {
    id: '7',
    title: 'Mobile Developer (React Native)',
    company: 'AppWorks',
    location: 'Seattle, WA',
    salary: '$115,000 - $145,000',
    type: 'Full-time',
    description: 'Develop cross-platform mobile applications using React Native. Published apps in the store is a plus.',
    posted: '4 days ago'
  },
  {
    id: '8',
    title: 'QA Engineer',
    company: 'QualityFirst',
    location: 'Remote',
    salary: '$85,000 - $105,000',
    type: 'Full-time',
    description: 'Ensure the quality of our software products through manual and automated testing.',
    posted: '1 week ago'
  },
  {
    id: '9',
    title: 'Technical Writer',
    company: 'DocuTech',
    location: 'Portland, OR',
    salary: '$75,000 - $95,000',
    type: 'Part-time',
    description: 'Create clear and comprehensive documentation for our technical products and APIs.',
    posted: '3 days ago'
  },
  {
    id: '10',
    title: 'Cybersecurity Specialist',
    company: 'SecureNet',
    location: 'Washington, DC',
    salary: '$150,000 - $180,000',
    type: 'Full-time',
    description: 'Protect our systems and data from cyber threats. Security certifications preferred.',
    posted: 'Just now'
  },
  {
    id: '11',
    title: 'Frontend Developer (Vue.js)',
    company: 'VueMaster',
    location: 'Remote',
    salary: '$95,000 - $125,000',
    type: 'Full-time',
    description: 'Build interactive user interfaces using Vue.js. Experience with Vue 3 composition API preferred.',
    posted: '6 days ago'
  },
  {
    id: '12',
    title: 'Machine Learning Engineer',
    company: 'AIInnovations',
    location: 'San Francisco, CA',
    salary: '$160,000 - $190,000',
    type: 'Full-time',
    description: 'Develop and deploy machine learning models to solve complex business problems.',
    posted: '2 days ago'
  },
  {
    id: '13',
    title: 'Technical Support Engineer',
    company: 'HelpDeskPro',
    location: 'Dallas, TX',
    salary: '$70,000 - $90,000',
    type: 'Full-time',
    description: 'Provide technical support to our customers and help troubleshoot software issues.',
    posted: '1 week ago'
  },
  {
    id: '14',
    title: 'Scrum Master',
    company: 'AgileWorks',
    location: 'Remote',
    salary: '$100,000 - $130,000',
    type: 'Contract',
    description: 'Facilitate agile processes and help our development teams deliver high-quality software.',
    posted: '3 days ago'
  },
  {
    id: '15',
    title: 'Database Administrator',
    company: 'DataSystems',
    location: 'Denver, CO',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    description: 'Manage and optimize our database systems. Strong SQL and NoSQL experience required.',
    posted: '5 days ago'
  },
  {
    id: '16',
    title: 'Full Stack Developer',
    company: 'CodeCraft',
    location: 'Miami, FL',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    description: 'Work on both frontend and backend development. Experience with React and Node.js required.',
    posted: '1 day ago'
  },
  {
    id: '17',
    title: 'Cloud Architect',
    company: 'CloudNine',
    location: 'Remote',
    salary: '$170,000 - $200,000',
    type: 'Full-time',
    description: 'Design and implement cloud solutions for our enterprise clients. AWS certification preferred.',
    posted: '2 weeks ago'
  },
  {
    id: '18',
    title: 'UI Developer',
    company: 'DesignHub',
    location: 'Los Angeles, CA',
    salary: '$95,000 - $120,000',
    type: 'Full-time',
    description: 'Implement pixel-perfect UIs based on designer mockups. Strong CSS skills required.',
    posted: '4 days ago'
  },
  {
    id: '19',
    title: 'IT Project Manager',
    company: 'TechSolutions',
    location: 'Atlanta, GA',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    description: 'Manage IT projects from initiation to completion. PMP certification is a plus.',
    posted: '1 week ago'
  },
  {
    id: '20',
    title: 'Systems Administrator',
    company: 'NetworksInc',
    location: 'Phoenix, AZ',
    salary: '$90,000 - $115,000',
    type: 'Full-time',
    description: 'Maintain and support our IT infrastructure. Linux experience required.',
    posted: '3 days ago'
  },
  {
    id: '21',
    title: 'Game Developer (Unity)',
    company: 'GameStudio',
    location: 'Austin, TX',
    salary: '$100,000 - $130,000',
    type: 'Full-time',
    description: 'Develop games using Unity engine. Portfolio of previous work required.',
    posted: 'Just now'
  },
  {
    id: '22',
    title: 'Blockchain Developer',
    company: 'CryptoTech',
    location: 'Remote',
    salary: '$150,000 - $180,000',
    type: 'Full-time',
    description: 'Build decentralized applications on blockchain platforms. Solidity experience required.',
    posted: '5 days ago'
  },
  {
    id: '23',
    title: 'iOS Developer (Swift)',
    company: 'MobileFirst',
    location: 'New York, NY',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    description: 'Develop native iOS applications using Swift. Published apps in the App Store is a plus.',
    posted: '2 days ago'
  },
  {
    id: '24',
    title: 'Android Developer (Kotlin)',
    company: 'AppBuilders',
    location: 'Seattle, WA',
    salary: '$115,000 - $145,000',
    type: 'Full-time',
    description: 'Build native Android applications using Kotlin. Experience with Jetpack components preferred.',
    posted: '1 week ago'
  },
  {
    id: '25',
    title: 'Technical Recruiter',
    company: 'TalentFinders',
    location: 'Remote',
    salary: '$80,000 - $110,000',
    type: 'Full-time',
    description: 'Source and recruit top technical talent for our clients. Technical background preferred.',
    posted: '3 days ago'
  },
  {
    id: '26',
    title: 'Data Engineer',
    company: 'BigDataCo',
    location: 'San Francisco, CA',
    salary: '$140,000 - $170,000',
    type: 'Full-time',
    description: 'Build and maintain data pipelines. Experience with Spark and Hadoop preferred.',
    posted: '1 day ago'
  },
  {
    id: '27',
    title: 'SEO Specialist',
    company: 'DigitalGrowth',
    location: 'Chicago, IL',
    salary: '$75,000 - $95,000',
    type: 'Full-time',
    description: 'Optimize our websites for search engines and improve organic traffic.',
    posted: '4 days ago'
  },
  {
    id: '28',
    title: 'Content Marketing Manager',
    company: 'BrandVoice',
    location: 'Boston, MA',
    salary: '$90,000 - $120,000',
    type: 'Full-time',
    description: 'Develop and execute content marketing strategies to drive engagement and conversions.',
    posted: '2 weeks ago'
  },
  {
    id: '29',
    title: 'Salesforce Developer',
    company: 'CRMExperts',
    location: 'Remote',
    salary: '$110,000 - $140,000',
    type: 'Contract',
    description: 'Customize and develop Salesforce solutions for our clients. Salesforce certifications preferred.',
    posted: '5 days ago'
  },
  {
    id: '30',
    title: 'AR/VR Developer',
    company: 'ImmersiveTech',
    location: 'Los Angeles, CA',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    description: 'Develop augmented and virtual reality experiences. Unity or Unreal Engine experience required.',
    posted: 'Just now'
  }
];

export default function Jobs() {
  const [jobs, setJobs] = useState(jobsData);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    salary: ''
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filteredJobs = jobsData.filter((job) => {
      return (
        job.title.toLowerCase().includes(newFilters.search.toLowerCase()) &&
        (newFilters.location === '' || 
         job.location.toLowerCase().includes(newFilters.location.toLowerCase())) &&
        (newFilters.type === '' || job.type === newFilters.type) &&
        (newFilters.salary === '' || 
         (parseInt(job.salary.replace(/[^0-9]/g, '')) >= parseInt(newFilters.salary)))
      );
    });
    setJobs(filteredJobs);
  };

  return (
    <div className={styles.jobsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Find Your Next Career Opportunity</h1>
          <p>Browse through our latest job openings</p>
        </div>
        
        <JobFilter filters={filters} onFilterChange={handleFilterChange} />
        
        <div className={styles.jobsCount}>
          Showing {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
        </div>
        
        <div className={styles.jobsList}>
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className={styles.noResults}>
              <h3>No jobs found matching your criteria</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}