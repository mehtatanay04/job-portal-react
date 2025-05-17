import { useState } from 'react';
import { auth, sendPasswordResetEmail } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleReset = async () => {
    if (!email) {
      setError('Enter your email to reset password');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (err) {
      setError('Failed to send reset email');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Login
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
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <button
            onClick={handleReset}
            className="w-full text-primary hover:underline dark:text-blue-400"
          >
            Forgot Password?
          </button>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline dark:text-blue-400">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;