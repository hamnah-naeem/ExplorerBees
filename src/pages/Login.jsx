import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import SocialAuthButtons from '../components/Login/SocialAuthButtons';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleLoginSubmit = () => {
    console.log('Login data:', loginData);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Image Container - Fixed position behind everything */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Container - Relative positioning to appear above background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Simple Header with Logo Only */}
        <div className="flex justify-between items-center p-6">
          <Link to="/" className="flex items-center">
            <img
              src="src/assets/images/bee-logo.png"
              alt="Explorer Bees"
              className="w-16 h-12 object-contain"
            />
            <span className="text-2xl font-bold text-white drop-shadow-lg">
              Explorer<span className="text-yellow-400">Bees</span>
            </span>
          </Link>
          
          {/* Optional: Back to Home link */}
          <Link 
            to="/" 
            className="text-white/80 hover:text-white transition-colors drop-shadow-md font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Main content area with flex-grow to push footer down */}
        <div className="flex-grow flex items-center justify-center p-4">
          {/* Form Container with Enhanced Glass Effect */}
          <div className="w-full max-w-md">
            {/* Outer glow container */}
            <div className="relative">
              {/* Glowing backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur-xl"></div>
              
              {/* Main glass container */}
              <div className="relative bg-white/极速加速器 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                }}
              >
                {/* Top highlight line for glass effect */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/极速加速器 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                
                {/* Side highlight lines */}
                <div className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                <div className="absolute right-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-white/20 to极速加速器 transparent"></div>

                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    Welcome Back!
                  </h1>
                  <p className="text-white/80 drop-shadow-md">
                    Please login to your account in ExplorerBees.
                  </p>
                </div>

                {/* Login Form */}
                <LoginForm
                  loginData={loginData}
                  setLoginData={setLoginData}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  rememberMe={rememberMe}
                  setRememberMe={setRememberMe}
                  handleLoginSubmit={handleLoginSubmit}
                  handleForgotPassword={handleForgotPassword}
                />

                {/* Social Auth Buttons */}
                <SocialAuthButtons handleSocialLogin={handleSocialLogin} />

                {/* Link to Registration */}
                <div className="text-center mt-6">
                  <p className="text-white/80 drop-shadow-md">
                    Don't have an account?{' '}
                    <button
                      onClick={() => navigate('/Registration')}
                      className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors drop-shadow-md"
                    >
                      Sign up here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;