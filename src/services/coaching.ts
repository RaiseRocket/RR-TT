import { supabase } from '@/lib/supabase'

export interface CoachingSessionData {
  communication_type: string
  latest_communication: string
  company_response?: string
  additional_context?: string
  files?: any
}

export interface StrategyData {
  strategy_type: string
  content: string
  confidence_score?: number
  expected_outcome?: any
  tactics?: any
}

export interface CoachingSession {
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

export interface Strategy {
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

export const coachingService = {
  // Create new coaching session
  createSession: async (userId: string, sessionData: CoachingSessionData): Promise<CoachingSession> => {
    const { data, error } = await supabase
      .from('coaching_sessions')
      .insert([
        {
          user_id: userId,
          ...sessionData,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating coaching session:', error)
      throw new Error('Failed to create coaching session')
    }

    return data
  },

  // Get coaching session by ID
  getSession: async (sessionId: string): Promise<CoachingSession | null> => {
    const { data, error } = await supabase
      .from('coaching_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (error) {
      console.error('Error fetching coaching session:', error)
      return null
    }

    return data
  },

  // Get user's coaching sessions
  getUserSessions: async (userId: string): Promise<CoachingSession[]> => {
    const { data, error } = await supabase
      .from('coaching_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user sessions:', error)
      return []
    }

    return data || []
  },

  // Update session status
  updateSessionStatus: async (sessionId: string, status: 'pending' | 'analyzing' | 'completed'): Promise<void> => {
    const { error } = await supabase
      .from('coaching_sessions')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId)

    if (error) {
      console.error('Error updating session status:', error)
      throw new Error('Failed to update session status')
    }
  },

  // Create strategy for session
  createStrategy: async (sessionId: string, userId: string, strategyData: StrategyData): Promise<Strategy> => {
    const { data, error } = await supabase
      .from('strategies')
      .insert([
        {
          session_id: sessionId,
          user_id: userId,
          ...strategyData
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating strategy:', error)
      throw new Error('Failed to create strategy')
    }

    return data
  },

  // Get strategies for session
  getSessionStrategies: async (sessionId: string): Promise<Strategy[]> => {
    const { data, error } = await supabase
      .from('strategies')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching session strategies:', error)
      return []
    }

    return data || []
  },

  // Get user's strategies
  getUserStrategies: async (userId: string): Promise<Strategy[]> => {
    const { data, error } = await supabase
      .from('strategies')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user strategies:', error)
      return []
    }

    return data || []
  }
}
