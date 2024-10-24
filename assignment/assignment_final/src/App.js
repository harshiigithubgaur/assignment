import React, { useState } from 'react';
import { FiLogOut, FiBriefcase, FiUser } from 'react-icons/fi';
import LoginForm from './components/LoginForm';
import ApplicationForm from './components/ApplicationForm';
import ApplicationsList from './components/ApplicationsList';
import { useLocalStorage } from './hooks/useLocalStorage';

const USERS = [
  { username: 'applicant', password: 'pass123', role: 'applicant' },
  { username: 'reviewer', password: 'pass123', role: 'reviewer' },
  { username: 'approver', password: 'pass123', role: 'approver' }
];

const App = () => {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [applications, setApplications] = useLocalStorage('applications', []);

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = USERS.find(
      u => u.username === loginData.username && u.password === loginData.password
    );
    if (foundUser) {
      setUser(foundUser);
      setLoginData({ username: '', password: '' });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
   
      {/* Main Content */}
      <div className="relative min-h-screen p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-8 shadow-xl border border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-3">
                <FiBriefcase className="text-white h-8 w-8" />
                <h1 className="text-3xl font-bold text-white">Job Application System</h1>
              </div>
              
              {user && (
                <div className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <FiUser className="text-white/80" />
                    <span className="text-white/80">
                      Logged in as: <span className="font-semibold uppercase text-white">{user.role}</span>
                    </span>
                  </div>
                  <button
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 
                             text-white py-2 px-4 rounded-xl transition-all duration-200
                             border border-white/20 hover:border-white/30 shadow-lg"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {!user ? (
              <div className="max-w-md mx-auto">
                <LoginForm
                  loginData={loginData}
                  setLoginData={setLoginData}
                  handleLogin={handleLogin}
                />
              </div>
            ) : (
              <div className="space-y-8">
                {user.role === 'applicant' && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                    <ApplicationForm
                      user={user}
                      applications={applications}
                      setApplications={setApplications}
                    />
                  </div>
                )}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                  <ApplicationsList
                    user={user}
                    applications={applications}
                    setApplications={setApplications}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;