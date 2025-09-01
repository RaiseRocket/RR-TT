'use client';

import { Button, ButtonProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface ProfessionalButtonProps extends Omit<ButtonProps, 'leftIcon'> {
  variant?: 'primary' | 'secondary' | 'accent';
  leftIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const ProfessionalButton = forwardRef<HTMLButtonElement, ProfessionalButtonProps>(
  ({ variant = 'primary', leftIcon, children, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <Button
          ref={ref}
          variant={variant}
          fontFamily="heading"
          fontWeight="600"
          borderRadius="8px"
          px={6}
          py={3}
          fontSize="md"
          position="relative"
          overflow="hidden"
          transition="all 0.2s ease-in-out"
          leftIcon={leftIcon as React.ReactElement}
          _focus={{
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(35, 108, 255, 0.3)'
          }}
          {...props}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
        </Button>
      </motion.div>
    );
  }
);

ProfessionalButton.displayName = 'ProfessionalButton';