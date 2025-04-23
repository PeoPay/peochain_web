// src/components/ui/social-share.tsx
import React, { useState } from "react";
import {
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Share2,
  MessageCircle,
  QrCode,
} from "lucide-react";
import { FaTelegram, FaWhatsapp, FaLink } from "react-icons/fa6";
import { Button } from "./button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SocialShareProps {
  referralCode: string;
  waitlistPosition?: number | null;
  referralCount?: number;
  className?: string;
}

// Export the component with both names for backward compatibility
export function SocialShare({
  referralCode,
  waitlistPosition,
  referralCount = 0,
  className,
}: SocialShareProps) {
  const [showQrCode, setShowQrCode] = useState(false);
  const { toast } = useToast();

  const getReferralUrl = () => {
    return `${window.location.origin}?ref=${referralCode}`;
  };

  const getShareTitle = () => {
    return `Join me on PeoChain, the future of blockchain!`;
  };

  const getShareMessage = () => {
    const baseMessage = `I just joined the PeoChain waitlist! It's a revolutionary Layer Zero blockchain that solves the scalability trilemma. `;

    // Add position if available
    const positionText = waitlistPosition
      ? `I'm #${waitlistPosition} on the list. `
      : "";

    return `${baseMessage}${positionText}Join me using my referral link:`;
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(getReferralUrl());

    toast({
      title: "Link copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const shareTwitter = () => {
    const url = encodeURIComponent(getReferralUrl());
    const text = encodeURIComponent(`${getShareMessage()}`);
    const hashtags = encodeURIComponent("PeoChain,Blockchain,Web3");

    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`,
      "_blank",
    );
  };

  const shareFacebook = () => {
    const url = encodeURIComponent(getReferralUrl());
    const quote = encodeURIComponent(getShareMessage());

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`,
      "_blank",
    );
  };

  const shareLinkedin = () => {
    const url = encodeURIComponent(getReferralUrl());
    const title = encodeURIComponent(getShareTitle());
    const summary = encodeURIComponent(getShareMessage());

    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`,
      "_blank",
    );
  };

  const shareWhatsapp = () => {
    const url = encodeURIComponent(getReferralUrl());
    const text = encodeURIComponent(`${getShareMessage()} ${getReferralUrl()}`);

    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareTelegram = () => {
    const url = encodeURIComponent(getReferralUrl());
    const text = encodeURIComponent(`${getShareMessage()} ${getReferralUrl()}`);

    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
  };

  const shareEmail = () => {
    const subject = encodeURIComponent(getShareTitle());
    const body = encodeURIComponent(
      `${getShareMessage()}\n\n${getReferralUrl()}`,
    );

    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const generateQrCodeUrl = () => {
    const url = encodeURIComponent(getReferralUrl());

    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${url}&margin=10`;
  };

  const shareButtons = [
    {
      label: "Twitter",
      icon: <Twitter size={18} />,
      onClick: shareTwitter,
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
      textColor: "text-white",
    },
    {
      label: "Facebook",
      icon: <Facebook size={18} />,
      onClick: shareFacebook,
      color: "bg-[#1877F2] hover:bg-[#1877F2]/90",
      textColor: "text-white",
    },
    {
      label: "LinkedIn",
      icon: <Linkedin size={18} />,
      onClick: shareLinkedin,
      color: "bg-[#0A66C2] hover:bg-[#0A66C2]/90",
      textColor: "text-white",
    },
    {
      label: "WhatsApp",
      icon: <FaWhatsapp size={18} />,
      onClick: shareWhatsapp,
      color: "bg-[#25D366] hover:bg-[#25D366]/90",
      textColor: "text-white",
    },
    {
      label: "Telegram",
      icon: <FaTelegram size={18} />,
      onClick: shareTelegram,
      color: "bg-[#0088cc] hover:bg-[#0088cc]/90",
      textColor: "text-white",
    },
    {
      label: "Email",
      icon: <Mail size={18} />,
      onClick: shareEmail,
      color: "bg-gray-600 hover:bg-gray-700",
      textColor: "text-white",
    },
    {
      label: "Copy Link",
      icon: <FaLink size={18} />,
      onClick: handleCopyReferral,
      color: "bg-gray-100 hover:bg-gray-200",
      textColor: "text-gray-800",
    },
    {
      label: "QR Code",
      icon: <QrCode size={18} />,
      onClick: () => setShowQrCode(true),
      color: "bg-gray-100 hover:bg-gray-200",
      textColor: "text-gray-800",
    },
  ];

  const previewImages = [
    {
      label: "Standard",
      url: `${window.location.origin}/api/social-preview?ref=${referralCode}&template=standard`,
      theme: "light",
    },
    {
      label: "Stats",
      url: `${window.location.origin}/api/social-preview?ref=${referralCode}&template=stats&position=${waitlistPosition || 0}&referrals=${referralCount}`,
      theme: "light",
    },
    {
      label: "Dark",
      url: `${window.location.origin}/api/social-preview?ref=${referralCode}&template=dark`,
      theme: "dark",
    },
  ];

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {shareButtons.map((button) => (
          <Button
            key={button.label}
            variant="outline"
            size="sm"
            onClick={button.onClick}
            className={`${button.color} ${button.textColor}`}
          >
            <span className="mr-2">{button.icon}</span>
            {button.label}
          </Button>
        ))}
      </div>

      <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share with QR Code</DialogTitle>
            <DialogDescription>
              Scan this QR code to join PeoChain using your referral link.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-4">
            <img
              src={generateQrCodeUrl()}
              alt="QR Code for referral"
              className="h-48 w-48"
            />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button
              variant="outline"
              onClick={() => {
                const link = document.createElement("a");
                link.href = generateQrCodeUrl();
                link.download = "peochain-referral-qr.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download QR Code
            </Button>
            <Button onClick={() => setShowQrCode(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            <span className="mr-2">
              <MessageCircle size={18} />
            </span>
            Customize Share Message
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Customize Your Share</DialogTitle>
            <DialogDescription>
              Choose a social preview image and customize your message
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview Images</TabsTrigger>
              <TabsTrigger value="message">Custom Message</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {previewImages.map((image) => (
                  <div
                    key={image.label}
                    className={`border rounded-lg p-2 cursor-pointer hover:border-primary ${
                      image.theme === "dark" ? "bg-gray-900" : ""
                    }`}
                    onClick={() => {
                      // Copy URL with this preview template
                      const url = new URL(getReferralUrl());
                      url.searchParams.append(
                        "template",
                        image.label.toLowerCase(),
                      );
                      navigator.clipboard.writeText(url.toString());

                      toast({
                        title: `${image.label} preview selected`,
                        description:
                          "Link with custom preview copied to clipboard",
                      });
                    }}
                  >
                    <div className="aspect-video relative overflow-hidden rounded">
                      <img
                        src={image.url}
                        alt={`${image.label} preview`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p
                      className={`text-center text-sm mt-2 ${
                        image.theme === "dark" ? "text-gray-300" : ""
                      }`}
                    >
                      {image.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-sm text-muted-foreground mt-4">
                Click on a preview to copy a link with that specific image for
                social sharing.
              </div>
            </TabsContent>

            <TabsContent value="message" className="space-y-4 py-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Custom Message</label>
                  <textarea
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    rows={4}
                    defaultValue={getShareMessage()}
                    placeholder="Enter your custom share message here..."
                  ></textarea>
                </div>

                <div>
                  <label className="text-sm font-medium">Add Hashtags</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "#PeoChain",
                      "#Blockchain",
                      "#Web3",
                      "#Crypto",
                      "#DeFi",
                    ].map((tag) => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Copy Custom Message</Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Alias for backward compatibility with existing code
export const EnhancedSocialShare = SocialShare;
