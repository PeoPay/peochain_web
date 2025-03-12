import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is PEOCHAIN?",
    answer: "PEOCHAIN is the future of decentralized finance (DeFi)! Built on innovation, inclusivity, and unparalleled security, it empowers individuals and businesses to thrive in a decentralized economy. With seamless cross-chain compatibility, mobile-first accessibility, and decentralized lending solutions, PEOCHAIN is rewriting the rules of finance!"
  },
  {
    question: "What makes PEOCHAIN different from other DeFi platforms?",
    answer: "PEOCHAIN is not just another DeFi platform—it's a movement! At its core is our groundbreaking Proof of Synergy (PoSyg) consensus mechanism, fostering trust and collaboration. Add to that seamless cross-chain compatibility, mobile-first design, and community-driven governance. PEOCHAIN isn't just accessible—it's transformative, making DeFi sustainable and empowering for all."
  },
  {
    question: "What is Proof of Synergy (PoSyg)?",
    answer: "Proof of Synergy (PoSyg) is the heart of PEOCHAIN, setting it apart from the rest! This innovative consensus mechanism champions trust, fairness, and collaboration. Ethical contributors and team players are rewarded, creating a vibrant, united community. PoSyg is more than technology—it's a movement of shared success!"
  },
  {
    question: "Can I access PEOCHAIN on my mobile device?",
    answer: "Yes, you can! PEOCHAIN is built with mobile-first accessibility, giving you the power of decentralized finance anytime, anywhere. Whether you're at home, in the city, or off the grid, PEOCHAIN puts financial freedom right in your pocket."
  },
  {
    question: "How does decentralized lending work on PEOCHAIN?",
    answer: "Say goodbye to traditional banking barriers! PEOCHAIN's decentralized lending lets you lend, borrow, and earn with flexibility and ease. Deposit assets to earn competitive interest or borrow instantly—all powered by secure blockchain technology. Financial freedom has never been this effortless!"
  },
  {
    question: "How does PEOCHAIN contribute to financial inclusion?",
    answer: "We're breaking barriers to build a more inclusive financial future! PEOCHAIN leverages fast, secure blockchain solutions to serve the underbanked, unlocking opportunities for the next billion users. With decentralized lending, cross-chain innovation, and mobile-first design, we're bridging the financial gap and empowering communities worldwide."
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="px-4 md:px-8 py-16 md:py-24 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          Learn more about how PEOCHAIN is revolutionizing decentralized finance
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-foreground/10 py-2">
            <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/70 text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="text-center mt-12">
        <a href="#waitlist" className="btn-gradient inline-block text-white font-medium py-3 px-8 rounded-full">
          Join the Waitlist
        </a>
      </div>
    </section>
  );
}