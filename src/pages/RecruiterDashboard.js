import { useState, useEffect } from 'react';
import { db, timestamp } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function RecruiterDashboard({ user }) {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'recruiter') {
      navigate('/');
      return;
    }
    const fetchData = async () => {
      try {
        // Fetch jobs
        const jobsQuery = query(collection(db, 'jobs'), where('postedBy', '==', user.uid));
        const jobsSnapshot = await getDocs(jobsQuery);
        const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsList);

        // Fetch applications
        const appQuery = query(collection(db, 'applications'), where('jobId', 'in', jobsList.map(j => j.id)));
        const appSnapshot = await getDocs(appQuery);
        setApplications(appSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, [user, navigate]);

  const handleShortlist = async (applicationId) => {
    try {
      await updateDoc(doc(db, 'applications', applicationId), {
        status: 'Shortlisted',
        updatedAt: timestamp(),
      });
      setApplications(applications.map(app =>
        app.id === applicationId ? { ...app, status: 'Shortlisted' } : app
      ));
      alert('Candidate shortlisted!');
    } catch (err) {
      alert('Failed to shortlist.');
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await updateDoc(doc(db, 'applications', applicationId), {
        status: 'Rejected',
        updatedAt: timestamp(),
      });
      setApplications(applications.map(app =>
        app.id === applicationId ? { ...app, status: 'Rejected' } : app
      ));
      alert('Candidate rejected.');
    } catch (err) {
      alert('Failed to reject.');
    }
  };

  const handleMessage = async (userId, jobId) => {
    const message = prompt('Enter message:');
    if (!message) return;
    try {
      await addDoc(collection(db, 'messages'), {
        from: user.uid,
        to: userId,
        jobId,
        content: message,
        sentAt: timestamp(),
      });
      alert('Message sent!');
    } catch (err) {
      alert('Failed to send message.');
    }
  };

  const handleScheduleInterview = async (applicationId) => {
    const date = prompt('Enter interview date (YYYY-MM-DD):');
    if (!date) return;
    try {
      await updateDoc(doc(db, 'applications', applicationId), {
        status: 'Interview Scheduled',
        interviewDate: date,
        updatedAt: timestamp(),
      });
      setApplications(applications.map(app =>
        app.id === applicationId ? { ...app, status: 'Interview Scheduled', interviewDate: date } : app
      ));
      alert('Interview scheduled!');
    } catch (err) {
      alert('Failed to schedule interview.');
    }
  };

  if (!user || user.role !== 'recruiter') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Recruiter Dashboard
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Active Job Posts
        </h2>
        {jobs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No active jobs. Post a job!</p>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{job.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{job.company} - {job.location}</p>
              <h4 className="text-md font-semibold text-gray-800 dark:text-white mt-2">Applicants:</h4>
              {applications.filter(app => app.jobId === job.id).length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">No applicants yet.</p>
              ) : (
                applications
                  .filter(app => app.jobId === job.id)
                  .map(app => (
                    <div key={app.id} className="mt-2 flex space-x-2">
                      <p className="text-gray-600 dark:text-gray-300">
                        User ID: {app.userId} | Status: {app.status}
                        {app.interviewDate && ` | Interview: ${app.interviewDate}`}
                      </p>
                      <button
                        onClick={() => handleShortlist(app.id)}
                        className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleReject(app.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleMessage(app.userId, app.jobId)}
                        className="text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                      >
                        Message
                      </button>
                      <button
                        onClick={() => handleScheduleInterview(app.id)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Schedule Interview
                      </button>
                    </div>
                  ))
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;