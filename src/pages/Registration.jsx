import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegisterLeftSide from '../components/RegisterLeftSide';
import RegisterRightSide from '../components/RegisterRightSide';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration attempt:', formData);
  };

  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';
  const passwordStrong = formData.password.length >= 8;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <RegisterLeftSide />
          <RegisterRightSide 
            formData={formData}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            handleInputChange={handleInputChange}
            setShowPassword={setShowPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            handleSubmit={handleSubmit}
            passwordsMatch={passwordsMatch}
            passwordStrong={passwordStrong}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}