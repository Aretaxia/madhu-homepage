# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

## 2. Database Schema

Create the following tables in your Supabase SQL editor:

```sql
-- Profiles table for user information
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  title TEXT,
  company TEXT,
  bio TEXT,
  profile_image_url TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  project_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Awards table
CREATE TABLE awards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact information table
CREATE TABLE contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  phone TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  behance_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 3. Row Level Security (RLS)

Enable RLS and create policies:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Public projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public awards are viewable by everyone" ON awards
  FOR SELECT USING (true);

CREATE POLICY "Public contact info is viewable by everyone" ON contact_info
  FOR SELECT USING (true);
```

## 4. Update supabase.js

Replace the placeholder values in `supabase.js` with your actual Supabase credentials:

```javascript
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseKey = 'your-anon-key-here'
```

## 5. Sample Data

Insert sample data:

```sql
-- Insert profile data
INSERT INTO profiles (id, full_name, title, company, bio, email, phone) VALUES
  ('00000000-0000-0000-0000-000000000000', 'NAYAZ FAIYAZ AHMED', 'FOUNDER & CHAIRMAN', 'WINSTONE GROUP', 'As Founder & Chairman of Winstone Group, I lead strategic initiatives that drive innovation and growth across multiple industries.', 'hello@nayazfaizahmed.com', '+1 (555) 123-4567');

-- Insert projects
INSERT INTO projects (title, description, image_url) VALUES
  ('Brand Identity', 'Complete brand transformation for innovative startups', 'https://via.placeholder.com/400x300'),
  ('Digital Experience', 'Creating memorable digital interactions', 'https://via.placeholder.com/400x300'),
  ('Visual Strategy', 'Strategic visual communication that resonates', 'https://via.placeholder.com/400x300');

-- Insert awards
INSERT INTO awards (title, year, organization) VALUES
  ('Design Excellence Award', 2024, 'Design Institute'),
  ('Innovation in Branding', 2023, 'Brand Association'),
  ('Creative Impact Award', 2023, 'Creative Council');

-- Insert contact info
INSERT INTO contact_info (email, phone, linkedin_url, instagram_url, behance_url) VALUES
  ('hello@nayazfaizahmed.com', '+1 (555) 123-4567', 'https://linkedin.com/in/nayazfaizahmed', 'https://instagram.com/nayazfaizahmed', 'https://behance.net/nayazfaizahmed');
```
