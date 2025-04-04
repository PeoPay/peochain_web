
import { useState, useEffect } from 'react';
import { Button } from './button';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-primary/10 p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm text-foreground/80">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          <a href="/privacy-policy" className="text-primary hover:underline ml-1">Learn more</a>
        </p>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setShow(false)}>
            Decline
          </Button>
          <Button size="sm" onClick={accept} className="bg-primary hover:bg-primary/90">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
