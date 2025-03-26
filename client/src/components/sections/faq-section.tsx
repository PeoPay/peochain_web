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
    answer: "PEOCHAIN is a revolutionary economic platform built on DeFi technology! Our system directly increases your earning potential through income-generating features, affordable loans, and global market access. With seamless cross-chain compatibility, mobile-first accessibility, and decentralized lending solutions, PEOCHAIN transforms blockchain technology into practical tools for economic advancement."
  },
  {
    question: "What makes PEOCHAIN different from other DeFi platforms?",
    answer: "PEOCHAIN focuses on tangible economic benefits—our platform is designed to boost your income and business potential! At its core is our groundbreaking Proof of Synergy (PoSyg) consensus mechanism that rewards actual economic activity. With our system, small businesses and individuals earn meaningful income by contributing to the network, creating economic opportunities for people previously excluded from traditional finance."
  },
  {
    question: "What is Proof of Synergy (PoSyg)?",
    answer: "Proof of Synergy (PoSyg) is PEOCHAIN's income-generating engine! This innovative system rewards economic contribution rather than just capital size. Small entrepreneurs and individuals earn tokens through actual participation—validating transactions, supporting governance, and maintaining network security. PoSyg converts your blockchain participation into real income potential, making security profitable for everyone."
  },
  {
    question: "Can I access PEOCHAIN on my mobile device?",
    answer: "Yes, you can! PEOCHAIN is built with mobile-first accessibility, giving you income-generating opportunities anytime, anywhere. Whether you're at home, in the city, or on the move, PEOCHAIN puts economic tools in your pocket that can directly increase your earnings and business potential."
  },
  {
    question: "How does decentralized lending work on PEOCHAIN?",
    answer: "Say goodbye to expensive traditional loans! PEOCHAIN's decentralized lending lets small businesses access affordable capital while lenders earn competitive interest. Entrepreneurs can secure business loans without excessive collateral requirements, while those with capital can generate passive income by providing liquidity. Our platform turns lending into an economic growth engine for both sides of the transaction."
  },
  {
    question: "How does PEOCHAIN improve economic opportunities?",
    answer: "We're creating practical economic solutions for everyday people! PEOCHAIN focuses on three key areas: increasing earning potential through network participation rewards, enabling affordable business loans for entrepreneurs, and connecting small businesses to global markets they couldn't access before. Our technology bridges the economic gap, helping local businesses, gig workers, and small traders increase their income directly."
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
          Learn more about how PEOCHAIN creates real economic opportunities through blockchain innovation
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