import { useState } from 'react';
import { auth, sendEmailVerification } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('job_seeker');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        role,
        isVerified: false,
        createdAt: new Date(),
      });
      alert('Account created! Please verify your email.');
      navigate('/login');
    } catch (err) {
      setError('Failed to create account. Try a stronger password.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Signup
      </h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="job_seeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleSignup}
            className="w-full bg-primary text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Signup
          </button>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline dark:text-blue-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;