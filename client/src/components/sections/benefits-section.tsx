import { Card, CardContent } from "@/components/ui/card";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: "ri-coins-line",
    title: "Zero-Fee Transactions",
    description: "Early adopters will receive zero-fee transactions for the first three months after launch."
  },
  {
    icon: "ri-vip-crown-line",
    title: "Priority Access",
    description: "Be the first to experience new features and products before they're available to the general public."
  },
  {
    icon: "ri-token-swap-line",
    title: "Exclusive Token Allocation",
    description: "Waitlist members will receive an exclusive allocation of PEOCHAIN tokens during our initial offering."
  },
  {
    icon: "ri-customer-service-2-line",
    title: "Dedicated Support",
    description: "Early adopters get access to a dedicated support channel for personalized assistance."
  }
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <Card className="glass rounded-3xl border-0 shadow-sm relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        
        <CardContent className="p-8 md:p-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
              Early Bird Benefits
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
              Early birds get exclusive perks—don't wait for the future, shape it with us! Join our waitlist today.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/40 rounded-2xl p-6 flex items-start">
                <div className="bg-primary/10 p-3 rounded-xl mr-4">
                  <i className={`${benefit.icon} text-2xl text-primary`}></i>
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-xl mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-foreground/70">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex flex-col gap-4 items-center">
            <div className="p-4 rounded-lg bg-primary/5 max-w-2xl">
              <h4 className="font-medium text-lg mb-2 text-center">Security Is Our Priority</h4>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="md:w-1/2">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <i className="ri-shield-check-line text-primary mt-1"></i>
                      <span className="text-sm">Regular security audits by leading blockchain security firms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-shield-check-line text-primary mt-1"></i>
                      <span className="text-sm">Multi-sig wallet technology protects user funds</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <i className="ri-shield-check-line text-primary mt-1"></i>
                      <span className="text-sm">Insurance fund to protect against unforeseen events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-shield-check-line text-primary mt-1"></i>
                      <span className="text-sm">Open-source code with community security reviews</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <a 
              href="#waitlist" 
              className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 mt-4 rounded-full inline-block"
            >
              Join Waitlist Now
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
