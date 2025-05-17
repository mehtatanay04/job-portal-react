import { useState, useEffect } from 'react';
import { db, storage, timestamp } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function Profile({ user }) {
  const [profile, setProfile] = useState({
    skills: [],
    education: [],
    experience: [],
    preferences: { role: '', location: '', salary: '' },
    resumeUrl: '',
    alerts: false,
  });
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'job_seeker') {
      navigate('/');
      return;
    }
    const fetchProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data());
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, [user, navigate]);

  const handleResumeUpload = async () => {
    if (!resume) {
      alert('Please select a resume file.');
      return;
    }
    try {
      const storageRef = ref(storage, `resumes/${user.uid}/${resume.name}`);
      await uploadBytes(storageRef, resume);
      const resumeUrl = await getDownloadURL(storageRef);
      await updateDoc(doc(db, 'users', user.uid), { resumeUrl, updatedAt: timestamp() });
      setProfile({ ...profile, resumeUrl });
      alert('Resume uploaded!');
    } catch (err) {
      alert('Failed to upload resume.');
    }
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        skills: profile.skills.split(',').map(s => s.trim()),
        education: profile.education.split(';').map(e => e.trim()),
        experience: profile.experience.split(';').map(e => e.trim()),
        preferences: profile.preferences,
        alerts: profile.alerts,
        updatedAt: timestamp(),
      });
      alert('Profile updated!');
    } catch (err) {
      alert('Failed to save profile.');
    }
  };

  if (!user || user.role !== 'job_seeker') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Your Profile
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Resume (PDF/DOC)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleResumeUpload}
              className="mt-2 bg-primary text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Upload Resume
            </button>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                className="block mt-2 text-primary hover:underline dark:text-blue-400"
              >
                View Uploaded Resume
              </a>
            )}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Skills (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g., JavaScript, React, Python"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              value={profile.skills}
              onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Education (semicolon-separated)</label>
            <textarea
              placeholder="e.g., B.Tech, Computer Science; M.S., Data Science"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              value={profile.education}
              onChange={(e) => setProfile({ ...profile, education: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Experience (semicolon-separated)</label>
            <textarea
              placeholder="e.g., Software Engineer at XYZ, 2 yrs; Intern at ABC, 6 months"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              value={profile.experience}
              onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Preferred Role</label>
            <input
              type="text"
              placeholder="e.g., Frontend Developer"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              value={profile.preferences.role}
              onChange={(e) => setProfile({
                ...profile,
                preferences: { ...profile.preferences, role: e.target.value }
              })}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Preferred Location</label>
            <input
              type="text"
              placeholder="e.g., Bengaluru"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              value={profile.preferences.location}
              onChange={(e) => setProfile({
                ...profile,
                preferences: { ...profile.preferences, location: e.target.value }
              })}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Expected Salary (LPA)</label>
            <input
              type="number"
              placeholder="e.g., 10"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              value={profile.preferences.salary}
              onChange={(e) => setProfile({
                ...profile,
                preferences: { ...profile.preferences, salary: e.target.value }
              })}
            />
          </div>
          <div>
            <label className="flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={profile.alerts}
                onChange={(e) => setProfile({ ...profile, alerts: e.target.checked })}
                className="mr-2"
              />
              Enable Job Alerts (Email)
            </label>
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-primary text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Profile
          </button>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Premium: <a href="#" className="text-primary hover:underline dark:text-blue-400">Resume Writing Service</a> |{' '}
            <a href="#" className="text-primary hover:underline dark:text-blue-400">Profile Booster</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;