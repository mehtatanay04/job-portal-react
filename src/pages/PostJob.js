import { useState } from 'react';
import { db, timestamp } from '../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function PostJob({ user }) {
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    description: '',
    minExperience: '',
    maxExperience: '',
    minSalary: '',
    maxSalary: '',
    industry: '',
  });
  const [companyProfile, setCompanyProfile] = useState({
    name: '',
    description: '',
    website: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== 'recruiter') {
      alert('Please log in as a recruiter to post a job.');
      navigate('/login');
      return;
    }
    if (!user.emailVerified) {
      alert('Please verify your email to post a job.');
      return;
    }
    try {
      // Save company profile
      await setDoc(doc(db, 'companies', user.uid), {
        ...companyProfile,
        updatedAt: timestamp(),
      });
      // Post job
      await addDoc(collection(db, 'jobs'), {
        ...job,
        postedBy: user.uid,
        postedAt: timestamp(),
      });
      alert('Job posted successfully!');
      navigate('/recruiter-dashboard');
    } catch (err) {
      alert('Failed to post job. Try again.');
      console.error('Error posting job:', err);
    }
  };

  if (!user || user.role !== 'recruiter') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Post a Job
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Company Profile
        </h2>
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={companyProfile.name}
            onChange={(e) => setCompanyProfile({ ...companyProfile, name: e.target.value })}
          />
          <textarea
            placeholder="Company Description"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            rows="4"
            value={companyProfile.description}
            onChange={(e) => setCompanyProfile({ ...companyProfile, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Website URL"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={companyProfile.website}
            onChange={(e) => setCompanyProfile({ ...companyProfile, website: e.target.value })}
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Job Details
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Company"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={job.company}
            onChange={(e) => setJob({ ...job, company: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={job.location}
            onChange={(e) => setJob({ ...job, location: e.target.value })}
          />
          <select
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={job.type}
            onChange={(e) => setJob({ ...job, type: e.target.value })}
          >
            <option value="">Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
          <textarea
            placeholder="Job Description"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            rows="6"
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Minimum Experience (years)"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={job.minExperience}
            onChange={(e) => setJob({ ...job, minExperience: e.target.value })}
          />
          <input
            type="number"
            placeholder="Maximum Experience (years)"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={job.maxExperience}
            onChange={(e) => setJob({ ...job, maxExperience: e.target.value })}
          />
          <input
            type="number"
            placeholder="Minimum Salary (LPA)"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={job.minSalary}
            onChange={(e) => setJob({ ...job, minSalary: e.target.value })}
          />
          <input
            type="number"
            placeholder="Maximum Salary (LPA)"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={job.maxSalary}
            onChange={(e) => setJob({ ...job, maxSalary: e.target.value })}
          />
          <select
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={job.industry}
            onChange={(e) => setJob({ ...job, industry: e.target.value })}
          >
            <option value="">Industry</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
          </select>
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Post Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostJob;