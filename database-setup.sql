-- Supabase Database Setup for NAYAZ FAIYAZ AHMED Homepage
-- Run this in your Supabase SQL Editor

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  bio TEXT,
  profile_image_url TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  project_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create awards table
CREATE TABLE IF NOT EXISTS awards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  phone TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  behance_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for public read access
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Public projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public awards are viewable by everyone" ON awards
  FOR SELECT USING (true);

CREATE POLICY "Public contact info is viewable by everyone" ON contact_info
  FOR SELECT USING (true);

-- 7. Insert profile data
INSERT INTO profiles (full_name, title, company, bio, profile_image_url, email, phone) VALUES
  ('NAYAZ FAIYAZ AHMED', 'FOUNDER & CHAIRMAN', 'WINSTONE GROUP', 'As Founder & Chairman of Winstone Group, I lead strategic initiatives that drive innovation and growth across multiple industries. My vision centers on transforming traditional business models through creative leadership and forward-thinking approaches. With extensive experience in corporate strategy and brand development, I focus on building sustainable organizations that make meaningful impact in their respective markets. My leadership philosophy emphasizes collaboration, innovation, and the power of strategic thinking to unlock untapped potential in both people and organizations.', 'https://buyaobcbfdfuhqlonous.supabase.co/storage/v1/object/sign/site%20images/WhatsApp%20Image%202025-09-24%20at%2014.23.58_3f43084f.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjdiYmRhYy01OWJmLTQ0ZDEtYTk5ZC0yMzJjYzg2ZjA2ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaXRlIGltYWdlcy9XaGF0c0FwcCBJbWFnZSAyMDI1LTA5LTI0IGF0IDE0LjIzLjU4XzNmNDMwODRmLmpwZyIsImlhdCI6MTc1ODcwNTM5MSwiZXhwIjoxNzkwMjQxMzkxfQ.L9MRyXpGeXz-RvPGK_1iCwFcHqkViRMXks06oF6zJ4c', 'hello@nayazfaizahmed.com', '+1 (555) 123-4567');

-- 8. Insert projects data
INSERT INTO projects (title, description, image_url) VALUES
  ('Winstone Projects LLP', 'Leading real estate development and strategic project management', 'https://buyaobcbfdfuhqlonous.supabase.co/storage/v1/object/sign/site%20images/WhatsApp%20Image%202025-09-24%20at%2014.54.10_b75dda90.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjdiYmRhYy01OWJmLTQ0ZDEtYTk5ZC0yMzJjYzg2ZjA2ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaXRlIGltYWdlcy9XaGF0c0FwcCBJbWFnZSAyMDI1LTA5LTI0IGF0IDE0LjU0LjEwX2I3NWRkYTkwLmpwZyIsImlhdCI6MTc1ODcwNTkwMSwiZXhwIjoxNzkwMjQxOTAxfQ.GUe6SmZmGz6ZP7z2X-fSV5War3RRykXHEs91VZFkL9M'),
  ('Winstone Motors', 'Smart Car Buying & Selling Platform', 'https://buyaobcbfdfuhqlonous.supabase.co/storage/v1/object/sign/site%20images/Screenshot%202025-09-24%20150253.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjdiYmRhYy01OWJmLTQ0ZDEtYTk5ZC0yMzJjYzg2ZjA2ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaXRlIGltYWdlcy9TY3JlZW5zaG90IDIwMjUtMDktMjQgMTUwMjUzLnBuZyIsImlhdCI6MTc1ODcwNjQ3MCwiZXhwIjoxNzkwMjQyNDcwfQ.PArNoC5ELoLIqK3O3_CAw7AIrgH949mDJyzkDZR7fnQ'),
  ('Daxido', 'A ride hailing platform', 'https://buyaobcbfdfuhqlonous.supabase.co/storage/v1/object/sign/site%20images/WhatsApp%20Image%202025-09-24%20at%2015.08.31_0ac3f510.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjdiYmRhYy01OWJmLTQ0ZDEtYTk5ZC0yMzJjYzg2ZjA2ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaXRlIGltYWdlcy9XaGF0c0FwcCBJbWFnZSAyMDI1LTA5LTI0IGF0IDE1LjA4LjMxXzBhYzNmNTEwLmpwZyIsImlhdCI6MTc1ODcwNjgzMCwiZXhwIjoxNzkwMjQyODMwfQ.IiyDXWRWANBsuBkqFkIjcGuCbBP0t07qUaPR3-Shw6Y'),
  ('Chai Habibi', 'Redefining India\'s Chai Culture', 'https://buyaobcbfdfuhqlonous.supabase.co/storage/v1/object/sign/site%20images/WhatsApp%20Image%202025-09-24%20at%2015.06.10_04c068e4.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjdiYmRhYy01OWJmLTQ0ZDEtYTk5ZC0yMzJjYzg2ZjA2ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaXRlIGltYWdlcy9XaGF0c0FwcCBJbWFnZSAyMDI1LTA5LTI0IGF0IDE1LjA2LjEwXzA0YzA2OGU0LmpwZyIsImlhdCI6MTc1ODcwNjYyNiwiZXhwIjoxNzkwMjQyNjI2fQ.PdGKvZLPxt1V_rSdnXRnPfY-2E5YExOB-vGfpYv-YTQ');

-- 9. Insert awards data
INSERT INTO awards (title, year, organization) VALUES
  ('Design Excellence Award', 2024, 'Design Institute'),
  ('Innovation in Branding', 2023, 'Brand Association'),
  ('Creative Impact Award', 2023, 'Creative Council');

-- 10. Insert contact info data
INSERT INTO contact_info (email, phone, linkedin_url, instagram_url, behance_url) VALUES
  ('hello@nayazfaizahmed.com', '+1 (555) 123-4567', 'https://linkedin.com/in/nayazfaizahmed', 'https://instagram.com/nayazfaizahmed', 'https://behance.net/nayazfaizahmed');

-- 11. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 12. Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
