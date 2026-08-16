import React from 'react';

const JobCard = ({ job, onApply }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
      
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
            <p className="text-gray-600 font-medium">{job.company}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {job.type}
          </span>
        </div>
        
        <div className="mt-4 flex gap-4 text-sm text-gray-500">
          <span>📍 {job.location}</span>
          <span>💰 {job.salary}</span>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="mt-6">
        <button 
          onClick={() => onApply(job)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Apply Now
        </button>
      </div>
      
    </div>
  );
};

export default JobCard;