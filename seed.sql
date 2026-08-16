-- Insert a test Admin User
INSERT INTO users (id, email, password_hash, role, status, email_verified)
VALUES ('usr_1', 'admin@recruitment.local', 'hashed_placeholder', 'admin', 'active', 1);

-- Insert a test Profile
INSERT INTO profiles (id, user_id, first_name, last_name, state, district)
VALUES ('prof_1', 'usr_1', 'Admin', 'User', 'Maharashtra', 'Pune');

-- Insert Sample Recruitment 1: MPSC
INSERT INTO recruitments (
    id, slug, title, short_title, organisation, recruitment_category, 
    number_of_posts, state, minimum_qualification, minimum_age, maximum_age, 
    application_last_date, status
) VALUES (
    'rec_1', 'mpsc-group-b-2026', 'MPSC Subordinate Services Non-Gazetted Group B', 'MPSC Group B', 
    'Maharashtra Public Service Commission', 'State', 
    480, 'Maharashtra', 'Graduate', 18, 38, 
    datetime('now', '+15 days'), 'published'
);

-- Insert Sample Recruitment 2: Railway
INSERT INTO recruitments (
    id, slug, title, short_title, organisation, recruitment_category, 
    number_of_posts, state, minimum_qualification, minimum_age, maximum_age, 
    application_last_date, status
) VALUES (
    'rec_2', 'rrb-technician-2026', 'Railway Recruitment Board Technician Grade III', 'RRB Technician', 
    'Indian Railways', 'Central', 
    9000, 'All India', '12th Pass / ITI', 18, 33, 
    datetime('now', '+3 days'), 'published'
);