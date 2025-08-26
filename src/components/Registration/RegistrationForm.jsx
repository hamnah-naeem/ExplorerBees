import React from 'react';
import { Eye, EyeOff, User, Mail, Lock, Globe, MapPin, Building, UserCheck, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const RegistrationForm = ({
  registerData = {},
  setRegisterData,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  countries = [],
  states = [],
  cities = [],
  handleRegisterSubmit,
  errors = {},
  touched = {},
  markFieldAsTouched = () => {},
  loading = {},
  usernameStatus = {}
}) => {
  
  const handleInputChange = (field, value) => {
    setRegisterData({ ...registerData, [field]: value });
  };

  const handleInputFocus = (fieldName) => {
    markFieldAsTouched(fieldName);
  };

  const getInputClassName = (fieldName) => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `w-full pl-10 pr-4 py-3 backdrop-blur-md border rounded-xl text-white placeholder-white/60 focus:ring-2 focus:border-yellow-400/50 outline-none transition-all ${
      hasError 
        ? 'bg-red-500/10 border-red-400 focus:ring-red-400/50' 
        : 'bg-white/10 border-white/20 focus:ring-yellow-400/50'
    }`;
  };

  const getInputStyle = (fieldName) => {
    const hasError = errors[fieldName] && touched[fieldName];
    return {
      background: hasError 
        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    };
  };

  const getSelectClassName = (fieldName) => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `w-full pl-10 pr-4 py-3 backdrop-blur-md border rounded-xl text-white focus:ring-2 focus:border-yellow-400/50 outline-none transition-all appearance-none cursor-pointer ${
      hasError 
        ? 'bg-red-500/10 border-red-400 focus:ring-red-400/50' 
        : 'bg-white/10 border-white/20 focus:ring-yellow-400/50'
    }`;
  };

  return (
    <div className="space-y-5">
      {/* Full Name Field */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Full Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md" />
          <input
            type="text"
            value={registerData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onFocus={() => handleInputFocus('name')}
            className={getInputClassName('name')}
            style={getInputStyle('name')}
            placeholder="Enter your full name"
          />
        </div>
        {errors.name && touched.name && (
          <p className="text-red-400 text-sm mt-1 drop-shadow-md">{errors.name}</p>
        )}
      </div>

      {/* Username Field with Availability Check */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Username *
        </label>
        <div className="relative">
          <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md" />
          <input
            type="text"
            value={registerData.username || ''}
            onChange={(e) => handleInputChange('username', e.target.value)}
            onFocus={() => handleInputFocus('username')}
            className={`${getInputClassName('username')} pr-12`}
            style={getInputStyle('username')}
            placeholder="Choose a unique username"
          />
          
          {/* Username status indicator */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {loading.username || usernameStatus.checking ? (
              <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
            ) : usernameStatus.available === true ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : usernameStatus.available === false ? (
              <AlertCircle className="w-5 h-5 text-red-400" />
            ) : null}
          </div>
        </div>
        
        {/* Username status message */}
        {usernameStatus.message && registerData.username && registerData.username.length >= 3 && (
          <p className={`text-sm mt-1 drop-shadow-md ${
            usernameStatus.available === true ? 'text-green-400' : 'text-red-400'
          }`}>
            {usernameStatus.message}
          </p>
        )}
        
        {errors.username && touched.username && (
          <p className="text-red-400 text-sm mt-1 drop-shadow-md">{errors.username}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md" />
          <input
            type="email"
            value={registerData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onFocus={() => handleInputFocus('email')}
            className={getInputClassName('email')}
            style={getInputStyle('email')}
            placeholder="Enter your email address"
          />
        </div>
        {errors.email && touched.email && (
          <p className="text-red-400 text-sm mt-1 drop-shadow-md">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md" />
          <input
            type={showPassword ? "text" : "password"}
            value={registerData.password || ''}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onFocus={() => handleInputFocus('password')}
            className={`${getInputClassName('password')} pr-12`}
            style={getInputStyle('password')}
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
        {errors.password && touched.password && (
          <p className="text-red-400 text-sm mt-1 drop-shadow-md">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Confirm Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={registerData.confirmPassword || ''}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            onFocus={() => handleInputFocus('confirmPassword')}
            className={`${getInputClassName('confirmPassword')} pr-12`}
            style={getInputStyle('confirmPassword')}
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
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="text-red-400 text-sm mt-1 drop-shadow-md">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Country Field */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Country *
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md z-10" />
          {loading.countries ? (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
              <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
            </div>
          ) : null}
          <select
            value={registerData.country || ''}
            onChange={(e) => handleInputChange('country', e.target.value)}
            onFocus={() => handleInputFocus('country')}
            className={getSelectClassName('country')}
            style={getInputStyle('country')}
            disabled={loading.countries}
          >
            <option value="" className="bg-gray-800 text-white">
              {loading.countries ? 'Loading countries...' : 'Select your country'}
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country} className="bg-gray-800 text-white">{country}</option>
            ))}
          </select>
        </div>
        {errors.country && touched.country && (
          <p className="text-red-400 text-sm mt-1 drop-shadow-md">{errors.country}</p>
        )}
      </div>

      {/* State Field */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          State/Province *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md z-10" />
          {loading.states ? (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
              <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
            </div>
          ) : null}
          <select
            value={registerData.state || ''}
            onChange={(e) => handleInputChange('state', e.target.value)}
            onFocus={() => handleInputFocus('state')}
            className={getSelectClassName('state')}
            style={getInputStyle('state')}
            disabled={!registerData.country || loading.states}
          >
            <option value="" className="bg-gray-800 text-white">
              {!registerData.country 
                ? 'Please select country first' 
                : loading.states 
                ? 'Loading states...' 
                : 'Select your state'}
            </option>
            {states.map((state, index) => (
              <option key={index} value={state} className="bg-gray-800 text-white">{state}</option>
            ))}
          </select>
        </div>
        {errors.state && touched.state && (
          <p className="text-red-400 text-sm mt-1 drop-shadow-md">{errors.state}</p>
        )}
      </div>

      {/* City Field */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          City *
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 drop-shadow-md z-10" />
          {loading.cities ? (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
              <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
            </div>
          ) : null}
          <select
            value={registerData.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            onFocus={() => handleInputFocus('city')}
            className={getSelectClassName('city')}
            style={getInputStyle('city')}
            disabled={!registerData.state || loading.cities}
          >
            <option value="" className="bg-gray-800 text-white">
              {!registerData.state 
                ? 'Please select state first' 
                : loading.cities 
                ? 'Loading cities...' 
                : 'Select your city'}
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city} className="bg-gray-800 text-white">{city}</option>
            ))}
          </select>
        </div>
        {errors.city && touched.city && (
          <p className="text-red-400 text-sm mt-1 drop-shadow-md">{errors.city}</p>
        )}
      </div>

      <button
        onClick={handleRegisterSubmit}
        className="w-full py-3 px-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg mt-6 text-white cursor-pointer"
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