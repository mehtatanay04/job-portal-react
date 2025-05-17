import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user }) {
  const [applications, setApplications] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [profileStrength, setProfileStrength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'job_seeker') {
      navigate('/');
      return;
    }
    const fetchData = async () => {
      try {
        // Fetch applications
        const appQuery = query(collection(db, 'applications'), where('userId', '==', user.uid));
        const appSnapshot = await getDocs(appQuery);
        setApplications(appSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Fetch bookmarks
        const bookmarkQuery = query(collection(db, 'bookmarks'), where('userId', '==', user.uid));
        const bookmarkSnapshot = await getDocs(bookmarkQuery);
        setBookmarks(bookmarkSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Calculate profile strength
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          let strength = 0;
          if (data.skills?.length) strength += 20;
          if (data.education?.length) strength += 20;
          if (data.experience?.length) strength += 20;
          if (data.resumeUrl) strength += 20;
          if (data.preferences?.role) strength += 20;
          setProfileStrength(strength);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, [user, navigate]);

  if (!user || user.role !== 'job_seeker') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Job Seeker Dashboard
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Profile Strength: {profileStrength}%
        </h2>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${profileStrength}%` }}
          ></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Applied Jobs
        </h2>
        {applications.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No applications yet. Start applying!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map(app => (
              <div key={app.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Job ID: {app.jobId}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">Status: {app.status}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Applied on: {new Date(app.appliedAt.toDate()).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-4">
          Saved Jobs
        </h2>
        {bookmarks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No saved jobs. Bookmark some jobs!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map(bookmark => (
              <div key={bookmark.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Job ID: {bookmark.jobId}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Bookmarked on: {new Date(bookmark.bookmarkedAt.toDate()).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;