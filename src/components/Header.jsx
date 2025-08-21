import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { RiMicAiLine } from "react-icons/ri";
import { FiVideo } from "react-icons/fi";
import { PiBooksLight } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { VscSearch } from "react-icons/vsc";
import { HiOutlineBell } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import socialIcon from "../assets/images/social-icon.png";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: <AiOutlineHome />, label: "Home", to: "/" },
    {
      icon: <img src={socialIcon} alt="Social Icon" className="w-7 h-7" />,
      label: "Social",
      to: "/social",
    },
    { icon: <GoLocation />, label: "Nearby", to: "/nearby" },
    { icon: <FiVideo />, label: "Media", to: "/media" },
    { icon: <PiBooksLight />, label: "Blogs", to: "/blogs" },
    { icon: <RiMicAiLine />, label: "Podcast", to: "/podcast" },
    { icon: <TbMessageCircleQuestion />, label: "Questions", to: "/questions" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img
            src="src/assets/images/bee-logo.png"
            alt="Explorer Bees"
            className="w-20 h-16 object-contain"
          />
          <span className="text-3xl font-bold text-yellow-600">
            Explorer<span className="text-black">Bees</span>
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 text-3xl focus:outline-none"
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 items-center text-base font-medium text-gray-700">
          {navItems.map((item, index) => (
            <Link
              to={item.to}
              key={index}
              className={`flex items-center space-x-2 cursor-pointer transition-all duration-200 ${
                location.pathname === item.to
                  ? "text-yellow-600 font-semibold"
                  : "hover:text-yellow-600"
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center space-x-5">
          <VscSearch className="text-2xl text-gray-600 hover:text-yellow-500 cursor-pointer transition duration-200" />
          <HiOutlineBell className="text-2xl text-gray-600 hover:text-yellow-500 cursor-pointer transition duration-200" />
          <Link to="/profile">
            <FaRegUser className="text-2xl text-gray-600 hover:text-yellow-500 cursor-pointer transition duration-200" />
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-full shadow text-sm"
            >
              Login ▼
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40 text-gray-800 z-10">
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setShowDropdown(false)}
                >
                  Login
                </Link>
                <Link
                  to="/Registration"
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setShowDropdown(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-6 pb-4">
          <div className="flex flex-col space-y-4 text-gray-700 font-medium">
            {navItems.map((item, index) => (
              <Link
                to={item.to}
                key={index}
                className="flex items-center space-x-3 hover:text-yellow-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="text-2xl">{item.icon}</div>
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              <VscSearch className="text-2xl text-gray-600 hover:text-yellow-500 cursor-pointer" />
              <HiOutlineBell className="text-2xl text-gray-600 hover:text-yellow-500 cursor-pointer" />
              <Link to="/profile">
                <FaRegUser className="text-2xl text-gray-600 hover:text-yellow-500 cursor-pointer" />
              </Link>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-1.5 rounded-full text-sm"
              >
                Login ▼
              </button>
            </div>

            {showDropdown && (
              <div className="bg-white shadow-md rounded-md mt-2 w-full text-gray-800 z-10">
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowDropdown(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/registration"
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowDropdown(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}