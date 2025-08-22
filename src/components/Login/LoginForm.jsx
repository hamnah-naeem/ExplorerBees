import React from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

const LoginForm = ({
  loginData,
  setLoginData,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  handleLoginSubmit,
  handleForgotPassword
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Username
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md" />
          <input
            type="text"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            placeholder="Enter your username"
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
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            placeholder="Enter your password"
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

      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-yellow-400 bg-white/10 border-2 border-white/30 rounded focus:ring-yellow-400/50 backdrop-blur-sm"
          />
          <span className="ml-2 text-sm text-white/80 drop-shadow-md">Remember Me</span>
        </label>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors drop-shadow-md"
        >
          Forgot Password?
        </button>
      </div>

      <button
        onClick={handleLoginSubmit}
        className="w-full py-3 px-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg text-white"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(245, 158, 11, 0.8))',
          boxShadow: '0 4px 15px 0 rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        SIGN IN
      </button>
    </div>
  );
};

export default LoginForm;