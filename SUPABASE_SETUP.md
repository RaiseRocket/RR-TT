# 🚀 Supabase Backend Setup Guide for RaiseRocket

This guide will walk you through setting up the Supabase backend for your RaiseRocket salary negotiation platform.

## 📋 Prerequisites

- Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed
- Git repository set up

## 🏗️ Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**
   - Visit [app.supabase.com](https://app.supabase.com)
   - Click "New Project"

2. **Project Configuration**
   - **Name**: `RaiseRocket`
   - **Organization**: Select your organization
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Start with Free tier

3. **Wait for Setup**
   - Project creation takes 2-3 minutes
   - You'll see a progress indicator

## 🗄️ Step 2: Set Up Database Schema

1. **Open SQL Editor**
   - In your Supabase dashboard, go to "SQL Editor"
   - Click "New Query"

2. **Run Schema Script**
   - Copy the entire contents of `supabase-schema.sql`
   - Paste into the SQL Editor
   - Click "Run" to execute

3. **Verify Tables Created**
   - Go to "Table Editor"
   - You should see these tables:
     - `profiles`
     - `assessments`
     - `user_profiles`
     - `negotiation_goals`
     - `coaching_sessions`
     - `strategies`
     - `market_data`
     - `user_analytics`

## 🔐 Step 3: Configure Authentication

1. **Go to Authentication Settings**
   - Navigate to "Authentication" → "Settings"

2. **Configure Site URL**
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/auth/callback`

3. **Email Settings (Optional)**
   - Configure SMTP for production
   - For development, use Supabase's built-in email

## 📁 Step 4: Set Up Storage

1. **Verify Storage Buckets**
   - Go to "Storage"
   - You should see two buckets:
     - `user-documents` (private)
     - `assessment-files` (public)

2. **Test File Upload (Optional)**
   - Try uploading a test file to verify permissions

## 🔑 Step 5: Get API Keys

1. **Go to Project Settings**
   - Click the gear icon in the sidebar
   - Select "API"

2. **Copy Keys**
   - **Project URL**: Copy this value
   - **anon public key**: Copy this value
   - **service_role key**: Copy this value (keep secret!)

## ⚙️ Step 6: Configure Environment Variables

1. **Create Environment File**
   ```bash
   cp env.template .env.local
   ```

2. **Update .env.local**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. **Restart Development Server**
   ```bash
   npm run dev
   ```

## 🧪 Step 7: Test the Integration

1. **Test Authentication**
   - Go to `/auth/signup`
   - Try creating an account
   - Check Supabase dashboard for new user

2. **Test Assessment**
   - Go to `/assessment`
   - Submit a test assessment
   - Check `assessments` table

3. **Test File Upload**
   - Try uploading a resume
   - Check storage bucket

## 🔒 Step 8: Security Configuration

1. **Review RLS Policies**
   - All tables have Row Level Security enabled
   - Users can only access their own data

2. **API Rate Limiting**
   - Supabase has built-in rate limiting
   - Monitor usage in dashboard

3. **CORS Settings**
   - Configure allowed origins in project settings

## 📊 Step 9: Monitoring & Analytics

1. **Enable Logs**
   - Go to "Logs" in dashboard
   - Monitor API calls and errors

2. **Set Up Alerts**
   - Configure alerts for high error rates
   - Monitor database performance

## 🚀 Step 10: Production Deployment

1. **Update Environment Variables**
   - Change Site URL to your production domain
   - Update redirect URLs

2. **Database Backups**
   - Enable automatic backups
   - Set up point-in-time recovery

3. **Performance Optimization**
   - Monitor query performance
   - Add indexes as needed

## 🛠️ Troubleshooting

### Common Issues

1. **"Invalid API key" Error**
   - Check environment variables are correct
   - Ensure keys are copied completely

2. **RLS Policy Errors**
   - Verify user is authenticated
   - Check policy conditions

3. **File Upload Issues**
   - Check storage bucket permissions
   - Verify file size limits

4. **Database Connection Issues**
   - Check project URL
   - Verify network connectivity

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## 📈 Next Steps

1. **Implement AI Integration**
   - Connect to OpenAI/Claude for assessment analysis
   - Generate personalized strategies

2. **Add Real-time Features**
   - Use Supabase Realtime for live updates
   - Implement chat functionality

3. **Analytics Dashboard**
   - Track user engagement
   - Monitor conversion rates

4. **Payment Integration**
   - Add Stripe for premium subscriptions
   - Implement usage-based billing

## 🔄 Maintenance

1. **Regular Backups**
   - Monitor backup status
   - Test restore procedures

2. **Performance Monitoring**
   - Check query performance
   - Optimize slow queries

3. **Security Updates**
   - Keep dependencies updated
   - Review access logs

---

## 📞 Support

If you encounter any issues during setup, please:

1. Check the troubleshooting section above
2. Review Supabase documentation
3. Create an issue in the GitHub repository

Happy coding! 🚀
