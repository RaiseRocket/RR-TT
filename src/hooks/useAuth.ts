'use client';

import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Create profile on signup
        if (event === 'SIGNED_UP' && session?.user) {
          await createUserProfile(session.user)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, session, loading }
}

// Create user profile after signup
const createUserProfile = async (user: User) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .insert([
        {
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name || null,
          marketing_consent: false
        }
      ])

    if (error) {
      console.error('Error creating user profile:', error)
    }
  } catch (error) {
    console.error('Error creating user profile:', error)
  }
}

// Auth service functions
export const authService = {
  signUp: async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    return { data, error }
  },

  updateProfile: async (updates: { full_name?: string; marketing_consent?: boolean }) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No user found')

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    return { data, error }
  }
}
