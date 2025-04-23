import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-center">
        <Link href="/">
          <Button variant="outline" className="mr-4">
            &larr; Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
      </div>

      <div className="prose max-w-none dark:prose-invert">
        <p className="text-lg">Effective Date: March, 2025</p>
        
        <h2>1. Introduction</h2>
        <p>
          Welcome to PEOCHAIN ("we," "our," or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our platform, or interact with our services.
        </p>
        
        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, and other contact details you provide when signing up for our waitlist or creating an account.</li>
          <li><strong>Usage Data:</strong> Information about how you use our website and services, including IP address, browser type, pages visited, and time spent on our platform.</li>
          <li><strong>Blockchain Information:</strong> Public blockchain addresses and transaction data when you use our DeFi services.</li>
        </ul>
        
        <h2>3. How We Use Your Information</h2>
        <p>We may use the information we collect for various purposes, including to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and manage your account</li>
          <li>Send you updates, newsletters, and marketing communications</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Monitor and analyze trends, usage, and activities</li>
          <li>Detect, prevent, and address technical issues</li>
          <li>Comply with legal obligations</li>
        </ul>
        
        <h2>4. Data Sharing and Disclosure</h2>
        <p>We may share your information with:</p>
        <ul>
          <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf</li>
          <li><strong>Business Partners:</strong> Companies we partner with to offer integrated services</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
        </ul>
        
        <h2>5. Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
        
        <h2>6. Your Choices</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Object to certain processing of your information</li>
        </ul>
        
        <h2>7. International Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your country of residence, which may have different data protection laws.
        </p>
        
        <h2>8. Children's Privacy</h2>
        <p>
          Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
        </p>
        
        <h2>9. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.
        </p>
        
        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@peochain.xyz.
        </p>
      </div>
    </div>
  );
}