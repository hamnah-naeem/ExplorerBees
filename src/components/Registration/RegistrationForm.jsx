import React from 'react';
import { Eye, EyeOff, User, Mail, Lock, Globe } from 'lucide-react';

const RegistrationForm = ({
  registerData,
  setRegisterData,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  countries,
  handleRegisterSubmit
}) => {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md" />
          <input
            type="text"
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md" />
          <input
            type="email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            placeholder="Enter your email address"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md" />
          <input
            type={showPassword ? "text" : "password"}
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-md"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={registerData.confirmPassword}
            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-md"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Country
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md z-10" />
          <select
            value={registerData.country}
            onChange={(e) => setRegisterData({ ...registerData, country: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all appearance-none cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <option value="" className="bg-gray-800 text-white">Select your country</option>
            {countries.map((country, index) => (
              <option key={index} value={country} className="bg-gray-800 text-white">{country}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleRegisterSubmit}
        className="w-full py-3 px-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg mt-6 text-white"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(245, 158, 11, 0.8))',
          boxShadow: '0 4px 15px 0 rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        CREATE ACCOUNT
      </button>
    </div>
  );
};

export default RegistrationForm;