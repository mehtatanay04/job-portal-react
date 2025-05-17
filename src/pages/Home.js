import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, timestamp } from '../firebase';
import { collection, getDocs, addDoc, query, where, orderBy, limit } from 'firebase/firestore';
import JobCard from '../components/JobCard';

function Home({ user }) {
  const [jobs, setJobs] = useState([]);
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    salary: '',
    type: '',
    industry: '',
  });
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Fetch approved jobs
        const jobsQuery = query(
          collection(db, 'jobs'),
          where('approved', '==', true),
          orderBy('postedAt', 'desc')
        );
        const jobsSnapshot = await getDocs(jobsQuery);
        const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsList);

        // Fetch trending jobs (e.g., most recent 3 jobs)
        const trendingQuery = query(
          collection(db, 'jobs'),
          where('approved', '==', true),
          orderBy('postedAt', 'desc'),
          limit(3)
        );
        const trendingSnapshot = await getDocs(trendingQuery);
        const trendingList = trendingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrendingJobs(trendingList);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
        setError('Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    if (!user) {
      alert('Please log in to apply.');
      return;
    }
    if (user.role !== 'job_seeker') {
      alert('Only job seekers can apply for jobs.');
      return;
    }
    if (!user.emailVerified) {
      alert('Please verify your email to apply.');
      return;
    }
    try {
      await addDoc(collection(db, 'applications'), {
        userId: user.uid,
        jobId,
        status: 'Applied',
        appliedAt: timestamp(),
      });
      alert('Application submitted!');
    } catch (err) {
      console.error('Apply error:', err);
      alert('Failed to apply. Try again.');
    }
  };

  const handleBookmark = async (jobId) => {
    if (!user) {
      alert('Please log in to bookmark.');
      return;
    }
    if (user.role !== 'job_seeker') {
      alert('Only job seekers can bookmark jobs.');
      return;
    }
    if (!user.emailVerified) {
      alert('Please verify your email to bookmark.');
      return;
    }
    try {
      await addDoc(collection(db, 'bookmarks'), {
        userId: user.uid,
        jobId,
        bookmarkedAt: timestamp(),
      });
      alert('Job bookmarked!');
    } catch (err) {
      console.error('Bookmark error:', err);
      alert('Failed to bookmark. Try again.');
    }
  };

  const filteredJobs = jobs.filter(
    job =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.experience ||
        (job.minExperience <= parseInt(filters.experience) &&
          job.maxExperience >= parseInt(filters.experience))) &&
      (!filters.salary ||
        (job.minSalary <= parseInt(filters.salary) &&
          job.maxSalary >= parseInt(filters.salary))) &&
      (!filters.type || job.type === filters.type) &&
      (!filters.industry || job.industry === filters.industry)
  ).sort((a, b) =>
    sortBy === 'date'
      ? b.postedAt.seconds - a.postedAt.seconds
      : a.title.localeCompare(b.title)
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 rounded-lg mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore thousands of opportunities tailored to your skills and preferences.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/"
              className="bg-accent text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Search Jobs
            </Link>
            {user ? (
              <>
                {user.role === 'recruiter' && (
                  <Link
                    to="/post-job"
                    className="bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-100 transition-colors dark:text-blue-600 dark:hover:bg-gray-200"
                  >
                    Post a Job
                  </Link>
                )}
                <Link
                  to={user.role === 'job_seeker' ? '/dashboard' : '/recruiter-dashboard'}
                  className="bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-100 transition-colors dark:text-blue-600 dark:hover:bg-gray-200"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-100 transition-colors dark:text-blue-600 dark:hover:bg-gray-200"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-100 transition-colors dark:text-blue-600 dark:hover:bg-gray-200"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
          Search Jobs
        </h2>
        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Job title (e.g., Software Engineer)"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location (e.g., Mumbai)"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
          <input
            type="number"
            placeholder="Experience (years)"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={filters.experience}
            onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
          />
          <input
            type="number"
            placeholder="Salary (LPA)"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={filters.salary}
            onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
          />
          <select
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
          <select
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={filters.industry}
            onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          >
            <option value="">Industry</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end">
          <select
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Relevance</option>
          </select>
        </div>
      </section>

      {/* Trending Jobs (AI Placeholder) */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Trending Jobs
        </h2>
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading trending jobs...</p>
        ) : trendingJobs.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">No trending jobs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                user={user}
                onApply={handleApply}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        )}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          (AI-based recommendations and resume scoring coming soon!)
        </p>
      </section>

      {/* Job Listings */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Featured Jobs
        </h2>
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No jobs found. Try adjusting your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.slice(0, 6).map(job => (
              <JobCard
                key={job.id}
                job={job}
                user={user}
                onApply={handleApply}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        )}
        {filteredJobs.length > 6 && (
          <div className="text-center mt-8">
            <Link
              to="/"
              className="text-primary font-medium hover:underline dark:text-blue-400"
            >
              View All Jobs
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;