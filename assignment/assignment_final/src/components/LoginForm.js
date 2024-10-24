import React from 'react';
import { FiUser, FiLock } from 'react-icons/fi';

const LoginForm = ({ loginData, setLoginData, handleLogin }) => {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl relative overflow-hidden border border-white/20">
        {/* Decorative Background Elements */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-500/30 rounded-full blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-blue-500/30 rounded-full blur-xl"></div>
        
        {/* Form Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2 text-white text-center">Welcome </h2>
          <p className="text-white/80 text-center mb-8">Please enter your details</p>

          <div className="space-y-6">
            {/* Username Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors" />
              </div>
              <input
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-11 py-3 
                         text-white placeholder-white/60 focus:outline-none focus:border-white
                         focus:ring-2 focus:ring-white/50 transition-all duration-200"
                placeholder="Username"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors" />
              </div>
              <input
                required
                type="password"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-11 py-3 
                         text-white placeholder-white/60 focus:outline-none focus:border-white
                         focus:ring-2 focus:ring-white/50 transition-all duration-200"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-white text-blue-600 py-3 px-6 rounded-xl font-semibold
                       hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/50
                       transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                       shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </div>

       
        
        </div>
      </form>
    </div>
  );
};

export default LoginForm;