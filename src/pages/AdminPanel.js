import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function AdminPanel({ user }) {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    const fetchData = async () => {
      try {
        // Fetch users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        // Fetch jobs
        const jobsSnapshot = await getDocs(collection(db, 'jobs'));
        setJobs(jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, [user, navigate]);

  const handleApproveJob = async (jobId) => {
    try {
      await updateDoc(doc(db, 'jobs', jobId), { approved: true });
      setJobs(jobs.map(job => job.id === jobId ? { ...job, approved: true } : job));
      alert('Job approved!');
    } catch (err) {
      alert('Failed to approve job.');
    }
  };

  const handleRejectJob = async (jobId) => {
    try {
      await updateDoc(doc(db, 'jobs', jobId), { approved: false });
      setJobs(jobs.map(job => job.id === jobId ? { ...job, approved: false } : job));
      alert('Job rejected.');
    } catch (err) {
      alert('Failed to reject job.');
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Admin Panel
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Manage Users
        </h2>
        {users.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <div key={user.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow">
                <p className="text-gray-600 dark:text-gray-300">Email: {user.email}</p>
                <p className="text-gray-600 dark:text-gray-300">Role: {user.role}</p>
                <p className="text-gray-600 dark:text-gray-300">Verified: {user.isVerified ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-4">
          Manage Jobs
        </h2>
        {jobs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{job.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
                <p className="text-gray-600 dark:text-gray-300">Status: {job.approved ? 'Approved' : 'Pending'}</p>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleApproveJob(job.id)}
                    className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectJob(job.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-4">
          Statistics
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Total Users: {users.length} | Total Jobs: {jobs.length} | Jobs Filled: N/A
        </p>
      </div>
    </div>
  );
}

export default AdminPanel;