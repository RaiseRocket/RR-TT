# Supabase Authentication Setup for RaiseRocket

This guide will help you set up Supabase authentication for your RaiseRocket application.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `raise-rocket` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose the closest region to your users
5. Click "Create new project"

## 2. Set Up Database Schema

1. In your Supabase dashboard, go to the **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Click "Run" to execute the SQL

This will create:
- `profiles` table for user information
- `assessments` table for storing user assessments
- Row Level Security (RLS) policies
- Triggers for automatic profile creation and timestamp updates

## 3. Configure Authentication

1. In your Supabase dashboard, go to **Authentication > Settings**
2. Configure the following:

### Site URL
- Add your development URL: `http://localhost:3000`
- Add your production URL when ready

### Redirect URLs
- Add: `http://localhost:3000/auth/callback`
- Add your production callback URL when ready

### Email Templates (Optional)
- Customize the email templates for signup confirmation and password reset

## 4. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings > API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## 5. Configure Environment Variables

1. Copy `env.template` to `.env.local`:
   ```bash
   cp env.template .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 6. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/auth/signup`
3. Try creating a new account
4. Check your Supabase dashboard to see if the user was created in the `profiles` table

## 7. Authentication Flow

The authentication system works as follows:

1. **Signup**: Users create accounts with email/password
2. **Email Confirmation**: Supabase sends confirmation email (if enabled)
3. **Profile Creation**: Automatic profile creation via database trigger
4. **Assessment Storage**: User assessments are stored in the `assessments` table
5. **Protected Routes**: Middleware protects routes that require authentication

## 8. Key Features

- **Row Level Security**: Users can only access their own data
- **Automatic Profile Creation**: Profiles are created when users sign up
- **Assessment Storage**: User assessments are securely stored
- **Session Management**: Automatic session handling with Supabase
- **Protected Routes**: Middleware redirects unauthenticated users

## 9. Database Tables

### `profiles`
- `id`: UUID (references auth.users)
- `email`: User's email address
- `full_name`: User's full name
- `created_at`: Timestamp
- `updated_at`: Timestamp

### `assessments`
- `id`: UUID (primary key)
- `user_id`: UUID (references profiles.id)
- `assessment_data`: JSONB (stores assessment results)
- `created_at`: Timestamp
- `updated_at`: Timestamp

## 10. Troubleshooting

### Common Issues

1. **"Invalid API key"**: Check your environment variables
2. **"User not found"**: Ensure the profile creation trigger is working
3. **"Permission denied"**: Check RLS policies are correctly set up
4. **Redirect issues**: Verify your redirect URLs in Supabase settings

### Debug Steps

1. Check browser console for errors
2. Verify environment variables are loaded
3. Check Supabase dashboard for user creation
4. Review RLS policies in the database

## 11. Production Deployment

When deploying to production:

1. Update your Supabase project settings with production URLs
2. Set up proper environment variables in your hosting platform
3. Consider enabling additional security features like:
   - Rate limiting
   - Email confirmation requirements
   - Strong password policies

## 12. Security Considerations

- All user data is protected by Row Level Security
- Passwords are hashed by Supabase Auth
- API keys should be kept secure
- Consider implementing additional security measures for production

For more information, refer to the [Supabase documentation](https://supabase.com/docs).
