import { supabase } from '@/lib/supabase'

export interface UserProfileData {
  job_description?: string
  company?: string
  linkedin_url?: string
  additional_info?: string
  resume_url?: string
  cover_letter_url?: string
}

export interface NegotiationGoalsData {
  reservation_price: number
  target_price: number
  batna: string
}

export interface UserProfile {
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

export interface NegotiationGoals {
  id: string
  user_id: string
  reservation_price: number
  target_price: number
  batna: string
  created_at: string
  updated_at: string
}

export const onboardingService = {
  // Save user profile data
  saveUserProfile: async (userId: string, profileData: UserProfileData): Promise<UserProfile> => {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([
        {
          user_id: userId,
          ...profileData,
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error saving user profile:', error)
      throw new Error('Failed to save user profile')
    }

    return data
  },

  // Get user profile
  getUserProfile: async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return data
  },

  // Save negotiation goals
  saveNegotiationGoals: async (userId: string, goals: NegotiationGoalsData): Promise<NegotiationGoals> => {
    const { data, error } = await supabase
      .from('negotiation_goals')
      .upsert([
        {
          user_id: userId,
          ...goals,
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error saving negotiation goals:', error)
      throw new Error('Failed to save negotiation goals')
    }

    return data
  },

  // Get negotiation goals
  getNegotiationGoals: async (userId: string): Promise<NegotiationGoals | null> => {
    const { data, error } = await supabase
      .from('negotiation_goals')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching negotiation goals:', error)
      return null
    }

    return data
  },

  // Mark onboarding as completed
  completeOnboarding: async (userId: string): Promise<void> => {
    const { error } = await supabase
      .from('profiles')
      .update({
        onboarding_completed: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) {
      console.error('Error completing onboarding:', error)
      throw new Error('Failed to complete onboarding')
    }
  },

  // Check if user has completed onboarding
  isOnboardingComplete: async (userId: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error checking onboarding status:', error)
      return false
    }

    return data?.onboarding_completed || false
  }
}
