import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function TermsOfService() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-center">
        <Link href="/">
          <Button variant="outline" className="mr-4">
            &larr; Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Terms of Service</h1>
      </div>

      <div className="prose max-w-none dark:prose-invert">
        <p className="text-lg">Effective Date: March, 2025</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          Welcome to PEOCHAIN. By accessing or using our website, platform, or services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
        </p>
        
        <h2>2. Services Description</h2>
        <p>
          PEOCHAIN is a blockchain platform that provides decentralized finance (DeFi) services, including but not limited to lending, borrowing, and other financial services built on blockchain technology.
        </p>
        
        <h2>3. Eligibility</h2>
        <p>
          You must be at least 18 years old and capable of forming a legally binding contract to use our services. By using our services, you represent and warrant that you meet these requirements.
        </p>
        
        <h2>4. Account Registration</h2>
        <p>
          To access certain features of our platform, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
        </p>
        
        <h2>5. User Responsibilities</h2>
        <p>As a user of our services, you agree to:</p>
        <ul>
          <li>Comply with all applicable laws and regulations</li>
          <li>Maintain the security of your account credentials</li>
          <li>Accept responsibility for all activities that occur under your account</li>
          <li>Not use our services for any illegal or unauthorized purpose</li>
          <li>Not engage in any activity that disrupts or interferes with our services</li>
        </ul>
        
        <h2>6. Intellectual Property Rights</h2>
        <p>
          All content, features, and functionality of our platform, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are owned by PEOCHAIN or its licensors and are protected by intellectual property laws.
        </p>
        
        <h2>7. Financial Risks</h2>
        <p>
          Using blockchain-based financial services involves significant risks, including but not limited to price volatility, liquidity risks, technical risks, and regulatory uncertainties. You acknowledge and accept these risks when using our services.
        </p>
        
        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, PEOCHAIN shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
        </p>
        
        <h2>9. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on our website. Your continued use of our services after such modifications constitutes your acceptance of the modified Terms.
        </p>
        
        <h2>10. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
        </p>
        
        <h2>11. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
        </p>
        
        <h2>12. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at legal@peochain.xyz.
        </p>
      </div>
    </div>
  );
}