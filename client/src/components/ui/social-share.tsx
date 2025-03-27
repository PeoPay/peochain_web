import React from 'react';
import { Twitter, Facebook, Linkedin, Mail, Share2 } from 'lucide-react';
import { Button } from './button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  referralCode: string;
  className?: string;
}

export function SocialShare({ referralCode, className = '' }: SocialShareProps) {
  const { toast } = useToast();
  const referralLink = `${window.location.origin}/?ref=${referralCode}`;
  const shareImageUrl = `${window.location.origin}/images/peochain-share.png`;
  const shareMessage = encodeURIComponent(
    "I just joined the PEOCHAIN waitlist! Skip the line by using my referral link: "
  );

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Referral Link Copied!",
      description: "Share it with friends to earn rewards!",
      variant: "default",
    });
  };

  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${shareMessage}&url=${encodeURIComponent(referralLink)}&via=peochain`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareFacebook = () => {
    // Facebook doesn't use the picture parameter in modern sharing URLs
    // It relies on Open Graph meta tags in the HTML
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareLinkedin = () => {
    // LinkedIn now relies more on Open Graph tags for image and summary
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareEmail = () => {
    const subject = encodeURIComponent("Join me on PEOCHAIN waitlist");
    const body = encodeURIComponent(
      `I just joined the PEOCHAIN waitlist and thought you might be interested too! Use my referral link to skip the line: ${referralLink}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      <h4 className="font-medium text-foreground mb-2">Share your referral link</h4>
      
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white hover:bg-primary/5 border-primary/20 text-[#1DA1F2] h-10 w-full max-w-10"
          onClick={shareTwitter}
          aria-label="Share on Twitter"
        >
          <Twitter className="h-5 w-5" aria-hidden="true" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white hover:bg-primary/5 border-primary/20 text-[#1877F2] h-10 w-full max-w-10"
          onClick={shareFacebook}
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5" aria-hidden="true" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white hover:bg-primary/5 border-primary/20 text-[#0A66C2] h-10 w-full max-w-10"
          onClick={shareLinkedin}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-5 w-5" aria-hidden="true" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white hover:bg-primary/5 border-primary/20 text-gray-600 h-10 w-full max-w-10"
          onClick={shareEmail}
          aria-label="Share via Email"
        >
          <Mail className="h-5 w-5" aria-hidden="true" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white hover:bg-primary/5 border-primary/20 text-gray-600 h-10 w-full max-w-10"
          onClick={handleCopyReferral}
          aria-label="Copy referral link"
        >
          <Share2 className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>

      <div className="flex items-center p-3 rounded-lg bg-primary/5 border border-primary/10">
        <div className="text-xs sm:text-sm text-foreground/80 flex-1">
          <span className="font-medium">Pro tip:</span> The more friends you refer, the earlier you'll get access
        </div>
      </div>
    </div>
  );
}