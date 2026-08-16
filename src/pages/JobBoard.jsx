import React, { useState } from 'react';
import JobCard from '../components/JobCard'; // Importing the card you just made!

// 1. Our dummy data
const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Remote",
    salary: "$90,000 - $110,000",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataFlow",
    location: "Mumbai, Maharashtra",
    salary: "₹15,00,000 - ₹20,00,000",
    type: "Hybrid",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Pune, Maharashtra",
    salary: "₹10,00,000 - ₹14,00,000",
    type: "On-site",
  }
];

const JobBoard = () => {
  // Mock Authentication State (Phase 1 prep)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm py-4 px-8 flex justify-between items-center mb-8">
        <h1 className="text-2xl font-extrabold text-blue-600">RecruitHub</h1>
        
        <div>
          {isLoggedIn ? (
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Log Out
            </button>
          ) : (
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="bg-gray-900 text-white px-5 py-2 rounded hover:bg-gray-800 font-semibold"
            >
              Log In / Sign Up
            </button>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 pb-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Jobs</h2>
          <p className="text-gray-600">Find your next dream job or hire top talent.</p>
        </div>

        {/* 2. Looping through the data to create JobCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default JobBoard;