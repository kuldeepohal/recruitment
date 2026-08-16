import JobBoard from './pages/JobBoard';

// Inside your Router setup:
<Route path="/jobs" element={<JobBoard />} />
// or make it your home page:
<Route path="/" element={<JobBoard />} />