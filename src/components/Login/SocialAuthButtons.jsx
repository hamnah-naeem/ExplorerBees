import React from 'react';
import { FaGoogle, FaFacebook } from "react-icons/fa";

const SocialAuthButtons = ({ handleSocialLogin }) => {
  return (
    <div className="text-center">
      <p className="text-white/80 text-sm mb-4 drop-shadow-md">Or Sign In With</p>
      <div className="flex space-x-4">
        <button 
          type="button"
          onClick={() => handleSocialLogin('Google')}
          className="flex-1 flex items-center justify-center px-4 py-2.5 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <FaGoogle className="text-red-400 mr-2" />
          <span className="text-sm font-medium text-white/90">Google</span>
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('Facebook')}
          className="flex-1 flex items-center justify-center px-4 py-2.5 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 极速加速器, 0.05), rgba(255, 255, 255, 0.02))',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <FaFacebook className="text-blue-400 mr-2" />
          <span className="text-sm font-medium text-white/90">Facebook</span>
        </button>
      </div>
    </div>
  );
};

export default SocialAuthButtons;