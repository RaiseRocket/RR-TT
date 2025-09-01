-- RaiseRocket Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'enterprise')),
  marketing_consent BOOLEAN DEFAULT FALSE
);

-- 2. ASSESSMENTS TABLE (public, no auth required)
CREATE TABLE public.assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_title TEXT NOT NULL,
  company TEXT NOT NULL,
  offer_amount NUMERIC NOT NULL,
  benefits TEXT,
  additional_context TEXT,
  files JSONB,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  -- AI-generated analysis (placeholder for future)
  market_analysis JSONB,
  red_flags JSONB,
  opportunities JSONB,
  confidence_score INTEGER
);

-- 3. USER PROFILES TABLE
CREATE TABLE public.user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_description TEXT,
  company TEXT,
  linkedin_url TEXT,
  additional_info TEXT,
  resume_url TEXT,
  cover_letter_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 4. NEGOTIATION GOALS TABLE
CREATE TABLE public.negotiation_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reservation_price NUMERIC NOT NULL,
  target_price NUMERIC NOT NULL,
  batna TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 5. COACHING SESSIONS TABLE
CREATE TABLE public.coaching_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  communication_type TEXT NOT NULL,
  latest_communication TEXT NOT NULL,
  company_response TEXT,
  additional_context TEXT,
  files JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'analyzing', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. STRATEGIES TABLE
CREATE TABLE public.strategies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.coaching_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  strategy_type TEXT NOT NULL,
  content TEXT NOT NULL,
  confidence_score INTEGER,
  expected_outcome JSONB,
  tactics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. MARKET DATA TABLE (for AI analysis)
CREATE TABLE public.market_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_title TEXT NOT NULL,
  company_size TEXT,
  location TEXT,
  experience_level TEXT,
  salary_min NUMERIC NOT NULL,
  salary_max NUMERIC NOT NULL,
  salary_median NUMERIC NOT NULL,
  sample_size INTEGER,
  data_source TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. USER ANALYTICS TABLE
CREATE TABLE public.user_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all user tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.negotiation_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- User profiles policies
CREATE POLICY "Users can manage own profile data" ON public.user_profiles
  FOR ALL USING (auth.uid() = user_id);

-- Negotiation goals policies
CREATE POLICY "Users can manage own goals" ON public.negotiation_goals
  FOR ALL USING (auth.uid() = user_id);

-- Coaching sessions policies
CREATE POLICY "Users can manage own sessions" ON public.coaching_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Strategies policies
CREATE POLICY "Users can view own strategies" ON public.strategies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own strategies" ON public.strategies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User analytics policies
CREATE POLICY "Users can view own analytics" ON public.user_analytics
  FOR SELECT USING (auth.uid() = user_id);

-- FUNCTIONS AND TRIGGERS

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_negotiation_goals_updated_at
  BEFORE UPDATE ON public.negotiation_goals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_coaching_sessions_updated_at
  BEFORE UPDATE ON public.coaching_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- STORAGE BUCKETS

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('user-documents', 'user-documents', false),
  ('assessment-files', 'assessment-files', true);

-- Storage policies
CREATE POLICY "Users can upload own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'user-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'user-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'user-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'user-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Public assessment files" ON storage.objects
  FOR SELECT USING (bucket_id = 'assessment-files');

CREATE POLICY "Anyone can upload assessment files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'assessment-files');

-- INDEXES FOR PERFORMANCE

-- Indexes for common queries
CREATE INDEX idx_assessments_submitted_at ON public.assessments(submitted_at);
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX idx_negotiation_goals_user_id ON public.negotiation_goals(user_id);
CREATE INDEX idx_coaching_sessions_user_id ON public.coaching_sessions(user_id);
CREATE INDEX idx_coaching_sessions_status ON public.coaching_sessions(status);
CREATE INDEX idx_strategies_session_id ON public.strategies(session_id);
CREATE INDEX idx_strategies_user_id ON public.strategies(user_id);
CREATE INDEX idx_user_analytics_user_id ON public.user_analytics(user_id);
CREATE INDEX idx_user_analytics_event_type ON public.user_analytics(event_type);

-- SAMPLE MARKET DATA (for testing)
INSERT INTO public.market_data (job_title, company_size, location, experience_level, salary_min, salary_max, salary_median, sample_size, data_source) VALUES
('Software Engineer', 'enterprise', 'San Francisco', 'senior', 120000, 200000, 160000, 1500, 'Glassdoor'),
('Software Engineer', 'mid', 'San Francisco', 'senior', 100000, 180000, 140000, 800, 'LinkedIn'),
('Software Engineer', 'startup', 'San Francisco', 'senior', 90000, 160000, 125000, 300, 'AngelList'),
('Product Manager', 'enterprise', 'San Francisco', 'senior', 130000, 220000, 175000, 1200, 'Glassdoor'),
('Product Manager', 'mid', 'San Francisco', 'senior', 110000, 200000, 155000, 600, 'LinkedIn'),
('Data Scientist', 'enterprise', 'San Francisco', 'senior', 125000, 210000, 167500, 900, 'Glassdoor'),
('Data Scientist', 'mid', 'San Francisco', 'senior', 105000, 190000, 147500, 450, 'LinkedIn');

-- GRANT PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
