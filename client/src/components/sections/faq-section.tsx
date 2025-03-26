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
    answer: "PEOCHAIN is an advanced blockchain architecture designed to overcome fundamental limitations of existing blockchain networks. With innovative subnetting, layer-2 scaling solutions, and our proprietary consensus mechanism, PEOCHAIN delivers enterprise-grade performance (100,000+ TPS) with uncompromising security and decentralization."
  },
  {
    question: "What core blockchain problems does PEOCHAIN solve?",
    answer: "PEOCHAIN solves scalability, security, and decentralization issues simultaneously using advanced techniques like subnetting, PoSyg, and Zero-Knowledge proofs. Our architecture breaks through the 'blockchain trilemma' that has constrained other platforms."
  },
  {
    question: "How does PoSyg improve over traditional consensus algorithms?",
    answer: "PoSyg combines the efficiency of PoS with additional layers of security and decentralized consensus—delivering secure validation without the centralization risks or environmental costs of older blockchain technologies. It enables high throughput while maintaining robust Byzantine Fault Tolerance."
  },
  {
    question: "What makes PEOCHAIN different from other blockchain platforms?",
    answer: "PEOCHAIN's technical advantage comes from our innovative subnet validator network architecture, Zero-Knowledge implementation, and Proof of Synergy consensus. Together, these technologies enable 1-second finality with throughput exceeding 100,000 TPS while maintaining truly decentralized operation and military-grade security."
  },
  {
    question: "Is PEOCHAIN just for finance or broader applications?",
    answer: "While initially optimized for decentralized finance, PEOCHAIN's architecture supports numerous sectors like supply-chain, healthcare, and identity management. Our technical foundation is designed to be versatile and adaptable to any enterprise or application requiring high-performance, secure blockchain infrastructure."
  },
  {
    question: "How does PEOCHAIN handle interoperability with other blockchains?",
    answer: "PEOCHAIN implements advanced cross-chain bridges and communication protocols that enable seamless asset and data transfers between different blockchain networks. Our architecture supports both native cross-chain operations and integration with industry-standard bridge solutions, creating a truly interconnected blockchain ecosystem."
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
          Learn more about PEOCHAIN's revolutionary blockchain technology and architecture
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
          Join Our Tech Pioneer Program
        </a>
      </div>
    </section>
  );
}