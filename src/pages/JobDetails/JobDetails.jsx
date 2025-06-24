import { useParams } from 'react-router-dom';
import styles from './JobDetails.module.css';

export default function JobDetails() {
  const { id } = useParams();
  
  // In a real app, you would fetch the job details based on the ID
  const job = {
    id,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    description: "We are looking for a skilled Frontend Developer to join our team...",
    requirements: [
      "3+ years of experience with React",
      "Strong JavaScript skills",
      "Experience with CSS and responsive design"
    ]
  };

  return (
    <div className={styles.jobDetails}>
      <div className={styles.container}>
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>
        
        <div className={styles.meta}>
          <span>{job.location}</span>
          <span>{job.salary}</span>
          <span>{job.type}</span>
        </div>
        
        <div className={styles.description}>
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>
        
        <div className={styles.requirements}>
          <h3>Requirements</h3>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
        
        <button className={styles.applyButton}>Apply Now</button>
      </div>
    </div>
  );
}