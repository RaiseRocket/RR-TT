'use client';

import { 
  VStack, 
  Heading, 
  Text, 
  HStack, 
  Box,
  SimpleGrid,
  Badge,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Shield, 
  CheckCircle,
  DollarSign,
  Award,
  Users,
  Handshake
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const MotionHeading = motion(Heading);
  const MotionText = motion(Text);

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/assessment');
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <VStack gap={16} py={20} align="center" textAlign="center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <VStack gap={6} maxW="4xl">
            <MotionHeading
              as="h1"
              size="3xl"
              fontFamily="heading"
              color="brand.neutral.700"
              lineHeight="shorter"
              fontWeight="700"
            >
              Get Your Biggest Salary Increase,{' '}
              <Box as="span" color="brand.primary">
                Guaranteed
              </Box>
            </MotionHeading>
            
            <MotionText
              fontSize="xl"
              color="brand.neutral.600"
              maxW="3xl"
              lineHeight="tall"
              fontWeight="400"
            >
              Expert salary negotiation strategies that have helped professionals 
              increase their income by an average of $50,000. Get personalized 
              guidance from certified negotiation experts.
            </MotionText>
          </VStack>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <HStack gap={4} flexWrap="wrap" justify="center">
            <ProfessionalButton 
              variant="primary" 
              size="lg" 
              leftIcon={<TrendingUp />}
              onClick={handleGetStarted}
            >
              {user ? 'Go to Dashboard' : 'Get Free Assessment'}
            </ProfessionalButton>
            {!user && (
              <ProfessionalButton 
                variant="secondary" 
                size="lg" 
                onClick={() => router.push('/auth/signup')}
              >
                Create Account
              </ProfessionalButton>
            )}
          </HStack>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <HStack gap={8} flexWrap="wrap" justify="center" color="brand.neutral.600" fontSize="sm">
            <HStack>
              <CheckCircle size={16} color="#00A651" />
              <Text fontWeight="500">10,000+ Successful Negotiations</Text>
            </HStack>
            <HStack>
              <Award size={16} color="#00A651" />
              <Text fontWeight="500">94% Success Rate</Text>
            </HStack>
            <HStack>
              <Shield size={16} color="#00A651" />
              <Text fontWeight="500">Money-Back Guarantee</Text>
            </HStack>
          </HStack>
        </motion.div>


      </VStack>

      {/* How It Works Section */}
      <Box bg="brand.neutral.50" py={20} mt={20} borderRadius="12px">
        <VStack gap={12}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VStack gap={4} textAlign="center">
              <Heading
                as="h2"
                size="2xl"
                fontFamily="heading"
                color="brand.neutral.700"
                fontWeight="700"
              >
                How It Works
              </Heading>
              <Text
                fontSize="lg"
                color="brand.neutral.600"
                maxW="2xl"
              >
                Three simple steps to maximize your salary potential
              </Text>
            </VStack>
          </motion.div>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} width="100%">
            {[
              {
                icon: Users,
                title: "Share Your Profile",
                description: "Tell us about your current role, experience, and target compensation. Our experts analyze your profile against market data.",
                step: "01"
              },
              {
                icon: Target,
                title: "Get Expert Strategy", 
                description: "Receive personalized negotiation strategies, market insights, and timing recommendations based on your unique situation.",
                step: "02"
              },
              {
                icon: Handshake,
                title: "Negotiate with Confidence",
                description: "Follow your custom negotiation playbook with expert guidance and proven scripts that secure results.",
                step: "03"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Box
                  height="100%"
                  bg="white"
                  border="1px solid"
                  borderColor="brand.neutral.200"
                  borderRadius="12px"
                  boxShadow="md"
                  _hover={{
                    boxShadow: "xl",
                    transform: "translateY(-4px)"
                  }}
                  p={6}
                >
                    <VStack gap={4} align="start">
                      <HStack justify="space-between" width="100%">
                        <Box
                          p={3}
                          borderRadius="full"
                          bg="brand.primary"
                          color="white"
                        >
                          <Icon as={feature.icon} boxSize={6} />
                        </Box>
                        <Badge
                          colorScheme="blue"
                          variant="subtle"
                          fontSize="xs"
                          px={2}
                          py={1}
                        >
                          Step {feature.step}
                        </Badge>
                      </HStack>
                      <VStack gap={2} align="start">
                        <Heading
                          as="h3"
                          size="md"
                          fontFamily="heading"
                          color="brand.neutral.700"
                          fontWeight="600"
                        >
                          {feature.title}
                        </Heading>
                        <Text color="brand.neutral.600" lineHeight="tall" fontSize="sm">
                          {feature.description}
                        </Text>
                      </VStack>
                    </VStack>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Stats Section */}
      <VStack gap={8} py={16}>
        <Heading
          as="h2"
          size="xl"
          fontFamily="heading"
          color="brand.neutral.700"
          textAlign="center"
          fontWeight="600"
        >
          Trusted by Professionals
        </Heading>
        
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
          {[
            { icon: TrendingUp, stat: "94%", label: "Success Rate" },
            { icon: DollarSign, stat: "$50K+", label: "Average Increase" },
            { icon: Users, stat: "10K+", label: "Professionals Helped" },
            { icon: Award, stat: "4.9/5", label: "Customer Rating" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <VStack gap={2} textAlign="center">
                <Icon as={item.icon} boxSize={8} color="brand.primary" />
                <Text fontSize="2xl" fontWeight="700" color="brand.neutral.700">
                  {item.stat}
                </Text>
                <Text fontSize="sm" color="brand.neutral.600">
                  {item.label}
                </Text>
              </VStack>
            </motion.div>
          ))}
        </SimpleGrid>
      </VStack>
    </MainLayout>
  );
}
