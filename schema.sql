-- Migration: 001_initial_schema
-- Description: Core tables for Users, Profiles, and Recruitments

-- 1. USERS TABLE
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    status TEXT DEFAULT 'active',
    email_verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);

-- 2. USER PROFILES TABLE
CREATE TABLE profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    gender TEXT,
    category TEXT,
    highest_qualification TEXT,
    state TEXT,
    district TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. CORE RECRUITMENT TABLE
CREATE TABLE recruitments (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_title TEXT,
    organisation TEXT NOT NULL,
    department TEXT,
    recruitment_category TEXT,
    advertisement_number TEXT,
    number_of_posts INTEGER,
    
    minimum_qualification TEXT,
    minimum_age INTEGER,
    maximum_age INTEGER,
    
    application_start_date DATETIME,
    application_last_date DATETIME,
    
    official_organisation_url TEXT,
    official_notification_url TEXT,
    official_application_url TEXT,
    last_verified_at DATETIME,
    
    status TEXT DEFAULT 'draft',
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);