import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // For demo purposes, password is not validated
      // You should use a proper authentication system in a real app
      const success = await login(email, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password. Try one of the demo accounts listed below.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo');
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(demoEmail, 'demo');
      
      if (success) {
        navigate('/');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-primary-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">NIST 800-53 Audit Tracker</h2>
          <p className="mt-2 text-gray-600">Sign in to access your compliance dashboard</p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <div>
              <Button
                type="submit"
                className="w-full justify-center"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Accounts - Click to Login</span>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <button
                onClick={() => handleDemoLogin('admin@example.com')}
                disabled={isLoading}
                className="w-full border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Admin User</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 border border-primary-200">Admin</span>
                </div>
                <div className="text-xs text-gray-500 text-left">Email: admin@example.com</div>
                <div className="text-xs text-primary-600 text-left font-medium">Click to login instantly</div>
              </button>
              
              <button
                onClick={() => handleDemoLogin('contributor@example.com')}
                disabled={isLoading}
                className="w-full border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Contributor User</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-700 border border-secondary-200">Contributor</span>
                </div>
                <div className="text-xs text-gray-500 text-left">Email: contributor@example.com</div>
                <div className="text-xs text-primary-600 text-left font-medium">Click to login instantly</div>
              </button>
              
              <button
                onClick={() => handleDemoLogin('viewer@example.com')}
                disabled={isLoading}
                className="w-full border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Viewer User</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200">Viewer</span>
                </div>
                <div className="text-xs text-gray-500 text-left">Email: viewer@example.com</div>
                <div className="text-xs text-primary-600 text-left font-medium">Click to login instantly</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;