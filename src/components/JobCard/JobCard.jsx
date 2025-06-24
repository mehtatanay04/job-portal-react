import { Link } from 'react-router-dom';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import styles from './JobCard.module.css';

export default function JobCard({ job }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.companyLogo}>
          {job.company.charAt(0)}
        </div>
        <div className={styles.jobTitle}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
        </div>
      </div>
      
      <div className={styles.jobDescription}>
        <p>{job.description.substring(0, 120)}...</p>
      </div>
      
      <div className={styles.jobDetails}>
        <div className={styles.detailItem}>
          <FaBriefcase className={styles.detailIcon} />
          <span>{job.type}</span>
        </div>
        <div className={styles.detailItem}>
          <FaMapMarkerAlt className={styles.detailIcon} />
          <span>{job.location}</span>
        </div>
        <div className={styles.detailItem}>
          <FaMoneyBillWave className={styles.detailIcon} />
          <span>{job.salary}</span>
        </div>
        <div className={styles.detailItem}>
          <FaClock className={styles.detailIcon} />
          <span>{job.posted}</span>
        </div>
      </div>
      
      <div className={styles.cardFooter}>
        <Link to={`/jobs/${job.id}`} className={styles.viewButton}>
          View Details
        </Link>
        <button className={styles.applyButton}>Apply Now</button>
      </div>
    </div>
  );
}