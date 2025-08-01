import React from 'react';
import contactus from '../assets/contact-us.jpg';

const Contact = () => {
  return (
    <div className="flex flex-col max-w-7xl mx-auto md:flex-row lg:h-screen items-center">
      {/* Left Image Section */}
      <div className="hidden md:flex flex-1 bg-gray-100 justify-center items-center">
        <img
          src={contactus}
          alt="Contact Us"
          className="w-full h-full max-w-md md:max-w-full object-cover"
        />
      </div>

      {/* Right Contact Form Section */}
      <div className="flex-1 w-full flex flex-col justify-center px-8 py-12">
        <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif'>Get In Touch</h2>
       <hr className='text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10' />
        
        <div className="bg-gradient-to-br from-black via-[#3b2a1a] to-[#a97442] rounded-xl shadow-xl p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-90 text-black border border-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-90 text-black border border-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Enter your message"
                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-90 text-black border border-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-3 rounded-md hover:bg-yellow-200 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
