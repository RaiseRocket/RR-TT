'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ProfessionalLoader } from '@/components/ui/ProfessionalLoader';
import { VStack, Text, Box } from '@chakra-ui/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  redirectTo = '/auth/signup',
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push(redirectTo);
      } else if (!requireAuth && user) {
        // If user is already authenticated and this route doesn't require auth (like login/signup)
        router.push('/onboarding/profile');
      }
    }
  }, [user, loading, router, redirectTo, requireAuth]);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        bg="brand.neutral.50"
      >
        <VStack gap={4}>
          <ProfessionalLoader size="lg" />
          <Text color="brand.neutral.600" fontSize="sm">
            Loading...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (requireAuth && !user) {
    return null; // Will redirect
  }

  if (!requireAuth && user) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
