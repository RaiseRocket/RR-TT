'use client';

import { Box, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Navigation } from './Navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box position="relative" minH="100vh" bg="white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Navigation />
        
        <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
          <motion.main
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            {children}
          </motion.main>
        </Container>
      </motion.div>
    </Box>
  );
};