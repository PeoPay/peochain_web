import { ArrowRight } from "lucide-react";

export default function WhyItMattersSection() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="bg-primary/5 rounded-3xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-6 text-center">
            Why It Matters
          </h2>
          
          <p className="text-foreground/90 text-xl md:text-2xl text-center leading-relaxed mb-8">
            PEOCHAIN isn't just an incremental improvement; it's a radical technological leap forward. By solving blockchain's core limitations, we unlock entirely new possibilities for decentralized applications, financial services, and large-scale adoption previously impossible.
          </p>
          
          <div className="flex justify-center">
            <a href="#waitlist" className="flex items-center text-primary hover:text-primary/80 font-medium text-lg transition-colors">
              <span>Join the Revolution</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}