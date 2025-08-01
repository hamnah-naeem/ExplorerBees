import React from 'react'
import footer from '../assets/mountain-footer.jpg'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer
      className="bg-gray-800 text-white py-10"
      style={{
        backgroundImage: `url(${footer})`,
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h1 className="font-bold text-4xl mb-4">
              <span className="text-yellow-500">Explorer</span>Bees
            </h1>
            <p className="text-sm">
              We’re committed to making every journey unforgettable by offering
              personalized tours and seamless travel experiences that inspire
              you to explore more and worry less.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['Home', 'Destinations', 'Tours', 'About Us', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-yellow-500 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Explorer bees, NICAT Old Airport, Islamabad</li>
              <li>Phone: +92 311 1000044</li>
              <li>Email: info@explorerbees.com</li>
            </ul>
          </div>

          {/* Follow & Subscribe */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.facebook.com/explorerbees?mibextid=2JQ9oc" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="hover:text-yellow-500 transition text-xl" />
              </a>
              <a href="https://www.instagram.com/explorer_bees/?igshid=OGQ5ZDc2ODk2ZA%3D%3D" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:text-yellow-500 transition text-xl" />
              </a>
              <a href="https://www.linkedin.com/groups/9388289/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="hover:text-yellow-500 transition text-xl" />
              </a>
            </div>

            <h3 className="text-sm mb-2">Subscribe for Updates</h3>
            <form className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 rounded-md text-black text-sm w-full sm:w-auto bg-white"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md text-sm font-medium transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ExplorerBees. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
