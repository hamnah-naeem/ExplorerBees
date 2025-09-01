import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegistrationForm from '../components/Registration/RegistrationForm';
import SocialAuthButtons from '../components/Registration/SocialAuthButtons';
import { endpoints } from '../apis/endpoints';

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    state: '',
    city: ''
  });

  // Success message state
  const [successMessage, setSuccessMessage] = useState('');

  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // API data states
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState({
    countries: false,
    states: false,
    cities: false,
    username: false
  });

  // Store full API response data for ID mapping
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  // Username availability state
  const [usernameStatus, setUsernameStatus] = useState({
    available: null,
    checking: false,
    message: ''
  });

  // Success message function
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    
    // Auto hide after 3 seconds and navigate
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (registerData.country) {
      const selectedCountry = countryData.find(c => c.name === registerData.country);
      if (selectedCountry) {
        fetchStates(selectedCountry.id);
        // Clear state and city when country changes
        setRegisterData(prev => ({ ...prev, state: '', city: '' }));
        setCities([]);
        setCityData([]);
      }
    } else {
      setStates([]);
      setStateData([]);
      setCities([]);
      setCityData([]);
    }
  }, [registerData.country, countryData]);

  // Fetch cities when state changes
  useEffect(() => {
    if (registerData.state) {
      const selectedState = stateData.find(s => s.name === registerData.state);
      if (selectedState) {
        fetchCities(selectedState.id);
        // Clear city when state changes
        setRegisterData(prev => ({ ...prev, city: '' }));
      }
    } else {
      setCities([]);
      setCityData([]);
    }
  }, [registerData.state, stateData]);

  // Debounced username check
  useEffect(() => {
    if (registerData.username && registerData.username.length >= 3) {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(registerData.username);
      }, 500); // 500ms debounce

      return () => clearTimeout(timeoutId);
    } else {
      setUsernameStatus({ available: null, checking: false, message: '' });
    }
  }, [registerData.username]);

  // API Functions

  const fetchCountries = async () => {
    setLoading(prev => ({ ...prev, countries: true }));
    try {
      const response = await fetch(endpoints.showCountries);
      const result = await response.json();

      if (result.error === false && result.records) {
        setCountryData(result.records);
        setCountries(result.records.map(country => country.name));
      } else {
        console.error("Error fetching countries:", result.error_msg);
        setCountries([]);
        setCountryData([]);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      setCountries([]);
      setCountryData([]);
    } finally {
      setLoading(prev => ({ ...prev, countries: false }));
    }
  };

  // ✅ Fetch States
  const fetchStates = async (countryId) => {
    setLoading(prev => ({ ...prev, states: true }));
    try {
      const formData = new FormData();
      formData.append("country_id", countryId);

      const response = await fetch(endpoints.showStates, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.error === false && result.records) {
        setStateData(result.records);
        setStates(result.records.map(state => state.name));
      } else {
        console.error("Error fetching states:", result.error_msg);
        setStates([]);
        setStateData([]);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      setStates([]);
      setStateData([]);
    } finally {
      setLoading(prev => ({ ...prev, states: false }));
    }
  };

  // ✅ Fetch Cities
  const fetchCities = async (stateId) => {
    setLoading(prev => ({ ...prev, cities: true }));
    try {
      const formData = new FormData();
      formData.append("state_id", stateId);

      const response = await fetch(endpoints.showCities, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.error === false && result.records) {
        setCityData(result.records);
        setCities(result.records.map(city => city.name));
      } else {
        console.error("Error fetching cities:", result.error_msg);
        setCities([]);
        setCityData([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
      setCityData([]);
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  };

  const checkUsernameAvailability = async (username) => {
    setUsernameStatus(prev => ({ ...prev, checking: true }));
    setLoading(prev => ({ ...prev, username: true }));

    try {
      const formData = new FormData();
      formData.append('username', username);

      const response = await fetch(endpoints.checkUsername,
        {
          method: 'POST',
          body: formData
        }
      );
      const result = await response.json();

      if (result.error === true) {
        setUsernameStatus({
          available: true,
          checking: false,
          message: 'Username is available!'
        });
      } else {
        setUsernameStatus({
          available: false,
          checking: false,
          message: 'Username is already taken!'
        });
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameStatus({
        available: null,
        checking: false,
        message: 'Error checking username availability'
      });
    } finally {
      setLoading(prev => ({ ...prev, username: false }));
    }
  };

  // Enhanced validation function with username availability check
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Please enter your full name';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;

      case 'username':
        if (!value.trim()) {
          error = 'Username is required';
        } else if (value.length < 3) {
          error = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = 'Username can only contain letters, numbers, and underscores';
        } else if (usernameStatus.available === false) {
          error = usernameStatus.message;
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Please enter your email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Please enter a password';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters long';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== registerData.password) {
          error = 'Passwords do not match!';
        }
        break;

      case 'country':
        if (!value) {
          error = 'Please select your country';
        }
        break;

      case 'state':
        if (!value) {
          error = 'Please select your state';
        }
        break;

      case 'city':
        if (!value) {
          error = 'Please select your city';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Enhanced setRegisterData with validation
  const enhancedSetRegisterData = (newData) => {
    const updatedData = { ...registerData, ...newData };
    setRegisterData(updatedData);

    // Validate changed fields if they were touched
    Object.keys(newData).forEach(field => {
      if (touched[field]) {
        const error = validateField(field, newData[field]);
        setErrors(prev => ({
          ...prev,
          [field]: error
        }));
      }
    });
  };

  // Mark field as touched when user interacts with it
  const markFieldAsTouched = (fieldName) => {
    if (!touched[fieldName]) {
      setTouched(prev => ({
        ...prev,
        [fieldName]: true
      }));
    }
  };

  // Get IDs for API submission
  const getSelectedIds = () => {
    const selectedCountry = countryData.find(c => c.name === registerData.country);
    const selectedState = stateData.find(s => s.name === registerData.state);
    const selectedCity = cityData.find(c => c.name === registerData.city);

    return {
      countryId: selectedCountry?.id || '',
      stateId: selectedState?.id || '',
      cityId: selectedCity?.id || ''
    };
  };

  // Enhanced handleRegisterSubmit with API IDs
  const handleRegisterSubmit = async () => {
    // Mark all fields as touched for validation display
    const allFields = ['name', 'username', 'email', 'password', 'confirmPassword', 'country', 'state', 'city'];
    const newTouched = {};
    const newErrors = {};

    allFields.forEach(field => {
      newTouched[field] = true;
      const error = validateField(field, registerData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Check username availability one more time before submission
    if (usernameStatus.available === false) {
      newErrors.username = usernameStatus.message;
    } else if (usernameStatus.available === null && registerData.username) {
      newErrors.username = 'Please wait for username verification';
    }

    setTouched(newTouched);
    setErrors(newErrors);

    // If there are validation errors, stop here
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Get the selected IDs for API
    const { countryId, stateId, cityId } = getSelectedIds();

    // Prepare form data for API
    const formdata = new FormData();
    formdata.append("email", registerData.email);
    formdata.append("name", registerData.name);
    formdata.append("password", registerData.password);
    formdata.append("image", "image.png"); // static for now
    formdata.append("password_type", "manual");
    formdata.append("username", registerData.username);
    formdata.append("country_id", countryId);
    formdata.append("state_id", stateId);
    formdata.append("city_id", cityId);

    try {
      const response = await fetch(
       endpoints.register,
        {
          method: "POST",
          body: formdata,
        }
      );

      // Check if response has body
      const text = await response.text();

      let result;
      try {
        result = text ? JSON.parse(text) : {};
      } catch (err) {
        console.error("Failed to parse JSON:", text);
        result = {};
      }

      console.log("API Response:", result);

      if (result.error) {
        alert(result.error_msg || "Something went wrong!");
        return;
      } else {
        // Show success message instead of alert
        showSuccessMessage("Registration successful! Redirecting to login...");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error, please try again later.");
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`${provider} registration clicked`);
    // Add social registration logic here
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
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                }}
              >
                {/* Top highlight line for glass effect */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                {/* Side highlight lines */}
                <div className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                <div className="absolute right-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    Create Account
                  </h1>
                  <p className="text-white/80 drop-shadow-md">
                    Join us today! Please fill in your details.
                  </p>
                </div>

                {/* Registration Form */}
                <RegistrationForm
                  registerData={registerData}
                  setRegisterData={enhancedSetRegisterData}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  countries={countries}
                  states={states}
                  cities={cities}
                  handleRegisterSubmit={handleRegisterSubmit}
                  errors={errors}
                  touched={touched}
                  markFieldAsTouched={markFieldAsTouched}
                  loading={loading}
                  usernameStatus={usernameStatus}
                />

                {/* Social Auth Buttons */}
                <SocialAuthButtons handleSocialRegister={handleSocialRegister} />
                   {/* Success Message - Simple green notification at top of form */}
                {successMessage && (
                  <div className="mb-4 p-4 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-100 font-medium drop-shadow-sm">
                        {successMessage}
                      </p>
                    </div>
                  </div>
                )}
                {/* Link to Login */}
                <div className="text-center mt-6">
                  <p className="text-white/80 drop-shadow-md">
                    Already have an account?{' '}
                    <button
                      onClick={() => navigate('/login')}
                      className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors drop-shadow-md"
                    >
                      Sign in here
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

export default Registration;