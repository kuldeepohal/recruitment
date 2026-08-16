-- Migration: 001_initial
-- Description: Core tables for Users, Profiles, and Recruitments

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user', -- 'user', 'premium_user', 'editor', 'moderator', 'admin'
    status TEXT DEFAULT 'active', -- 'active', 'suspended', 'deactivated'
    email_verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);

CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    gender TEXT,
    category TEXT, -- 'General', 'OBC', 'SC', 'ST', 'EWS', etc.
    highest_qualification TEXT,
    state TEXT,
    district TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recruitments (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_title TEXT,
    organisation TEXT NOT NULL,
    department TEXT,
    recruitment_category TEXT, -- 'State', 'Central', 'Banking', 'Defence', 'PSU', etc.
    advertisement_number TEXT,
    description TEXT,
    number_of_posts INTEGER,
    vacancy_details TEXT,
    state TEXT,
    district TEXT,
    location TEXT,
    job_type TEXT,
    employment_type TEXT,
    
    -- Qualifications & Eligibility
    minimum_qualification TEXT,
    preferred_qualification TEXT,
    subject_requirements TEXT,
    experience_required TEXT,
    certifications_required TEXT,
    special_requirements TEXT,
    
    -- Age Criteria
    minimum_age INTEGER,
    maximum_age INTEGER,
    age_as_on_date DATE,
    age_relaxation TEXT,
    category_specific_age_rules TEXT,
    
    -- Salary
    pay_level TEXT,
    salary_min INTEGER,
    salary_max INTEGER,
    salary_description TEXT,
    allowances TEXT,
    
    -- Application Details
    application_start_date DATETIME,
    application_last_date DATETIME,
    application_mode TEXT, -- 'Online', 'Offline'
    application_fee TEXT,
    fee_details TEXT,
    payment_method TEXT,
    
    -- Selection Process
    selection_process TEXT,
    written_exam INTEGER DEFAULT 0,
    skill_test INTEGER DEFAULT 0,
    interview INTEGER DEFAULT 0,
    physical_test INTEGER DEFAULT 0,
    document_verification INTEGER DEFAULT 1,
    
    -- Source of Truth (Rules 11 & 49)
    official_organisation TEXT,
    official_notification_url TEXT,
    official_application_url TEXT,
    official_source_url TEXT,
    source_title TEXT,
    source_published_date DATETIME,
    source_last_checked DATETIME,
    last_verified_at DATETIME,
    
    -- Status & Lifecycle (Rule 16)
    status TEXT DEFAULT 'draft', -- 'draft', 'pending_verification', 'published', 'updated', 'closing_soon', 'closed', 'expired', 'cancelled'
    
    -- SEO Metadata (Rule 31)
    meta_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    keywords TEXT,
    
    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published_at DATETIME,
    expires_at DATETIME
);