import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Link } from 'wouter';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    // Here you would implement logic to disable non-essential cookies
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
          <p className="text-sm text-foreground/80 max-w-3xl">
            This website uses cookies to enhance your browsing experience. By continuing to use this site, you consent to our use of cookies in accordance with our{' '}
            <Link href="/privacy-policy" className="text-primary underline">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={declineCookies}
            className="whitespace-nowrap"
          >
            Decline
          </Button>
          <Button 
            onClick={acceptCookies}
            size="sm"
            className="whitespace-nowrap"
          >
            Accept Cookies
          </Button>
        </div>
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute top-4 right-4 md:static md:ml-2 text-foreground/70 hover:text-foreground"
          aria-label="Close cookie banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}