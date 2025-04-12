import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  FaXTwitter,
  FaDiscord,
  FaTelegram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { Link } from "wouter";

export default function Footer() {
  const handleWaitlistClick = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="px-3 sm:px-4 md:px-8 py-8 sm:py-10 md:py-12 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto">
        <div className="md:text-center">
          <div className="flex justify-center md:justify-center mb-4">
            <img
              src="/images/peochain-logo.png"
              alt="PEOCHAIN Logo"
              className="h-10"
            />
          </div>
          <p className="text-foreground/70 mb-6 md:max-w-xl md:mx-auto">
            PEOCHAIN is redefining blockchain capabilities—building scalable, secure, 
            and truly decentralized infrastructure.
          </p>
          <div className="flex space-x-6 mb-8 md:justify-center">
            <a
              href="https://x.com/peochain"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon text-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://discord.gg/FqvHmnX57N"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon text-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
              aria-label="Discord"
            >
              <FaDiscord className="w-6 h-6" />
            </a>
            <a
              href="https://t.me/peochain"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon text-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
              aria-label="Telegram"
            >
              <FaTelegram className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/peochain/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon text-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-6 h-6" />
            </a>
          </div>

          <div className="text-center mb-8">
            <Button
              onClick={handleWaitlistClick}
              className="btn-gradient text-white font-medium py-3 px-8 rounded-full"
            >
              Join the Waitlist
            </Button>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-primary/5 text-center mb-8">
          <p className="text-foreground/80">
            The future of blockchain technology awaits. Be part of the revolution—PEOCHAIN launches soon.
          </p>
        </div>

        <Separator className="my-6 bg-foreground/10" />

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PEOCHAIN. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy-policy"
              className="text-foreground/60 hover:text-primary text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-foreground/60 hover:text-primary text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
