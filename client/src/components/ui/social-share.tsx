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
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&picture=${encodeURIComponent(shareImageUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareLinkedin = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}&summary=${shareMessage}&image=${encodeURIComponent(shareImageUrl)}`;
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
      
      <div className="flex justify-between items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="flex-1 bg-white hover:bg-primary/5 border-primary/20 text-[#1DA1F2]"
          onClick={shareTwitter}
        >
          <Twitter className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="flex-1 bg-white hover:bg-primary/5 border-primary/20 text-[#1877F2]"
          onClick={shareFacebook}
        >
          <Facebook className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="flex-1 bg-white hover:bg-primary/5 border-primary/20 text-[#0A66C2]"
          onClick={shareLinkedin}
        >
          <Linkedin className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="flex-1 bg-white hover:bg-primary/5 border-primary/20 text-gray-600"
          onClick={shareEmail}
        >
          <Mail className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="flex-1 bg-white hover:bg-primary/5 border-primary/20 text-gray-600"
          onClick={handleCopyReferral}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center p-3 rounded-lg bg-primary/5 border border-primary/10">
        <div className="text-xs text-foreground/70 flex-1">
          <span className="font-medium">Pro tip:</span> The more friends you refer, the earlier you'll get access
        </div>
      </div>
    </div>
  );
}