import React, { useEffect, useState } from 'react';
import './index.css';

interface PlatformInfo {
  name: string;
  version: string;
  description: string;
  consensus: string;
  features: string[];
}

function App() {
  const [info, setInfo] = useState<PlatformInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch('/api/info');
        if (!response.ok) {
          throw new Error('Failed to fetch platform info');
        }
        const data = await response.json();
        setInfo(data);
      } catch (err) {
        setError('Error loading platform data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  if (loading) {
    return <div className="loading">Loading PeoChain platform...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>{info?.name}</h1>
        <p className="version">Version {info?.version}</p>
      </header>
      
      <main>
        <section className="hero">
          <h2>Welcome to the Future of DeFi</h2>
          <p className="description">{info?.description}</p>
          <div className="cta">
            <button className="primary-button">Join Waitlist</button>
            <button className="secondary-button">View Whitepaper</button>
          </div>
        </section>

        <section className="features">
          <h2>Platform Features</h2>
          <div className="feature-grid">
            {info?.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="consensus">
          <h2>Consensus Mechanism</h2>
          <p>{info?.consensus}</p>
          <p>Our novel approach to blockchain consensus brings together security, 
          scalability, and accessibility.</p>
        </section>
      </main>

      <footer>
        <p>© 2025 PeoChain. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;