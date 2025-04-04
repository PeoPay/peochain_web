import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  Box,
  Flex,
  HStack,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Link,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  VStack,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { 
  ChevronDownIcon, 
  HamburgerIcon, 
  CloseIcon,
  QuestionIcon,
  CheckIcon,
  StarIcon,
  ExternalLinkIcon
} from "@chakra-ui/icons";

// Custom icon components for the ones not available in Chakra
const ShieldIcon = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const FileTextIcon = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const DollarIcon = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const CodeIcon = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const LightningBoltIcon = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const LinkIcon = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

interface HeaderProps {
  onFeatureClick: () => void;
  onBenefitsClick: () => void;
  onTechnologyClick?: () => void;
  onWaitlistClick: () => void;
  onFaqClick?: () => void;
}

export default function Header({ onFeatureClick, onBenefitsClick, onTechnologyClick, onWaitlistClick, onFaqClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, setLocation] = useLocation();
  const btnRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navigateToWhitepaper = () => {
    onClose();
    setLocation('/whitepaper');
  };
  
  const navigateToHomeSection = (section: string) => {
    onClose();
    // If already on home page, use scrollIntoView
    if (window.location.pathname === '/') {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page with section hash
      setLocation(`/#${section}`);
    }
  };

  return (
    <>
      <Flex
        as="header"
        position="fixed"
        top="0"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        bg={isScrolled ? 'rgba(234, 240, 234, 0.9)' : 'transparent'}
        style={{
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}
        zIndex={1000}
      >
        <Link href="/" _hover={{ textDecoration: 'none' }}>
          <Image src="/images/peochain-logo.png" alt="PEOCHAIN Logo" h="40px" />
        </Link>

        {/* Desktop Navigation */}
        <HStack spacing={5} display={{ base: 'none', md: 'flex' }}>
          {/* Technology Menu */}
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />}
              variant="ghost"
              fontWeight="500"
              color="peochain.text"
              _hover={{ bg: 'peochain.background' }}
            >
              Technology
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigateToHomeSection('technology')}>
                <Flex align="center">
                  <Icon as={ShieldIcon} color="peochain.primary" mr={2} />
                  <Box>
                    <Text fontWeight="bold">PeoChain Technology</Text>
                    <Text fontSize="sm" color="peochain.text" mt={1}>
                      Explore our revolutionary blockchain infrastructure
                    </Text>
                  </Box>
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => navigateToHomeSection('technology')}>
                <Icon as={LightningBoltIcon} color="peochain.primary" mr={2} />
                Parallel Processing
              </MenuItem>
              <MenuItem onClick={() => navigateToHomeSection('technology')}>
                <Icon as={LinkIcon} color="peochain.primary" mr={2} />
                Cross-Chain Integration
              </MenuItem>
              <MenuItem onClick={() => navigateToHomeSection('technology')}>
                <Icon as={ShieldIcon} color="peochain.primary" mr={2} />
                Security Architecture
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Features Menu */}
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />}
              variant="ghost"
              fontWeight="500"
              color="peochain.text"
              _hover={{ bg: 'peochain.background' }}
            >
              Features
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigateToHomeSection('features')}>
                <Icon as={LightningBoltIcon} color="peochain.primary" mr={2} />
                High-Performance Blockchain
              </MenuItem>
              <MenuItem onClick={() => navigateToHomeSection('features')}>
                <Icon as={CodeIcon} color="peochain.primary" mr={2} />
                Developer Friendly
              </MenuItem>
              <MenuItem onClick={() => navigateToHomeSection('features')}>
                <Icon as={DollarIcon} color="peochain.primary" mr={2} />
                DeFi Ecosystem
              </MenuItem>
            </MenuList>
          </Menu>

          <Button 
            variant="ghost" 
            onClick={() => navigateToHomeSection('benefits')}
            fontWeight="500"
            color="peochain.text"
            _hover={{ bg: 'peochain.background' }}
          >
            Benefits
          </Button>

          <Button 
            variant="ghost" 
            onClick={() => navigateToHomeSection('faq')}
            fontWeight="500"
            color="peochain.text"
            _hover={{ bg: 'peochain.background' }}
          >
            FAQ
          </Button>

          <Button 
            variant="ghost" 
            onClick={navigateToWhitepaper}
            fontWeight="500"
            color="peochain.text"
            _hover={{ bg: 'peochain.background' }}
          >
            Whitepaper
          </Button>

          <Button 
            onClick={() => navigateToHomeSection('waitlist')}
            bgGradient="linear(to-r, peochain.primary, peochain.accent)"
            color="white"
            borderRadius="full"
            px={6}
            py={5}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'md',
            }}
          >
            Join Waitlist
          </Button>
        </HStack>

        {/* Mobile Navigation Toggle */}
        <IconButton
          ref={btnRef}
          display={{ base: 'flex', md: 'none' }}
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant="ghost"
        />
      </Flex>

      {/* Mobile Sidebar */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay backdropFilter="blur(10px)" />
        <DrawerContent bg="rgba(234, 240, 234, 0.95)">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Image src="/images/peochain-logo.png" alt="PEOCHAIN Logo" h="40px" />
          </DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={4} mt={4}>
              <Text fontWeight="bold" color="peochain.primary">
                <Icon as={ShieldIcon} mr={2} />
                Technology
              </Text>
              <Button 
                variant="ghost" 
                justifyContent="flex-start" 
                pl={10} 
                leftIcon={<Icon as={LightningBoltIcon} />}
                onClick={() => navigateToHomeSection('technology')}
              >
                Parallel Processing
              </Button>
              <Button 
                variant="ghost" 
                justifyContent="flex-start" 
                pl={10} 
                leftIcon={<Icon as={LinkIcon} />}
                onClick={() => navigateToHomeSection('technology')}
              >
                Cross-Chain Integration
              </Button>
              <Button 
                variant="ghost" 
                justifyContent="flex-start" 
                pl={10} 
                leftIcon={<Icon as={ShieldIcon} />}
                onClick={() => navigateToHomeSection('technology')}
              >
                Security Architecture
              </Button>

              <Divider />

              <Text fontWeight="bold" color="peochain.primary">
                <Icon as={StarIcon} mr={2} />
                Features
              </Text>
              <Button 
                variant="ghost" 
                justifyContent="flex-start" 
                pl={10} 
                leftIcon={<Icon as={LightningBoltIcon} />}
                onClick={() => navigateToHomeSection('features')}
              >
                High-Performance Blockchain
              </Button>
              <Button 
                variant="ghost" 
                justifyContent="flex-start" 
                pl={10} 
                leftIcon={<Icon as={CodeIcon} />}
                onClick={() => navigateToHomeSection('features')}
              >
                Developer Friendly
              </Button>
              <Button 
                variant="ghost" 
                justifyContent="flex-start" 
                pl={10} 
                leftIcon={<Icon as={DollarIcon} />}
                onClick={() => navigateToHomeSection('features')}
              >
                DeFi Ecosystem
              </Button>

              <Divider />

              <Button 
                variant="ghost" 
                justifyContent="flex-start" 
                leftIcon={<Icon as={CheckIcon} />}
                onClick={() => navigateToHomeSection('benefits')}
              >
                Benefits
              </Button>
              
              <Button 
                variant="ghost" 
                justifyContent="flex-start" 
                leftIcon={<Icon as={QuestionIcon} />}
                onClick={() => navigateToHomeSection('faq')}
              >
                FAQ
              </Button>
              
              <Button 
                variant="ghost" 
                justifyContent="flex-start" 
                leftIcon={<Icon as={FileTextIcon} />}
                onClick={navigateToWhitepaper}
              >
                Whitepaper
              </Button>
              
              <Button
                mt={6}
                w="full"
                bgGradient="linear(to-r, peochain.primary, peochain.accent)"
                color="white"
                py={6}
                onClick={() => navigateToHomeSection('waitlist')}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'md',
                }}
              >
                Join Waitlist
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
