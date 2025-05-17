import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, timestamp } from '../firebase';
import { doc, getDoc, addDoc, collection, query, where, getDocs } from 'firebase/firestore';

function JobDetails({ user }) {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobDoc = doc(db, 'jobs', id);
        const jobSnapshot = await getDoc(jobDoc);
        if (jobSnapshot.exists()) {
          setJob({ id: jobSnapshot.id, ...jobSnapshot.data() });
        }
        if (user) {
          const appQuery = query(
            collection(db, 'applications'),
            where('userId', '==', user.uid),
            where('jobId', '==', id)
          );
          const appSnapshot = await getDocs(appQuery);
          setApplied(!appSnapshot.empty);
        }
      } catch (err) {
        console.error('Failed to fetch job:', err);
      }
    };
    fetchJob();
  }, [id, user]);

  const handleApply = async () => {
    if (!user) {
      alert('Please log in to apply.');
      navigate('/login');
      return;
    }
    if (!user.emailVerified) {
      alert('Please verify your email to apply.');
      return;
    }
    try {
      await addDoc(collection(db, 'applications'), {
        userId: user.uid,
        jobId: id,
        jobTitle: job.title,
        company: job.company,
        status: 'Applied',
        appliedAt: timestamp(),
      });
      setApplied(true);
      alert('Application submitted!');
    } catch (err) {
      alert('Failed to apply. Try again.');
    }
  };

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{job.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <span className="font-semibold">Company:</span> {job.company}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <span className="font-semibold">Location:</span> {job.location}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <span className="font-semibold">Type:</span> {job.type}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <span className="font-semibold">Salary:</span> {job.minSalary} - {job.maxSalary} LPA
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <span className="font-semibold">Experience:</span> {job.minExperience} - {job.maxExperience} years
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          <span className="font-semibold">Description:</span> {job.description}
        </p>
        <button
          onClick={handleApply}
          disabled={applied}
          className={`px-6 py-3 rounded-md text-white ${
            applied
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-accent hover:bg-green-700 transition-colors'
          }`}
        >
          {applied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}

export default JobDetails;