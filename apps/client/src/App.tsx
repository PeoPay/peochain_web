import React from 'react';

// Create temporary placeholder components until we fix the import paths
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">PeoChain</h1>
        <nav className="mt-2">
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/waitlist" className="hover:underline">Waitlist</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <main className="container mx-auto p-4">{children}</main>
    <footer className="bg-secondary text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} PeoChain. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

// Placeholder page components
const HomePage = () => (
  <div className="max-w-4xl mx-auto py-12">
    <h1 className="text-4xl font-bold mb-6">Welcome to PeoChain</h1>
    <p className="text-xl mb-8">
      The next generation blockchain platform for decentralized applications.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Fast & Secure</h2>
        <p>Experience lightning-fast transactions with military-grade security.</p>
      </div>
      <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Easy to Use</h2>
        <p>Built with developers and users in mind for a seamless experience.</p>
      </div>
    </div>
  </div>
);

const WaitlistPage = () => (
  <div className="max-w-md mx-auto py-12">
    <h1 className="text-3xl font-bold mb-6">Join Our Waitlist</h1>
    <p className="mb-6">Be the first to know when we launch!</p>
    <form className="space-y-4">
      <div>
        <label className="block mb-1">Full Name</label>
        <input type="text" className="w-full p-2 border rounded" placeholder="John Doe" />
      </div>
      <div>
        <label className="block mb-1">Email Address</label>
        <input type="email" className="w-full p-2 border rounded" placeholder="john@example.com" />
      </div>
      <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90">
        Join Waitlist
      </button>
    </form>
  </div>
);

const AboutPage = () => (
  <div className="max-w-3xl mx-auto py-12">
    <h1 className="text-3xl font-bold mb-6">About PeoChain</h1>
    <p className="mb-4">
      PeoChain is a cutting-edge blockchain platform designed to revolutionize how 
      decentralized applications are built and deployed.
    </p>
    <p className="mb-4">
      Our mission is to make blockchain technology accessible, secure, and efficient for everyone.
    </p>
    <p className="mb-4">
      Founded in 2023, we're a team of passionate blockchain enthusiasts and technology experts 
      dedicated to creating the future of decentralized infrastructure.
    </p>
  </div>
);

export default function App() {
  return (
    <>
      <Layout>
        <div className="py-4">
          <h2 className="text-2xl font-bold text-center mb-8">PeoChain Monorepo Demo</h2>
          <HomePage />
        </div>
      </Layout>
    </>
  );
}