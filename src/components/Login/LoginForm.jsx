import React from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';

const LoginForm = ({
  loginData,
  setLoginData,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  handleLoginSubmit,
  handleForgotPassword,
  isLoading
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md" />
          <input
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            disabled={isLoading}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            placeholder="Enter your email address"
            required
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
            disabled={isLoading}
            className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isLoading}
            className="w-4 h-4 text-yellow-400 bg-white/10 border-2 border-white/30 rounded focus:ring-yellow-400/50 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="ml-2 text-sm text-white/80 drop-shadow-md">Remember Me</span>
        </label>
        <button
          type="button"
          onClick={handleForgotPassword}
          disabled={isLoading}
          className="text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors drop-shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg text-white disabled:transform-none disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(245, 158, 11, 0.8))',
          boxShadow: '0 4px 15px 0 rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            SIGNING IN...
          </>
        ) : (
          'SIGN IN'
        )}
      </button>
    </form>
  );
};

export default LoginForm;