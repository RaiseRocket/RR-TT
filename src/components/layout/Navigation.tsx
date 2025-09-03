'use client';

import {
  Box,
  Flex,
  HStack,
  Text,
  Link,
  IconButton,
  useDisclosure,
  VStack,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Badge
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Menu, TrendingUp, User, LogOut } from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const navItems = [];

export const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={100}
      bg="white"
      borderBottom="1px solid"
      borderColor="brand.neutral.200"
      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
    >
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flex alignItems="center" gap={3}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <TrendingUp size={32} color="#236CFF" />
              </motion.div>
              <VStack spacing={0} align="start">
                <Text
                  fontSize="xl"
                  fontWeight="700"
                  fontFamily="heading"
                  color="brand.primary"
                  lineHeight="1"
                >
                  RaiseRocket
                </Text>
              </VStack>
            </Flex>
          </motion.div>

          <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  color="brand.neutral.700"
                  _hover={{
                    color: 'brand.primary',
                    textDecoration: 'none'
                  }}
                  transition="color 0.2s ease"
                  fontWeight="500"
                  fontSize="md"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </HStack>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <HStack gap={4}>
              {user ? (
                <>
                  <HStack gap={2} display={{ base: 'none', md: 'flex' }}>
                    <User size={16} color="#236CFF" />
                    <Text fontSize="sm" color="brand.neutral.700" fontWeight="500">
                      {user.user_metadata?.full_name || user.email}
                    </Text>
                  </HStack>
                  <ProfessionalButton
                    variant="secondary"
                    size="sm"
                    display={{ base: 'none', md: 'flex' }}
                    onClick={handleSignOut}
                    leftIcon={<LogOut size={16} />}
                  >
                    Sign Out
                  </ProfessionalButton>
                </>
              ) : (
                <>
                  <ProfessionalButton
                    variant="secondary"
                    size="sm"
                    display={{ base: 'none', md: 'flex' }}
                    onClick={() => router.push('/auth/login')}
                  >
                    Sign In
                  </ProfessionalButton>
                  <ProfessionalButton
                    variant="primary"
                    size="sm"
                    display={{ base: 'none', md: 'flex' }}
                    onClick={() => router.push('/auth/signup')}
                  >
                    Get Started
                  </ProfessionalButton>
                </>
              )}
              
              <IconButton
                aria-label="Open menu"
                icon={<Menu />}
                variant="ghost"
                color="brand.neutral.700"
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                _hover={{ bg: 'brand.neutral.100' }}
              />
            </HStack>
          </motion.div>
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay backdropFilter="blur(10px)" />
        <DrawerContent bg="white" borderLeft="1px solid" borderColor="brand.neutral.200">
          <DrawerCloseButton color="brand.neutral.700" />
          <DrawerHeader color="brand.neutral.700" fontFamily="heading" fontWeight="600">
            Navigation
          </DrawerHeader>
          <DrawerBody>
            <VStack gap={6} align="stretch">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    color="brand.neutral.700"
                    fontSize="lg"
                    fontWeight="500"
                    _hover={{
                      color: 'brand.primary',
                      textDecoration: 'none'
                    }}
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <VStack gap={3} pt={4}>
                {user ? (
                  <>
                    <HStack gap={2} width="full" p={3} bg="brand.neutral.50" borderRadius="8px">
                      <User size={16} color="#236CFF" />
                      <Text fontSize="sm" color="brand.neutral.700" fontWeight="500">
                        {user.user_metadata?.full_name || user.email}
                      </Text>
                    </HStack>
                    <ProfessionalButton 
                      variant="secondary" 
                      width="full"
                      onClick={handleSignOut}
                      leftIcon={<LogOut size={16} />}
                    >
                      Sign Out
                    </ProfessionalButton>
                  </>
                ) : (
                  <>
                    <ProfessionalButton 
                      variant="secondary" 
                      width="full"
                      onClick={() => {
                        router.push('/auth/login');
                        onClose();
                      }}
                    >
                      Sign In
                    </ProfessionalButton>
                    <ProfessionalButton 
                      variant="primary" 
                      width="full"
                      onClick={() => {
                        router.push('/auth/signup');
                        onClose();
                      }}
                    >
                      Get Started
                    </ProfessionalButton>
                  </>
                )}
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};