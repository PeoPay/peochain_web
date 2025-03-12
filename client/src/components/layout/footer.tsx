import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="px-4 md:px-8 py-12 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-foreground font-poppins font-bold text-2xl mb-4">
              PEO<span className="text-primary">CHAIN</span>
            </div>
            <p className="text-foreground/70 mb-6 max-w-md">
              Where traditional banking barriers vanish, and financial empowerment begins! Lend, borrow, and earn like never before.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Discord">
                <i className="ri-discord-fill text-xl"></i>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Telegram">
                <i className="ri-telegram-fill text-xl"></i>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Medium">
                <i className="ri-medium-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4 text-foreground">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Tokenomics</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-foreground/10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PEOCHAIN. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
        
        <div className="mt-8 p-4 rounded-lg bg-primary/5 text-center">
          <p className="text-foreground/80 text-sm">
            The next billion users are counting on this. Be part of something bigger—PEOCHAIN Lending launches soon.
          </p>
        </div>
      </div>
    </footer>
  );
}
