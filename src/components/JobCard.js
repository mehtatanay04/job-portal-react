import { Link } from 'react-router-dom';

function JobCard({ job, user, onApply, onBookmark }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{job.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-1">{job.company}</p>
      <p className="text-gray-500 dark:text-gray-400 mt-1">{job.location}</p>
      <p className="text-gray-500 dark:text-gray-400 mt-1">{job.type}</p>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        {job.minSalary} - {job.maxSalary} | {job.minExperience} - {job.maxExperience} yrs
      </p>
      <div className="mt-4 flex space-x-4">
        <Link
          to={`/job/${job.id}`}
          className="text-primary font-medium hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
        >
          View Details
        </Link>
        {user?.role === 'job_seeker' && (
          <>
            <button
              onClick={() => onApply(job.id)}
              className="text-accent hover:text-green-700 dark:hover:text-green-500 transition-colors"
            >
              Apply
            </button>
            <button
              onClick={() => onBookmark(job.id)}
              className="text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            >
              Bookmark
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default JobCard;