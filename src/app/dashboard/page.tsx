'use client';

import {
  VStack,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  HStack,
  SimpleGrid,
  Icon,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Container,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target,
  FileText,
  Users,
  CheckCircle,
  Clock,
  DollarSign,
  Award
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [userAssessments, setUserAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Load user's assessments
      loadUserAssessments();
    }
  }, [user]);

  const loadUserAssessments = async () => {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading assessments:', error);
      } else {
        setUserAssessments(data || []);
      }
    } catch (error) {
      console.error('Error loading assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewAssessment = () => {
    router.push('/assessment');
  };

  const handleViewAssessment = (assessmentId: string) => {
    router.push(`/assessment/results?id=${assessmentId}`);
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }} py={12}>
          {/* Welcome Header */}
          <VStack gap={8} mb={12}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <VStack gap={4} textAlign="center">
                <Heading
                  as="h1"
                  size="xl"
                  fontFamily="heading"
                  color="brand.neutral.700"
                  fontWeight="700"
                >
                  Welcome back, {user?.user_metadata?.full_name || 'Professional'}!
                </Heading>
                <Text
                  fontSize="md"
                  color="brand.neutral.600"
                  lineHeight="tall"
                >
                  Ready to continue your salary negotiation journey?
                </Text>
              </VStack>
            </motion.div>
          </VStack>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={12}>
              <Card
                bg="white"
                border="1px solid"
                borderColor="brand.neutral.200"
                borderRadius="12px"
                boxShadow="md"
              >
                <CardBody p={6}>
                  <Stat>
                    <StatLabel color="brand.neutral.600" fontSize="sm" fontWeight="500">
                      Assessments Completed
                    </StatLabel>
                    <StatNumber color="brand.primary" fontSize="2xl" fontWeight="700">
                      {userAssessments.length}
                    </StatNumber>
                    <StatHelpText color="brand.neutral.500" fontSize="xs">
                      Total analyses performed
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card
                bg="white"
                border="1px solid"
                borderColor="brand.neutral.200"
                borderRadius="12px"
                boxShadow="md"
              >
                <CardBody p={6}>
                  <Stat>
                    <StatLabel color="brand.neutral.600" fontSize="sm" fontWeight="500">
                      Success Rate
                    </StatLabel>
                    <StatNumber color="brand.secondary" fontSize="2xl" fontWeight="700">
                      94%
                    </StatNumber>
                    <StatHelpText color="brand.neutral.500" fontSize="xs">
                      Average increase achieved
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card
                bg="white"
                border="1px solid"
                borderColor="brand.neutral.200"
                borderRadius="12px"
                boxShadow="md"
              >
                <CardBody p={6}>
                  <Stat>
                    <StatLabel color="brand.neutral.600" fontSize="sm" fontWeight="500">
                      Average Increase
                    </StatLabel>
                    <StatNumber color="brand.secondary" fontSize="2xl" fontWeight="700">
                      $50K+
                    </StatNumber>
                    <StatHelpText color="brand.neutral.500" fontSize="xs">
                      Salary boost achieved
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>
          </motion.div>

          {/* Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
              {/* New Assessment Card */}
              <Card
                bg="brand.primary"
                color="white"
                borderRadius="12px"
                boxShadow="xl"
                height="fit-content"
              >
                <CardBody p={8}>
                  <VStack gap={6} align="stretch">
                    <VStack gap={3} textAlign="center">
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="white"
                        color="brand.primary"
                      >
                        <Target size={24} />
                      </Box>
                      <Heading
                        as="h2"
                        size="lg"
                        fontFamily="heading"
                        fontWeight="700"
                      >
                        Start New Assessment
                      </Heading>
                      <Text fontSize="md" opacity={0.9}>
                        Analyze a new job offer or get fresh negotiation insights
                      </Text>
                    </VStack>

                    <VStack gap={3} align="stretch">
                      {[
                        { icon: FileText, text: "Upload offer documents" },
                        { icon: TrendingUp, text: "Get AI-powered analysis" },
                        { icon: Award, text: "Receive expert strategy" }
                      ].map((feature, index) => (
                        <HStack key={index} align="center" gap={3}>
                          <Box
                            p={2}
                            borderRadius="full"
                            bg="white"
                            color="brand.primary"
                            flexShrink={0}
                          >
                            <Icon as={feature.icon} boxSize={4} />
                          </Box>
                          <Text fontSize="sm" fontWeight="500">
                            {feature.text}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>

                    <ProfessionalButton
                      variant="secondary"
                      size="lg"
                      bg="white"
                      color="brand.primary"
                      width="100%"
                      _hover={{
                        bg: 'brand.neutral.50',
                        transform: 'translateY(-2px)'
                      }}
                      onClick={handleStartNewAssessment}
                    >
                      Start Assessment
                    </ProfessionalButton>
                  </VStack>
                </CardBody>
              </Card>

              {/* Recent Assessments */}
              <Card
                bg="white"
                border="1px solid"
                borderColor="brand.neutral.200"
                borderRadius="12px"
                boxShadow="lg"
                height="fit-content"
              >
                <CardBody p={8}>
                  <VStack gap={6} align="stretch">
                    <VStack gap={3} textAlign="center">
                      <Box
                        p={3}
                        borderRadius="full"
                        bg="brand.neutral.100"
                        color="brand.primary"
                      >
                        <Clock size={24} />
                      </Box>
                      <Heading
                        as="h2"
                        size="lg"
                        fontFamily="heading"
                        color="brand.neutral.700"
                        fontWeight="700"
                      >
                        Recent Assessments
                      </Heading>
                      <Text fontSize="md" color="brand.neutral.600">
                        {userAssessments.length === 0 
                          ? "No assessments yet. Start your first one!"
                          : "Review your previous analyses and strategies"
                        }
                      </Text>
                    </VStack>

                    {userAssessments.length === 0 ? (
                      <VStack gap={4}>
                        <Text fontSize="sm" color="brand.neutral.500" textAlign="center">
                          You haven't completed any assessments yet. Start with a new offer analysis to get personalized negotiation strategies.
                        </Text>
                        <ProfessionalButton
                          variant="primary"
                          size="md"
                          width="100%"
                          onClick={handleStartNewAssessment}
                        >
                          Start Your First Assessment
                        </ProfessionalButton>
                      </VStack>
                    ) : (
                      <VStack gap={3} align="stretch">
                        {userAssessments.slice(0, 3).map((assessment, index) => (
                          <Box
                            key={assessment.id}
                            p={4}
                            bg="brand.neutral.50"
                            borderRadius="8px"
                            border="1px solid"
                            borderColor="brand.neutral.200"
                            cursor="pointer"
                            _hover={{
                              bg: 'brand.neutral.100',
                              borderColor: 'brand.primary.200'
                            }}
                            onClick={() => handleViewAssessment(assessment.id)}
                          >
                            <HStack justify="space-between" align="center">
                              <VStack align="start" gap={1}>
                                <Text fontSize="sm" fontWeight="600" color="brand.neutral.700">
                                  Assessment #{userAssessments.length - index}
                                </Text>
                                <Text fontSize="xs" color="brand.neutral.500">
                                  {new Date(assessment.created_at).toLocaleDateString()}
                                </Text>
                              </VStack>
                              <Badge
                                bg="brand.secondary"
                                color="white"
                                px={2}
                                py={1}
                                borderRadius="full"
                                fontSize="xs"
                                fontWeight="600"
                              >
                                Complete
                              </Badge>
                            </HStack>
                          </Box>
                        ))}
                        
                        {userAssessments.length > 3 && (
                          <Text fontSize="xs" color="brand.neutral.500" textAlign="center">
                            And {userAssessments.length - 3} more assessments...
                          </Text>
                        )}
                      </VStack>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </motion.div>
        </Container>
      </MainLayout>
    </ProtectedRoute>
  );
}
