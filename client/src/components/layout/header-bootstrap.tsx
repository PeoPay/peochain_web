import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Offcanvas, Dropdown } from "react-bootstrap";
import { Menu, ChevronDown, X, ChevronRight, Code, Shield, Zap, Network, Layers, DollarSign } from "lucide-react";
import { useLocation } from "wouter";

interface HeaderProps {
  onFeatureClick: () => void;
  onBenefitsClick: () => void;
  onTechnologyClick?: () => void;
  onWaitlistClick: () => void;
  onFaqClick?: () => void;
}

export default function HeaderBootstrap({ 
  onFeatureClick, 
  onBenefitsClick, 
  onTechnologyClick, 
  onWaitlistClick, 
  onFaqClick 
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };
  
  const navigateToWhitepaper = () => {
    setIsOpen(false);
    setLocation('/whitepaper');
  };
  
  const navigateToHomeSection = (section: string) => {
    setIsOpen(false);
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
  
  const navbarStyle = {
    transition: 'all 0.3s ease',
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      style={navbarStyle} 
      className="py-2"
    >
      <Container fluid className="px-3 px-md-4">
        <Navbar.Brand href="/">
          <img 
            src="/images/peochain-logo.png" 
            alt="PEOCHAIN Logo" 
            height="40" 
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setIsOpen(!isOpen)}
          className="border-0" 
        >
          <Menu className="text-dark" size={24} />
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Dropdown>
              <Dropdown.Toggle 
                variant="link" 
                id="technology-dropdown"
                className="nav-link text-dark text-decoration-none d-flex align-items-center"
              >
                Technology <ChevronDown size={16} className="ms-1" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-3 shadow border-0" style={{width: "600px"}}>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <div 
                      className="p-3 rounded h-100" 
                      style={{background: "linear-gradient(to bottom, rgba(135, 187, 162, 0.2), rgba(135, 187, 162, 0.05))"}}
                    >
                      <div className="d-flex align-items-center mb-2">
                        <Shield className="text-success me-2" size={24} />
                        <h5 className="mb-0 text-success">PeoChain Technology</h5>
                      </div>
                      <p className="small text-muted mb-3">
                        Explore our revolutionary blockchain infrastructure with 100,000+ TPS, 
                        subnet validators, and parallel transaction processing.
                      </p>
                      <div 
                        className="d-flex align-items-center text-success small"
                        role="button"
                        onClick={() => navigateToHomeSection('technology')}
                      >
                        <span>Learn more</span>
                        <ChevronRight size={16} className="ms-1" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <div 
                          className="p-3 rounded" 
                          role="button"
                          onClick={() => navigateToHomeSection('technology')}
                        >
                          <div className="d-flex align-items-center mb-1">
                            <Zap className="text-success me-2" size={16} />
                            <div className="fw-medium">Parallel Processing</div>
                          </div>
                          <p className="small text-muted mb-0">
                            High-throughput transaction processing with our subnet validation system
                          </p>
                        </div>
                      </div>
                      <div className="col-12 mb-3">
                        <div 
                          className="p-3 rounded" 
                          role="button"
                          onClick={() => navigateToHomeSection('technology')}
                        >
                          <div className="d-flex align-items-center mb-1">
                            <Network className="text-success me-2" size={16} />
                            <div className="fw-medium">Cross-Chain Integration</div>
                          </div>
                          <p className="small text-muted mb-0">
                            Seamless interoperability with major blockchain networks and protocols
                          </p>
                        </div>
                      </div>
                      <div className="col-12">
                        <div 
                          className="p-3 rounded" 
                          role="button"
                          onClick={() => navigateToHomeSection('technology')}
                        >
                          <div className="d-flex align-items-center mb-1">
                            <Shield className="text-success me-2" size={16} />
                            <div className="fw-medium">Security Architecture</div>
                          </div>
                          <p className="small text-muted mb-0">
                            Advanced consensus mechanisms with quantum-resistant encryption
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle 
                variant="link" 
                id="features-dropdown"
                className="nav-link text-dark text-decoration-none d-flex align-items-center"
              >
                Features <ChevronDown size={16} className="ms-1" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-3 shadow border-0" style={{width: "500px"}}>
                <div 
                  className="p-3 rounded mb-2" 
                  role="button"
                  onClick={() => navigateToHomeSection('features')}
                >
                  <div className="d-flex align-items-center mb-1">
                    <Zap className="text-success me-2" size={16} />
                    <div className="fw-medium">High-Performance Blockchain</div>
                  </div>
                  <p className="small text-muted mb-0">
                    100,000+ transactions per second with near-instant finality
                  </p>
                </div>
                <div 
                  className="p-3 rounded mb-2" 
                  role="button"
                  onClick={() => navigateToHomeSection('features')}
                >
                  <div className="d-flex align-items-center mb-1">
                    <Code className="text-success me-2" size={16} />
                    <div className="fw-medium">Developer Friendly</div>
                  </div>
                  <p className="small text-muted mb-0">
                    Unified API and comprehensive SDKs for simplified development
                  </p>
                </div>
                <div 
                  className="p-3 rounded" 
                  role="button"
                  onClick={() => navigateToHomeSection('features')}
                >
                  <div className="d-flex align-items-center mb-1">
                    <DollarSign className="text-success me-2" size={16} />
                    <div className="fw-medium">DeFi Ecosystem</div>
                  </div>
                  <p className="small text-muted mb-0">
                    Integrated financial services with cross-chain compatibility
                  </p>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link 
              onClick={() => navigateToHomeSection('benefits')}
              className="text-dark"
            >
              Benefits
            </Nav.Link>

            <Nav.Link 
              onClick={() => navigateToHomeSection('faq')}
              className="text-dark"
            >
              FAQ
            </Nav.Link>

            <Nav.Link 
              onClick={navigateToWhitepaper}
              className="text-dark"
            >
              Whitepaper
            </Nav.Link>

            <Button 
              onClick={() => navigateToHomeSection('waitlist')}
              variant="success" 
              className="ms-lg-3 mt-3 mt-lg-0 rounded-pill px-4"
              style={{
                background: "linear-gradient(135deg, var(--bs-success) 0%, var(--bs-teal) 100%)"
              }}
            >
              Join Waitlist
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}