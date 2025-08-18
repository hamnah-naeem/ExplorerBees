import React, { useState } from "react";
import profileImage from "../assets/images/prof1.jpg";

export default function Profile() {
  // State for editable fields
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Natashia Khaleira",
    role: "Admin",
    location: "Leeds, United Kingdom",
    bio: "Travel enthusiast and photography lover. Working as a community manager at ExplorerBees. Passionate about discovering hidden gems around the world and sharing travel tips.",
    firstName: "Natashia",
    lastName: "Khaleira",
    dob: "12-IO-1990",
    email: "info@binary-fusion.com",
    phone: "(+62) 821 2554-5846",
    country: "United Kingdom",
    city: "Leeds, East London",
    postalCode: "ERT 1254"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to an API
    console.log("Profile saved:", profile);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans m-5">
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-600 ml-5">My Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-4 py-2 rounded-lg ${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white font-medium`}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Card */}
      <div className="flex items-start p-4 gap-12 mb-6 rounded-lg overflow-hidden shadow-lg bg-white">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="text-2xl font-bold w-full p-1 mb-1 border-b border-gray-300"
              />
              <input
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="font-bold w-full p-1 mb-1 border-b border-gray-300"
              />
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="w-full p-1 border-b border-gray-300"
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="font-bold">{profile.role}</p>
              <p>{profile.location}</p>
            </>
          )}
        </div>
      </div>

      <hr className="border-t border-gray-300 my-6" />

      {/* Bio Section */}
      <div className="mb-6 p-4 bg-white shadow-lg overflow-hidden rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-600">About Me</h3>
        {isEditing ? (
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        ) : (
          <p className="text-gray-700">{profile.bio}</p>
        )}
      </div>

      {/* Personal Information Section */}
      <section className="mb-8 rounded-lg bg-white shadow-lg p-6 overflow-hidden">
        <h2 className="text-xl font-bold mb-4 text-yellow-600">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {['firstName', 'lastName', 'dob'].map((field) => (
            <div key={field}>
              <p className="font-bold text-gray-600">
                {field === 'dob' ? 'Date of Birth' : field === 'firstName' ? 'First Name' : 'Last Name'}
              </p>
              {isEditing ? (
                <input
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  className="w-full p-1 border-b border-gray-300"
                />
              ) : (
                <p>{profile[field]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['email', 'phone', 'role'].map((field) => (
            <div key={field}>
              <p className="font-bold text-gray-600">
                {field === 'phone' ? 'Phone Number' : field === 'email' ? 'Email Address' : 'User Role'}
              </p>
              {isEditing ? (
                <input
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  className="w-full p-1 border-b border-gray-300"
                />
              ) : (
                <p>{profile[field]}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-gray-300 my-6" />

      {/* Address Section */}
      <section className="rounded-lg bg-white shadow-lg p-6 overflow-hidden">
        <h2 className="text-xl font-bold mb-4 text-yellow-600">Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['country', 'city', 'postalCode'].map((field) => (
            <div key={field}>
              <p className="font-bold text-gray-600">
                {field === 'postalCode' ? 'Postal Code' : field.charAt(0).toUpperCase() + field.slice(1)}
              </p>
              {isEditing ? (
                <input
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  className="w-full p-1 border-b border-gray-300"
                />
              ) : (
                <p>{profile[field]}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}