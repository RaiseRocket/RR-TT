'use client';

import {
  Box,
  Container,
  Flex,
  VStack,
  HStack,
  Text,
  Link,
  Divider,
  SimpleGrid
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TrendingUp, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' }
  ],
  services: [
    { name: 'Salary Negotiation', href: '/services/negotiation' },
    { name: 'Career Coaching', href: '/services/coaching' },
    { name: 'Market Analysis', href: '/services/analysis' },
    { name: 'Interview Prep', href: '/services/interview' }
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Live Chat', href: '/chat' }
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' }
  ]
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg="brand.neutral.900"
      color="white"
      mt={20}
    >
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }} py={16}>
        <VStack gap={12} align="stretch">
          {/* Main Footer Content */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
            {/* Company Info */}
            <VStack gap={4} align="start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Flex alignItems="center" gap={3} mb={2}>
                  <TrendingUp size={24} color="#236CFF" />
                  <Text
                    fontSize="xl"
                    fontWeight="700"
                    fontFamily="heading"
                    color="white"
                  >
                    RaiseRocket
                  </Text>
                </Flex>
                <Text
                  color="brand.neutral.300"
                  fontSize="sm"
                  lineHeight="tall"
                >
                  Expert salary negotiation strategies that help professionals 
                  maximize their earning potential with proven, data-driven approaches.
                </Text>
              </motion.div>
            </VStack>

            {/* Company Links */}
            <VStack gap={4} align="start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Text
                  fontSize="md"
                  fontWeight="600"
                  color="white"
                  mb={2}
                >
                  Company
                </Text>
                <VStack gap={2} align="start">
                  {footerLinks.company.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      color="brand.neutral.300"
                      fontSize="sm"
                      _hover={{
                        color: 'brand.primary',
                        textDecoration: 'none'
                      }}
                      transition="color 0.2s ease"
                    >
                      {link.name}
                    </Link>
                  ))}
                </VStack>
              </motion.div>
            </VStack>

            {/* Services Links */}
            <VStack gap={4} align="start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Text
                  fontSize="md"
                  fontWeight="600"
                  color="white"
                  mb={2}
                >
                  Services
                </Text>
                <VStack gap={2} align="start">
                  {footerLinks.services.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      color="brand.neutral.300"
                      fontSize="sm"
                      _hover={{
                        color: 'brand.primary',
                        textDecoration: 'none'
                      }}
                      transition="color 0.2s ease"
                    >
                      {link.name}
                    </Link>
                  ))}
                </VStack>
              </motion.div>
            </VStack>

            {/* Support & Legal Links */}
            <VStack gap={4} align="start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Text
                  fontSize="md"
                  fontWeight="600"
                  color="white"
                  mb={2}
                >
                  Support
                </Text>
                <VStack gap={2} align="start">
                  {footerLinks.support.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      color="brand.neutral.300"
                      fontSize="sm"
                      _hover={{
                        color: 'brand.primary',
                        textDecoration: 'none'
                      }}
                      transition="color 0.2s ease"
                    >
                      {link.name}
                    </Link>
                  ))}
                </VStack>
              </motion.div>
            </VStack>
          </SimpleGrid>

          <Divider borderColor="brand.neutral.700" />

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
              <HStack gap={3}>
                <Mail size={16} color="#236CFF" />
                <VStack gap={0} align="start">
                  <Text fontSize="sm" fontWeight="500" color="white">
                    Email
                  </Text>
                  <Link
                    href="mailto:support@raiserocket.com"
                    color="brand.neutral.300"
                    fontSize="sm"
                    _hover={{
                      color: 'brand.primary',
                      textDecoration: 'none'
                    }}
                  >
                    support@raiserocket.com
                  </Link>
                </VStack>
              </HStack>

              <HStack gap={3}>
                <Phone size={16} color="#236CFF" />
                <VStack gap={0} align="start">
                  <Text fontSize="sm" fontWeight="500" color="white">
                    Phone
                  </Text>
                  <Link
                    href="tel:+1-555-0123"
                    color="brand.neutral.300"
                    fontSize="sm"
                    _hover={{
                      color: 'brand.primary',
                      textDecoration: 'none'
                    }}
                  >
                    (555) 123-4567
                  </Link>
                </VStack>
              </HStack>

              <HStack gap={3}>
                <MapPin size={16} color="#236CFF" />
                <VStack gap={0} align="start">
                  <Text fontSize="sm" fontWeight="500" color="white">
                    Office
                  </Text>
                  <Text color="brand.neutral.300" fontSize="sm">
                    San Francisco, CA
                  </Text>
                </VStack>
              </HStack>
            </SimpleGrid>
          </motion.div>

          <Divider borderColor="brand.neutral.700" />

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align={{ base: 'start', md: 'center' }}
              gap={4}
            >
              <Text
                color="brand.neutral.400"
                fontSize="sm"
              >
                © {currentYear} RaiseRocket. All rights reserved.
              </Text>

              <HStack gap={6} flexWrap="wrap">
                {footerLinks.legal.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    color="brand.neutral.400"
                    fontSize="sm"
                    _hover={{
                      color: 'brand.primary',
                      textDecoration: 'none'
                    }}
                    transition="color 0.2s ease"
                  >
                    {link.name}
                  </Link>
                ))}
              </HStack>
            </Flex>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  );
};
