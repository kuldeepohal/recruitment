import React, { useState } from 'react';
import JobCard from '../components/JobCard';

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
    salary: "₹10,00,000 - ₹14,00,000",import React, { useState } from 'react';
import JobCard from '../components/JobCard';
import ApplicationModal from '../components/ApplicationModal';

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
  },
  {
    id: 4,
    title: "React Native Developer",
    company: "MobileFirst",
    location: "Remote",
    salary: "₹12,00,000 - ₹18,00,000",
    type: "Full-time",
  }
];

const JobBoard = () => {
  // Auth & UI States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Filter Logic
  const filteredJobs = dummyJobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = filterType === 'All' || job.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 relative">
      
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm py-4 px-8 flex justify-between items-center mb-8">
        <h1 className="text-2xl font-extrabold text-blue-600">RecruitHub</h1>
        <div>
          {isLoggedIn ? (
            <button onClick={() => setIsLoggedIn(false)} className="text-red-500 hover:text-red-700 font-semibold">
              Log Out
            </button>
          ) : (
            <button onClick={() => setIsLoggedIn(true)} className="bg-gray-900 text-white px-5 py-2 rounded hover:bg-gray-800 font-semibold">
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

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search by job title or company..." 
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select 
            className="border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {/* Job Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onApply={(jobData) => setSelectedJob(jobData)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl font-semibold">No jobs found matching your criteria.</p>
            <button 
              onClick={() => { setSearchTerm(''); setFilterType('All'); }}
              className="mt-4 text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Application Modal (Renders if selectedJob is not null) */}
      {selectedJob && (
        <ApplicationModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}

    </div>
  );
};

export default JobBoard;
    type: "On-site",
  },
  {
    id: 4,
    title: "React Native Developer",
    company: "MobileFirst",
    location: "Remote",
    salary: "₹12,00,000 - ₹18,00,000",
    type: "Full-time",
  }
];

const JobBoard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 1. New State for Search and Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // 2. The Filter Logic
  const filteredJobs = dummyJobs.filter((job) => {
    // Check if the search term matches the title or company name (ignoring uppercase/lowercase)
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Check if the job matches the selected dropdown type
    const matchesType = filterType === 'All' || job.type === filterType;

    // A job only shows up if it matches BOTH conditions
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm py-4 px-8 flex justify-between items-center mb-8">
        <h1 className="text-2xl font-extrabold text-blue-600">RecruitHub</h1>
        <div>
          {isLoggedIn ? (
            <button onClick={() => setIsLoggedIn(false)} className="text-red-500 hover:text-red-700 font-semibold">
              Log Out
            </button>
          ) : (
            <button onClick={() => setIsLoggedIn(true)} className="bg-gray-900 text-white px-5 py-2 rounded hover:bg-gray-800 font-semibold">
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

        {/* 3. Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search by job title or company..." 
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select 
            className="border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {/* 4. Display the FILTERED jobs instead of all dummy jobs */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl font-semibold">No jobs found matching your criteria.</p>
            <button 
              onClick={() => { setSearchTerm(''); setFilterType('All'); }}
              className="mt-4 text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </main>
    </div>
  );
};

export default JobBoard;