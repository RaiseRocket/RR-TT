'use client';

import {
  VStack,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  HStack,
  Icon,
  SimpleGrid,
  Badge,
  Divider,
  Button,
  useToast
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Target, 
  FileText,
  MessageSquare,
  Clock,
  CheckCircle,
  Copy,
  ArrowRight,
  TrendingUp,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { useState } from 'react';

export default function CoachStrategyPage() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const toast = useToast();

  // Mock strategy data
  const strategyData = {
    confidenceScore: 88,
    recommendedApproach: "Collaborative with firm boundaries",
    nextSteps: [
      "Send follow-up email within 24 hours",
      "Schedule a call to discuss compensation",
      "Prepare for potential counter-offers"
    ],
    emailTemplate: {
      subject: "Following up on our compensation discussion",
      body: `Hi [Hiring Manager Name],

Thank you for taking the time to discuss the Senior Software Engineer position with me. I'm very excited about the opportunity to contribute to TechCorp's mission and work with your talented team.

After our conversation, I wanted to follow up on the compensation discussion. Based on my research of the market and my experience with [specific skills/achievements], I believe there's room to align the offer with current market rates for this role.

I'm confident that my background in [relevant experience] and track record of [specific achievements] will bring significant value to the team. I'd love to discuss how we can structure a compensation package that reflects this value.

Would you be available for a brief call this week to discuss this further? I'm flexible with timing and can work around your schedule.

Thank you for your consideration, and I look forward to hearing from you.

Best regards,
[Your Name]`
    },
    talkingPoints: [
      "Emphasize your unique value proposition",
      "Reference specific market data for your role",
      "Highlight your track record of success",
      "Show enthusiasm for the role while being firm on compensation",
      "Ask open-ended questions about their budget flexibility"
    ],
    potentialCounterOffers: [
      "They may offer additional benefits instead of salary increase",
      "They might suggest a performance review after 6 months",
      "They could offer equity or stock options",
      "They may ask for your current salary as leverage"
    ]
  };

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set(prev).add(itemId));
      toast({
        title: "Copied to clipboard!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // Remove from copied items after 3 seconds
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 3000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <MainLayout>
      <VStack gap={12} py={12} align="center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <VStack gap={6} textAlign="center" maxW="3xl">
            <Box
              p={4}
              borderRadius="full"
              bg="brand.secondary"
              color="white"
            >
              <Target size={32} />
            </Box>
            <Heading
              as="h1"
              size="2xl"
              fontFamily="heading"
              color="brand.neutral.700"
              fontWeight="700"
            >
              Your Personalized Negotiation Strategy
            </Heading>
            <Text
              fontSize="lg"
              color="brand.neutral.600"
              lineHeight="tall"
            >
              Based on your communication and goals, here's your custom strategy with email templates, 
              talking points, and next steps to maximize your offer.
            </Text>
          </VStack>
        </motion.div>

        {/* Strategy Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} width="100%" maxW="4xl">
            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="md"
            >
              <CardBody p={6}>
                <VStack gap={4}>
                  <Icon as={TrendingUp} boxSize={8} color="brand.primary" />
                  <VStack gap={2}>
                    <Text fontSize="sm" fontWeight="600" color="brand.neutral.700">
                      Confidence Score
                    </Text>
                    <Text fontSize="2xl" fontWeight="700" color="brand.primary">
                      {strategyData.confidenceScore}%
                    </Text>
                    <Text fontSize="xs" color="brand.neutral.500">
                      High success probability
                    </Text>
                  </VStack>
                </VStack>
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
                <VStack gap={4}>
                  <Icon as={MessageSquare} boxSize={8} color="brand.primary" />
                  <VStack gap={2}>
                    <Text fontSize="sm" fontWeight="600" color="brand.neutral.700">
                      Recommended Approach
                    </Text>
                    <Text fontSize="md" fontWeight="600" color="brand.neutral.700" textAlign="center">
                      {strategyData.recommendedApproach}
                    </Text>
                  </VStack>
                </VStack>
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
                <VStack gap={4}>
                  <Icon as={Clock} boxSize={8} color="brand.primary" />
                  <VStack gap={2}>
                    <Text fontSize="sm" fontWeight="600" color="brand.neutral.700">
                      Timeline
                    </Text>
                    <Text fontSize="md" fontWeight="600" color="brand.neutral.700">
                      24-48 hours
                    </Text>
                    <Text fontSize="xs" color="brand.neutral.500">
                      Next action recommended
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </motion.div>

        {/* Email Template */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card
            maxW="4xl"
            width="100%"
            bg="white"
            border="1px solid"
            borderColor="brand.neutral.200"
            borderRadius="12px"
            boxShadow="lg"
          >
            <CardBody p={8}>
              <VStack gap={6} align="start">
                <HStack justify="space-between" width="100%">
                  <HStack>
                    <Icon as={FileText} boxSize={6} color="brand.primary" />
                    <Heading
                      as="h2"
                      size="md"
                      fontFamily="heading"
                      color="brand.neutral.700"
                      fontWeight="600"
                    >
                      Email Template
                    </Heading>
                  </HStack>
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<Copy size={16} />}
                    onClick={() => copyToClipboard(strategyData.emailTemplate.body, 'email-body')}
                    colorScheme={copiedItems.has('email-body') ? 'green' : 'blue'}
                  >
                    {copiedItems.has('email-body') ? 'Copied!' : 'Copy Email'}
                  </Button>
                </HStack>

                <VStack gap={4} width="100%" align="start">
                  <Box width="100%">
                    <Text fontSize="sm" fontWeight="600" color="brand.neutral.700" mb={2}>
                      Subject Line
                    </Text>
                    <Box
                      p={3}
                      bg="brand.neutral.50"
                      borderRadius="6px"
                      border="1px solid"
                      borderColor="brand.neutral.200"
                    >
                      <Text fontSize="md" color="brand.neutral.700">
                        {strategyData.emailTemplate.subject}
                      </Text>
                    </Box>
                  </Box>

                  <Box width="100%">
                    <Text fontSize="sm" fontWeight="600" color="brand.neutral.700" mb={2}>
                      Email Body
                    </Text>
                    <Box
                      p={4}
                      bg="brand.neutral.50"
                      borderRadius="8px"
                      border="1px solid"
                      borderColor="brand.neutral.200"
                      maxH="400px"
                      overflowY="auto"
                    >
                      <Text
                        fontSize="sm"
                        color="brand.neutral.700"
                        lineHeight="tall"
                        whiteSpace="pre-line"
                      >
                        {strategyData.emailTemplate.body}
                      </Text>
                    </Box>
                  </Box>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>

        {/* Talking Points and Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} width="100%" maxW="6xl">
            {/* Talking Points */}
            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="md"
            >
              <CardBody p={6}>
                <VStack gap={6} align="start">
                  <HStack>
                    <Icon as={MessageSquare} boxSize={6} color="brand.primary" />
                    <Heading
                      as="h3"
                      size="md"
                      fontFamily="heading"
                      color="brand.neutral.700"
                      fontWeight="600"
                    >
                      Key Talking Points
                    </Heading>
                  </HStack>
                  
                  <VStack gap={3} align="start" width="100%">
                    {strategyData.talkingPoints.map((point, index) => (
                      <HStack key={index} align="start">
                        <Box
                          width="6px"
                          height="6px"
                          borderRadius="full"
                          bg="brand.primary"
                          mt={2}
                          flexShrink={0}
                        />
                        <Text color="brand.neutral.600" fontSize="sm" lineHeight="tall">
                          {point}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Next Steps */}
            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="md"
            >
              <CardBody p={6}>
                <VStack gap={6} align="start">
                  <HStack>
                    <Icon as={ArrowRight} boxSize={6} color="brand.primary" />
                    <Heading
                      as="h3"
                      size="md"
                      fontFamily="heading"
                      color="brand.neutral.700"
                      fontWeight="600"
                    >
                      Next Steps
                    </Heading>
                  </HStack>
                  
                  <VStack gap={3} align="start" width="100%">
                    {strategyData.nextSteps.map((step, index) => (
                      <HStack key={index} align="start">
                        <Badge
                          colorScheme="blue"
                          variant="solid"
                          fontSize="xs"
                          px={2}
                          py={1}
                          borderRadius="full"
                        >
                          {index + 1}
                        </Badge>
                        <Text color="brand.neutral.600" fontSize="sm" lineHeight="tall">
                          {step}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </motion.div>

        {/* Potential Counter-Offers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Card
            maxW="4xl"
            width="100%"
            bg="brand.neutral.50"
            border="1px solid"
            borderColor="brand.neutral.200"
            borderRadius="12px"
          >
            <CardBody p={6}>
              <VStack gap={6} align="start">
                <HStack>
                  <Icon as={AlertCircle} boxSize={6} color="brand.accent" />
                  <Heading
                    as="h3"
                    size="md"
                    fontFamily="heading"
                    color="brand.neutral.700"
                    fontWeight="600"
                  >
                    Potential Counter-Offers to Expect
                  </Heading>
                </HStack>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} width="100%">
                  {strategyData.potentialCounterOffers.map((counter, index) => (
                    <HStack key={index} align="start">
                      <Box
                        width="6px"
                        height="6px"
                        borderRadius="full"
                        bg="brand.accent"
                        mt={2}
                        flexShrink={0}
                      />
                      <Text color="brand.neutral.600" fontSize="sm" lineHeight="tall">
                        {counter}
                      </Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <HStack gap={4} flexWrap="wrap" justify="center">
            <ProfessionalButton
              variant="primary"
              size="lg"
              leftIcon={<MessageSquare />}
            >
              I'm Ready to Negotiate
            </ProfessionalButton>
            <ProfessionalButton
              variant="secondary"
              size="lg"
              leftIcon={<FileText />}
            >
              Save Strategy
            </ProfessionalButton>
          </HStack>
        </motion.div>

        {/* Success Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <Card
            maxW="2xl"
            width="100%"
            bg="brand.primary"
            color="white"
            borderRadius="12px"
            boxShadow="lg"
          >
            <CardBody p={6}>
              <VStack gap={4} textAlign="center">
                <Icon as={CheckCircle} boxSize={8} />
                <Heading
                  as="h3"
                  size="md"
                  fontFamily="heading"
                  fontWeight="600"
                >
                  Remember: You've Got This!
                </Heading>
                <Text fontSize="sm" opacity={0.9} lineHeight="tall">
                  You have a strong position and a clear strategy. Stay confident, 
                  be professional, and remember that negotiation is a normal part 
                  of the hiring process. Good luck!
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>
      </VStack>
    </MainLayout>
  );
}
