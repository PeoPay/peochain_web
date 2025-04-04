import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Twitter, 
  Github, 
  Linkedin, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";

import { SiDiscord, SiTelegram } from "react-icons/si";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

interface AuditPartner {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export default function CommunitySection() {
  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Dr. Sarah Chen",
      role: "Blockchain Researcher",
      company: "CryptoLabs Institute",
      image: "/avatars/researcher.png",
      quote: "PeoChain's novel Proof of Synergy consensus represents a significant breakthrough in balancing security, decentralization, and scalability. Our tests confirm throughput exceeding 100,000 TPS with remarkably low energy consumption."
    },
    {
      id: "t2",
      name: "Alex Moreno",
      role: "Lead Developer",
      company: "BlockTech Solutions",
      image: "/avatars/developer.png",
      quote: "As an early tester, I've been impressed by PeoChain's developer experience. The unified API abstracts away cross-chain complexity, and the subnet architecture offers unprecedented flexibility for building specialized applications."
    },
    {
      id: "t3",
      name: "Priya Sharma",
      role: "Fintech Advisor",
      company: "Future Finance Foundation",
      image: "/avatars/advisor.png",
      quote: "PeoChain's approach to regional stablecoins and mobile payment integration is exactly what's needed to drive blockchain adoption in emerging markets. The ultra-low fees make microtransactions viable for the first time."
    }
  ];

  const auditPartners: AuditPartner[] = [
    {
      id: "a1",
      name: "CertiK",
      logo: "/audit-logos/certik.svg",
      url: "https://www.certik.com"
    },
    {
      id: "a2",
      name: "Quantstamp",
      logo: "/audit-logos/quantstamp.svg",
      url: "https://quantstamp.com"
    },
    {
      id: "a3",
      name: "Trail of Bits",
      logo: "/audit-logos/trailofbits.svg",
      url: "https://www.trailofbits.com"
    }
  ];

  const socialLinks = [
    { icon: <SiDiscord className="h-6 w-6" />, label: "Discord", url: "https://discord.gg/peochain" },
    { icon: <SiTelegram className="h-6 w-6" />, label: "Telegram", url: "https://t.me/peochain" },
    { icon: <Twitter className="h-6 w-6" />, label: "Twitter", url: "https://twitter.com/peochain" },
    { icon: <Linkedin className="h-6 w-6" />, label: "LinkedIn", url: "https://linkedin.com/company/peochain" },
    { icon: <Github className="h-6 w-6" />, label: "GitHub", url: "https://github.com/peochain" }
  ];

  return (
    <section id="community" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title">
          Join the Community
        </h2>
        <p className="description max-w-2xl mx-auto text-lg">
          Connect with developers, researchers, and blockchain enthusiasts building the future of decentralized finance.
        </p>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h3 className="text-xl font-bold mb-8 text-center">What Early Testers Are Saying</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="glass hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    {/* Using placeholder for fallback - in production, you'd use the actual image */}
                    <AvatarImage src={testimonial.image} />
                  </Avatar>
                  <div className="ml-3">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-foreground/70">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
                
                <blockquote className="text-foreground/80 italic relative">
                  <span className="absolute -top-2 -left-2 text-4xl text-primary/20">"</span>
                  <p className="pl-4">{testimonial.quote}</p>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Security Audits */}
      <div className="mb-16">
        <div className="glass rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <div className="flex items-center mb-2">
                <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-bold">Security Audited & Verified</h3>
              </div>
              <p className="text-foreground/70 text-sm max-w-md">
                PeoChain's protocol undergoes rigorous security audits from leading blockchain security firms,
                ensuring the highest standards of protection for user assets and network integrity.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center">
              {auditPartners.map((partner) => (
                <div key={partner.id} className="flex flex-col items-center">
                  <div className="bg-white rounded-full p-3 h-16 w-16 flex items-center justify-center shadow-sm">
                    {/* In production, you'd use the actual logo */}
                    <div className="text-foreground/80 font-bold text-xs">{partner.name}</div>
                  </div>
                  <span className="text-xs mt-2 text-foreground/60">Audited</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="mb-16">
        <h3 className="text-xl font-bold mb-8 text-center">Connect With Us</h3>
        
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link, index) => (
            <Button
              key={index}
              variant="outline"
              className="glass hover:bg-primary/10 transition-colors"
              asChild
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <span className="mr-2 text-primary">{link.icon}</span>
                {link.label}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="glass rounded-3xl p-6 md:p-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-1">15K+</div>
            <div className="text-foreground/70">Community Members</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-1">500+</div>
            <div className="text-foreground/70">Active Developers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-1">30+</div>
            <div className="text-foreground/70">Countries Represented</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-1">12+</div>
            <div className="text-foreground/70">Research Publications</div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            Community-Driven Development
          </Badge>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            PeoChain development is guided by community feedback and governance. Join us in building the future of decentralized finance.
          </p>
        </div>
      </div>
    </section>
  );
}