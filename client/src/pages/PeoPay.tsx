import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useLocation } from "wouter";
import { ExternalLink } from "lucide-react";

export default function PeoPay() {
  const [, navigate] = useLocation();

  // Navigate to home page sections
  const navigateToHome = (section: string) => {
    navigate(`/#${section}`);
  };

  return (
    <div className="min-h-screen gradient-background">
      <Header
        onFeatureClick={() => navigateToHome("features")}
        onBenefitsClick={() => navigateToHome("benefits")}
        onTechnologyClick={() => navigateToHome("technology")}
        onWaitlistClick={() => navigateToHome("waitlist")}
        onFaqClick={() => navigateToHome("faq")}
      />

      <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 pt-24 md:pt-32" id="main-content">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 md:mb-8">
          About PeoPay Technology
        </h1>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12">
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
              The User Interface to PEOCHAIN's Technology
            </h2>
            
            <p className="text-base sm:text-lg">
              PeoPay is the user-friendly payment application that makes PEOCHAIN's powerful blockchain technology accessible to everyone.
            </p>
            
            <p className="text-base sm:text-lg">
              By providing an intuitive interface to complex blockchain operations, PeoPay bridges the gap between advanced technology and everyday users, enabling affordable global payments without requiring technical knowledge.
            </p>
            
            <p className="text-base sm:text-lg">
              Our roadmap is closely aligned with PEOCHAIN's development timeline, with both platforms scheduled for public launch in Q3 2025 following extensive testing and auditing.
            </p>

            <div className="pt-4">
              <Button 
                className="flex items-center gap-2" 
                size="lg"
                onClick={() => window.open("https://peopay.io", "_blank")}
              >
                Visit PeoPay Website
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
              PeoPay Technology Stack
            </h2>
            
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/20 p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect width="16" height="20" x="4" y="2" rx="2" />
                      <path d="M10 18h4" />
                    </svg>
                  </div>
                  <h3 className="font-medium">User Interface Layer</h3>
                </div>
                <p className="text-sm">PeoPay mobile and web applications that users directly interact with</p>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/20 p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </div>
                  <h3 className="font-medium">API & Integration Layer</h3>
                </div>
                <p className="text-sm">Connects PeoPay interface with PEOCHAIN's blockchain infrastructure</p>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/20 p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M3 15h18" />
                      <path d="M9 3v18" />
                      <path d="M15 3v18" />
                    </svg>
                  </div>
                  <h3 className="font-medium">PEOCHAIN Blockchain Layer</h3>
                </div>
                <p className="text-sm">Core blockchain infrastructure with PoSyg consensus mechanism</p>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/20 p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <line x1="3" x2="21" y1="9" y2="9" />
                      <line x1="9" x2="9" y1="21" y2="9" />
                    </svg>
                  </div>
                  <h3 className="font-medium">Validator Network Layer</h3>
                </div>
                <p className="text-sm">Distributed validator infrastructure processing 100,000+ TPS</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
