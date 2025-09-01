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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  useToast
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  DollarSign,
  Share2,
  MessageSquare,
  Star,
  CheckCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { useState, useEffect } from 'react';

// Money Animation Component
const MoneyAnimation = () => {
  const [moneyElements, setMoneyElements] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Create money elements falling from the top
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setMoneyElements(elements);
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      pointerEvents="none"
      zIndex={10}
      overflow="hidden"
    >
      {moneyElements.map((element) => (
        <motion.div
          key={element.id}
          initial={{ 
            y: -100, 
            x: `${element.x}%`,
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            y: window.innerHeight + 100,
            rotate: 360,
            opacity: 0
          }}
          transition={{
            duration: 3,
            delay: element.delay,
            ease: "easeIn"
          }}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#FFD700'
          }}
        >
          💰
        </motion.div>
      ))}
    </Box>
  );
};

export default function SuccessPage() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const toast = useToast();

  // Mock success data
  const successData = {
    finalOffer: 135000,
    originalOffer: 120000,
    increase: 15000,
    increasePercentage: 12.5,
    negotiationDuration: 18,
    strategyUsed: "Collaborative with firm boundaries"
  };

  useEffect(() => {
    // Stop animation after 5 seconds
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    setIsSharing(true);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'I just negotiated a $15,000 salary increase!',
          text: 'Check out RaiseRocket for expert salary negotiation strategies!',
          url: window.location.origin
        });
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(
          `I just negotiated a $${successData.increase.toLocaleString()} salary increase using RaiseRocket! Check it out: ${window.location.origin}`
        );
        toast({
          title: "Success story copied to clipboard!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(
        `I just negotiated a $${successData.increase.toLocaleString()} salary increase using RaiseRocket! Check it out: ${window.location.origin}`
      );
      toast({
        title: "Success story copied to clipboard!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    
    setIsSharing(false);
  };

  return (
    <MainLayout>
      {showAnimation && <MoneyAnimation />}
      
      <VStack gap={12} py={12} align="center">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <VStack gap={6} textAlign="center" maxW="3xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Box
                p={6}
                borderRadius="full"
                bg="brand.secondary"
                color="white"
                boxShadow="0 8px 32px rgba(0, 166, 81, 0.3)"
              >
                <Trophy size={48} />
              </Box>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Heading
                as="h1"
                size="2xl"
                fontFamily="heading"
                color="brand.neutral.700"
                fontWeight="700"
              >
                🎉 Congratulations! 🎉
              </Heading>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Text
                fontSize="xl"
                color="brand.neutral.600"
                lineHeight="tall"
                fontWeight="500"
              >
                You successfully negotiated a <Text as="span" color="brand.secondary" fontWeight="700">
                  ${successData.increase.toLocaleString()}
                </Text> salary increase!
              </Text>
            </motion.div>
          </VStack>
        </motion.div>

        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} width="100%" maxW="4xl">
            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="lg"
            >
              <CardBody p={6}>
                <Stat textAlign="center">
                  <StatLabel color="brand.neutral.600" fontSize="sm" fontWeight="500">
                    Final Offer
                  </StatLabel>
                  <StatNumber color="brand.secondary" fontSize="3xl" fontWeight="700">
                    ${successData.finalOffer.toLocaleString()}
                  </StatNumber>
                  <StatHelpText color="brand.secondary" fontSize="sm" fontWeight="500">
                    Up from ${successData.originalOffer.toLocaleString()}
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="lg"
            >
              <CardBody p={6}>
                <Stat textAlign="center">
                  <StatLabel color="brand.neutral.600" fontSize="sm" fontWeight="500">
                    Increase
                  </StatLabel>
                  <StatNumber color="brand.primary" fontSize="3xl" fontWeight="700">
                    {successData.increasePercentage}%
                  </StatNumber>
                  <StatHelpText color="brand.primary" fontSize="sm" fontWeight="500">
                    Above original offer
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card
              bg="white"
              border="1px solid"
              borderColor="brand.neutral.200"
              borderRadius="12px"
              boxShadow="lg"
            >
              <CardBody p={6}>
                <Stat textAlign="center">
                  <StatLabel color="brand.neutral.600" fontSize="sm" fontWeight="500">
                    Timeline
                  </StatLabel>
                  <StatNumber color="brand.neutral.700" fontSize="2xl" fontWeight="700">
                    {successData.negotiationDuration} days
                  </StatNumber>
                  <StatHelpText color="brand.neutral.500" fontSize="sm" fontWeight="500">
                    From start to finish
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>
        </motion.div>

        {/* Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <Card
            maxW="4xl"
            width="100%"
            bg="brand.neutral.50"
            border="1px solid"
            borderColor="brand.neutral.200"
            borderRadius="12px"
            boxShadow="md"
          >
            <CardBody p={8}>
              <VStack gap={6}>
                <Heading
                  as="h2"
                  size="lg"
                  fontFamily="heading"
                  color="brand.neutral.700"
                  fontWeight="600"
                  textAlign="center"
                >
                  Your Success Story
                </Heading>
                
                <VStack gap={4} align="start" width="100%">
                  <HStack align="start">
                    <Icon as={CheckCircle} boxSize={5} color="brand.secondary" mt={0.5} />
                    <Text color="brand.neutral.600" lineHeight="tall">
                      <strong>Strategy Used:</strong> {successData.strategyUsed}
                    </Text>
                  </HStack>
                  
                  <HStack align="start">
                    <Icon as={TrendingUp} boxSize={5} color="brand.secondary" mt={0.5} />
                    <Text color="brand.neutral.600" lineHeight="tall">
                      <strong>Key Success Factors:</strong> Professional communication, market research, and clear value proposition
                    </Text>
                  </HStack>
                  
                  <HStack align="start">
                    <Icon as={Award} boxSize={5} color="brand.secondary" mt={0.5} />
                    <Text color="brand.neutral.600" lineHeight="tall">
                      <strong>Result:</strong> You're now earning ${successData.increase.toLocaleString()} more per year!
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>

        {/* Share Success */}
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
            <CardBody p={8}>
              <VStack gap={6} textAlign="center">
                <Icon as={Share2} boxSize={8} />
                <Heading
                  as="h3"
                  size="md"
                  fontFamily="heading"
                  fontWeight="600"
                >
                  Share Your Success!
                </Heading>
                <Text fontSize="md" opacity={0.9} lineHeight="tall">
                  Help others achieve their salary goals by sharing your success story. 
                  Your experience could inspire someone else to negotiate their worth.
                </Text>
                
                <HStack gap={4} flexWrap="wrap" justify="center">
                  <Button
                    size="lg"
                    bg="white"
                    color="brand.primary"
                    _hover={{ bg: 'brand.neutral.50' }}
                    leftIcon={<Share2 size={16} />}
                    onClick={handleShare}
                    isLoading={isSharing}
                    loadingText="Sharing..."
                  >
                    Share My Success
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="white"
                    color="white"
                    _hover={{ bg: 'white', color: 'brand.primary' }}
                    leftIcon={<MessageSquare size={16} />}
                  >
                    Leave Testimonial
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.1 }}
        >
          <Card
            maxW="4xl"
            width="100%"
            bg="white"
            border="1px solid"
            borderColor="brand.neutral.200"
            borderRadius="12px"
            boxShadow="md"
          >
            <CardBody p={8}>
              <VStack gap={6}>
                <Heading
                  as="h3"
                  size="lg"
                  fontFamily="heading"
                  color="brand.neutral.700"
                  fontWeight="600"
                  textAlign="center"
                >
                  What's Next?
                </Heading>
                
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} width="100%">
                  <VStack gap={4} textAlign="center">
                    <Box
                      p={4}
                      borderRadius="full"
                      bg="brand.primary"
                      color="white"
                    >
                      <Star size={24} />
                    </Box>
                    <VStack gap={2}>
                      <Text fontSize="md" fontWeight="600" color="brand.neutral.700">
                        Celebrate Your Win
                      </Text>
                      <Text fontSize="sm" color="brand.neutral.600" lineHeight="tall">
                        You've earned this success! Take time to celebrate your achievement.
                      </Text>
                    </VStack>
                  </VStack>

                  <VStack gap={4} textAlign="center">
                    <Box
                      p={4}
                      borderRadius="full"
                      bg="brand.secondary"
                      color="white"
                    >
                      <TrendingUp size={24} />
                    </Box>
                    <VStack gap={2}>
                      <Text fontSize="md" fontWeight="600" color="brand.neutral.700">
                        Plan Your Future
                      </Text>
                      <Text fontSize="sm" color="brand.neutral.600" lineHeight="tall">
                        Set new career goals and plan your next salary review.
                      </Text>
                    </VStack>
                  </VStack>

                  <VStack gap={4} textAlign="center">
                    <Box
                      p={4}
                      borderRadius="full"
                      bg="brand.accent"
                      color="white"
                    >
                      <MessageSquare size={24} />
                    </Box>
                    <VStack gap={2}>
                      <Text fontSize="md" fontWeight="600" color="brand.neutral.700">
                        Help Others
                      </Text>
                      <Text fontSize="sm" color="brand.neutral.600" lineHeight="tall">
                        Share your experience and help others negotiate better offers.
                      </Text>
                    </VStack>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
        >
          <HStack gap={4} flexWrap="wrap" justify="center">
            <ProfessionalButton
              variant="primary"
              size="lg"
              leftIcon={<DollarSign />}
            >
              Track Your New Salary
            </ProfessionalButton>
            <ProfessionalButton
              variant="secondary"
              size="lg"
              leftIcon={<MessageSquare />}
            >
              Help a Friend
            </ProfessionalButton>
          </HStack>
        </motion.div>
      </VStack>
    </MainLayout>
  );
}
