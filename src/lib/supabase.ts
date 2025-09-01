import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
          onboarding_completed: boolean
          subscription_tier: 'free' | 'premium' | 'enterprise'
          marketing_consent: boolean
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
          onboarding_completed?: boolean
          subscription_tier?: 'free' | 'premium' | 'enterprise'
          marketing_consent?: boolean
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
          onboarding_completed?: boolean
          subscription_tier?: 'free' | 'premium' | 'enterprise'
          marketing_consent?: boolean
        }
      }
      assessments: {
        Row: {
          id: string
          job_title: string
          company: string
          offer_amount: number
          benefits: string | null
          additional_context: string | null
          files: any | null
          submitted_at: string
          ip_address: string | null
          user_agent: string | null
          market_analysis: any | null
          red_flags: any | null
          opportunities: any | null
          confidence_score: number | null
        }
        Insert: {
          id?: string
          job_title: string
          company: string
          offer_amount: number
          benefits?: string | null
          additional_context?: string | null
          files?: any | null
          submitted_at?: string
          ip_address?: string | null
          user_agent?: string | null
          market_analysis?: any | null
          red_flags?: any | null
          opportunities?: any | null
          confidence_score?: number | null
        }
        Update: {
          id?: string
          job_title?: string
          company?: string
          offer_amount?: number
          benefits?: string | null
          additional_context?: string | null
          files?: any | null
          submitted_at?: string
          ip_address?: string | null
          user_agent?: string | null
          market_analysis?: any | null
          red_flags?: any | null
          opportunities?: any | null
          confidence_score?: number | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          job_description: string | null
          company: string | null
          linkedin_url: string | null
          additional_info: string | null
          resume_url: string | null
          cover_letter_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_description?: string | null
          company?: string | null
          linkedin_url?: string | null
          additional_info?: string | null
          resume_url?: string | null
          cover_letter_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_description?: string | null
          company?: string | null
          linkedin_url?: string | null
          additional_info?: string | null
          resume_url?: string | null
          cover_letter_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      negotiation_goals: {
        Row: {
          id: string
          user_id: string
          reservation_price: number
          target_price: number
          batna: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          reservation_price: number
          target_price: number
          batna: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          reservation_price?: number
          target_price?: number
          batna?: string
          created_at?: string
          updated_at?: string
        }
      }
      coaching_sessions: {
        Row: {
          id: string
          user_id: string
          communication_type: string
          latest_communication: string
          company_response: string | null
          additional_context: string | null
          files: any | null
          status: 'pending' | 'analyzing' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          communication_type: string
          latest_communication: string
          company_response?: string | null
          additional_context?: string | null
          files?: any | null
          status?: 'pending' | 'analyzing' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          communication_type?: string
          latest_communication?: string
          company_response?: string | null
          additional_context?: string | null
          files?: any | null
          status?: 'pending' | 'analyzing' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
      strategies: {
        Row: {
          id: string
          session_id: string
          user_id: string
          strategy_type: string
          content: string
          confidence_score: number | null
          expected_outcome: any | null
          tactics: any | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_id: string
          strategy_type: string
          content: string
          confidence_score?: number | null
          expected_outcome?: any | null
          tactics?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string
          strategy_type?: string
          content?: string
          confidence_score?: number | null
          expected_outcome?: any | null
          tactics?: any | null
          created_at?: string
        }
      }
    }
  }
}
