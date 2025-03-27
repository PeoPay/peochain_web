import { Card, CardContent } from "@/components/ui/card";
import { WaitlistForm } from "@/components/ui/waitlist-form";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="px-4 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
      <Card className="glass rounded-3xl border-0 shadow-sm">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
              Early Access to Developer APIs and SDKs
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto text-lg">
              Join our developer community for priority access to PEOCHAIN's comprehensive API suite, developer toolkit, and technical documentation. Build the next generation of blockchain applications with our cutting-edge infrastructure.
            </p>
            <div className="bg-primary/10 rounded-xl p-4 mt-4 max-w-2xl mx-auto">
              <h3 className="text-primary font-medium text-lg mb-2">Developer Benefits</h3>
              <ul className="text-left grid md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Early API access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Technical documentation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Development sandbox</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Direct engineer support</span>
                </li>
              </ul>
            </div>
          </div>
          
          <WaitlistForm />
          
          <p className="text-center text-foreground/60 text-sm mt-8">
            We respect your privacy—your info stays safe with us.
          </p>
          
          <div className="mt-12 p-6 bg-primary/10 rounded-xl">
            <h4 className="text-center font-medium text-primary mb-3">Technical Resources for Developers</h4>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <h5 className="font-medium mb-2">API Documentation</h5>
                <p className="text-foreground/70">Comprehensive API references and integration guides</p>
              </div>
              <div className="text-center">
                <h5 className="font-medium mb-2">SDK Libraries</h5>
                <p className="text-foreground/70">Developer toolkits for JavaScript, Python, Rust and Go</p>
              </div>
              <div className="text-center">
                <h5 className="font-medium mb-2">Development Environment</h5>
                <p className="text-foreground/70">Local testnet setup and sandbox environment</p>
              </div>
              <div className="text-center">
                <h5 className="font-medium mb-2">Technical Support</h5>
                <p className="text-foreground/70">Direct access to PEOCHAIN's engineering team</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
