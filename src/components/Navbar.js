import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Navbar({ user, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Job Portal
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <Link to="/blog" className="hover:text-accent transition-colors">
            Blog
          </Link>
          {user ? (
            <>
              {user.role === 'job_seeker' && (
                <>
                  <Link to="/profile" className="hover:text-accent transition-colors">
                    Profile
                  </Link>
                  <Link to="/dashboard" className="hover:text-accent transition-colors">
                    Dashboard
                  </Link>
                </>
              )}
              {user.role === 'recruiter' && (
                <>
                  <Link to="/post-job" className="hover:text-accent transition-colors">
                    Post Job
                  </Link>
                  <Link to="/recruiter-dashboard" className="hover:text-accent transition-colors">
                    Dashboard
                  </Link>
                </>
              )}
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-accent transition-colors">
                  Admin
                </Link>
              )}
              <button
                onClick={toggleDarkMode}
                className="hover:text-accent transition-colors"
              >
                {document.documentElement.classList.contains('dark') ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-accent text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent transition-colors">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-accent text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;