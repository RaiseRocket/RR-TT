import { supabase } from '@/lib/supabase'

export interface AssessmentData {
  job_title: string
  company: string
  offer_amount: number
  benefits?: string
  additional_context?: string
  files?: any
}

export interface AssessmentResult {
  id: string
  job_title: string
  company: string
  offer_amount: number
  benefits: string | null
  additional_context: string | null
  files: any | null
  submitted_at: string
  market_analysis: any | null
  red_flags: any | null
  opportunities: any | null
  confidence_score: number | null
}

export const assessmentService = {
  // Submit free assessment (no auth required)
  submitAssessment: async (data: AssessmentData): Promise<AssessmentResult> => {
    const { data: assessment, error } = await supabase
      .from('assessments')
      .insert([
        {
          ...data,
          ip_address: await getClientIP(),
          user_agent: navigator.userAgent
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error submitting assessment:', error)
      throw new Error('Failed to submit assessment')
    }

    return assessment
  },

  // Get assessment by ID
  getAssessment: async (id: string): Promise<AssessmentResult | null> => {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching assessment:', error)
      return null
    }

    return data
  },

  // Update assessment with AI analysis (for future implementation)
  updateAssessmentAnalysis: async (
    id: string, 
    analysis: {
      market_analysis?: any
      red_flags?: any
      opportunities?: any
      confidence_score?: number
    }
  ) => {
    const { data, error } = await supabase
      .from('assessments')
      .update(analysis)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating assessment analysis:', error)
      throw new Error('Failed to update assessment analysis')
    }

    return data
  }
}

// Helper function to get client IP (simplified)
const getClientIP = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.error('Error getting client IP:', error)
    return null
  }
}
