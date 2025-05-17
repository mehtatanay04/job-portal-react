import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';
import RecruiterDashboard from './pages/RecruiterDashboard';
import Blog from './pages/Blog';
import AdminPanel from './pages/AdminPanel';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const { uid, email, emailVerified } = currentUser;
        setUser({ uid, email, emailVerified });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/job/:id" element={<JobDetails user={user} />} />
            <Route path="/post-job" element={<PostJob user={user} />} />
            <Route path="/recruiter-dashboard" element={<RecruiterDashboard user={user} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<AdminPanel user={user} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;