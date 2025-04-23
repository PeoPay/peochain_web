import express from 'express';
const app = express();
const port = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());

// Static files support
app.use(express.static('public'));

// Whitepaper page
app.get('/whitepaper', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PeoChain Whitepaper</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 20px;
        }
        h1 {
          color: #4a7c59;
        }
        h2 {
          color: #4a7c59;
          margin-top: 30px;
        }
        h3 {
          margin-top: 25px;
        }
        .abstract {
          font-style: italic;
          background: #f8f9fa;
          padding: 20px;
          border-left: 4px solid #4a7c59;
          margin: 20px 0;
        }
        .content {
          margin-bottom: 40px;
        }
        .diagram {
          background: #f1f1f1;
          padding: 20px;
          text-align: center;
          margin: 20px 0;
          border-radius: 5px;
        }
        .diagram p {
          color: #666;
          font-style: italic;
        }
        .back-btn {
          display: inline-block;
          background: #4a7c59;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          margin-top: 20px;
        }
        footer {
          margin-top: 40px;
          text-align: center;
          font-size: 0.9rem;
          color: #777;
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>PeoChain Whitepaper</h1>
        <p>Proof of Synergy: A Novel Consensus Mechanism for Educational Blockchain Networks</p>
        <p><em>Version 1.0.0 - April 2025</em></p>
      </header>
      
      <div class="abstract">
        <p>This whitepaper introduces PeoChain, a revolutionary blockchain platform designed specifically for educational purposes and community-driven knowledge sharing. At its core, PeoChain implements a novel consensus mechanism called "Proof of Synergy" (PoSyg) that rewards participants not only for computational contributions but for meaningful educational content creation, peer validation, and community engagement.</p>
      </div>
      
      <div class="content">
        <h2>1. Introduction</h2>
        <p>The blockchain landscape has been dominated by resource-intensive consensus mechanisms like Proof of Work and wealth-centric approaches like Proof of Stake. While these mechanisms have proven effective for certain applications, they fail to address the specific needs of educational communities and knowledge networks.</p>
        <p>PeoChain aims to fill this gap by introducing a blockchain architecture that prioritizes:</p>
        <ul>
          <li>Meaningful educational content creation and curation</li>
          <li>Collaborative verification and validation of information</li>
          <li>Equitable reward distribution based on contribution value rather than computational power or wealth</li>
          <li>Environmental sustainability through efficient resource utilization</li>
        </ul>
        
        <h2>2. Proof of Synergy (PoSyg)</h2>
        <p>Proof of Synergy is a multi-dimensional consensus mechanism that evaluates and rewards different types of contributions to the educational ecosystem:</p>
        
        <h3>2.1 Contribution Dimensions</h3>
        <ul>
          <li><strong>Content Creation:</strong> Original educational material, interactive modules, and learning resources</li>
          <li><strong>Validation:</strong> Peer review and verification of educational content accuracy</li>
          <li><strong>Engagement:</strong> Meaningful interactions, discussions, and community support</li>
          <li><strong>Technical Support:</strong> Network maintenance, development, and computational resources</li>
        </ul>
        
        <div class="diagram">
          <div>[Diagram: Proof of Synergy Multi-dimensional Scoring Model]</div>
          <p>Visual representation of how different contribution types are evaluated and weighted</p>
        </div>
        
        <h3>2.2 Synergy Score Calculation</h3>
        <p>Each participant's Synergy Score (SS) is calculated using a weighted formula:</p>
        <p><strong>SS = α(CC) + β(V) + γ(E) + δ(TS)</strong></p>
        <p>Where:</p>
        <ul>
          <li>CC = Content Creation score</li>
          <li>V = Validation score</li>
          <li>E = Engagement score</li>
          <li>TS = Technical Support score</li>
          <li>α, β, γ, and δ are dynamic weights adjusted by network conditions</li>
        </ul>
        
        <h2>3. Technical Architecture</h2>
        
        <h3>3.1 Network Topology</h3>
        <p>PeoChain utilizes a hybrid network architecture combining elements of DAG (Directed Acyclic Graph) for content relationships and traditional blockchain for transaction security.</p>
        
        <h3>3.2 Smart Contracts and Educational Tokens</h3>
        <p>The network employs specialized smart contracts for educational content licensing, credential verification, and automated reward distribution.</p>
        
        <h3>3.3 Scalability Solutions</h3>
        <p>To address scalability challenges, PeoChain implements:</p>
        <ul>
          <li>Sharding based on educational domains and content categories</li>
          <li>Layer-2 solutions for high-volume interactions</li>
          <li>Optimized storage for educational content with IPFS integration</li>
        </ul>
        
        <h2>4. Economic Model</h2>
        <p>The PeoChain ecosystem is powered by PEOTOKEN (PEO), which serves multiple functions:</p>
        <ul>
          <li>Rewards for valuable contributions</li>
          <li>Governance participation</li>
          <li>Access to premium educational resources</li>
          <li>Payment for specialized services within the ecosystem</li>
        </ul>
        
        <h2>5. Governance</h2>
        <p>PeoChain implements a novel governance model called "Education-Weighted Governance" where voting power is determined by a combination of contribution history, expertise validation, and token holdings.</p>
        
        <h2>6. Roadmap</h2>
        <ul>
          <li><strong>Phase 1 (Q2 2025):</strong> Mainnet launch with core PoSyg implementation</li>
          <li><strong>Phase 2 (Q4 2025):</strong> Educational content platform integration</li>
          <li><strong>Phase 3 (Q2 2026):</strong> Decentralized credential verification system</li>
          <li><strong>Phase 4 (Q4 2026):</strong> Cross-chain educational resource sharing</li>
        </ul>
        
        <h2>7. Conclusion</h2>
        <p>PeoChain represents a paradigm shift in how blockchain technology can be applied to educational systems. By valuing diverse forms of contribution and fostering a synergistic community approach, PeoChain creates a more equitable, sustainable, and education-focused blockchain ecosystem.</p>
      </div>
      
      <a href="/" class="back-btn">Back to Home</a>
      
      <footer>
        <p>&copy; ${new Date().getFullYear()} PeoChain. All rights reserved.</p>
        <p><small>This whitepaper is for informational purposes only and does not constitute financial advice.</small></p>
      </footer>
    </body>
    </html>
  `);
});

// Waitlist page
app.get('/waitlist', (req, res) => {
  const referralCode = req.query.ref || '';
  
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PeoChain Waitlist</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        header {
          text-align: center;
          margin-bottom: 30px;
        }
        h1 {
          color: #4a7c59;
        }
        .container {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        button {
          background: #4a7c59;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          width: 100%;
        }
        button:hover {
          background: #3a6249;
        }
        .success, .error {
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
          display: none;
        }
        .success {
          background: #d4edda;
          color: #155724;
        }
        .error {
          background: #f8d7da;
          color: #721c24;
        }
        .referral-section {
          margin-top: 30px;
          display: none;
        }
        .referral-link {
          padding: 10px;
          background: #e9ecef;
          border: 1px dashed #adb5bd;
          border-radius: 4px;
          font-family: monospace;
          margin: 10px 0;
        }
        .copy-btn {
          background: #6c757d;
          padding: 5px 10px;
          font-size: 14px;
          margin-top: 5px;
        }
        footer {
          margin-top: 40px;
          text-align: center;
          font-size: 0.9rem;
          color: #777;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Join the PeoChain Waitlist</h1>
        <p>Be among the first to experience the future of blockchain education.</p>
      </header>
      
      <div class="container">
        <div class="success" id="success-message"></div>
        <div class="error" id="error-message"></div>
        
        <form id="waitlist-form">
          <div class="form-group">
            <label for="email">Email Address*</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="name">Name (Optional)</label>
            <input type="text" id="name" name="name">
          </div>
          
          <input type="hidden" id="referral-code" name="referralCode" value="${referralCode}">
          
          <button type="submit">Join Waitlist</button>
        </form>
        
        <div class="referral-section" id="referral-section">
          <h3>Share your referral link</h3>
          <p>Invite friends to join PeoChain and earn exclusive rewards!</p>
          
          <div class="referral-link" id="referral-link"></div>
          
          <button class="copy-btn" onclick="copyReferralLink()">Copy Link</button>
        </div>
      </div>
      
      <footer>
        <p>&copy; ${new Date().getFullYear()} PeoChain. All rights reserved.</p>
      </footer>
      
      <script>
        document.getElementById('waitlist-form').addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const email = document.getElementById('email').value;
          const name = document.getElementById('name').value;
          const referralCode = document.getElementById('referral-code').value;
          
          try {
            const response = await fetch('/api/waitlist', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, name, referralCode })
            });
            
            const data = await response.json();
            
            if (response.ok) {
              // Show success message
              const successEl = document.getElementById('success-message');
              successEl.textContent = data.message;
              successEl.style.display = 'block';
              
              // Hide the form
              document.getElementById('waitlist-form').style.display = 'none';
              
              // Show referral section
              const referralSection = document.getElementById('referral-section');
              referralSection.style.display = 'block';
              
              // Set referral link
              const referralLink = document.getElementById('referral-link');
              const fullLink = window.location.origin + '/waitlist?ref=' + data.referralCode;
              referralLink.textContent = fullLink;
              
              // Store referral info
              localStorage.setItem('peochain_referral_code', data.referralCode);
              localStorage.setItem('peochain_position', data.position);
            } else {
              // Show error message
              const errorEl = document.getElementById('error-message');
              errorEl.textContent = data.error || 'An error occurred. Please try again.';
              errorEl.style.display = 'block';
            }
          } catch (error) {
            console.error('Error:', error);
            const errorEl = document.getElementById('error-message');
            errorEl.textContent = 'Network error. Please try again later.';
            errorEl.style.display = 'block';
          }
        });
        
        function copyReferralLink() {
          const referralLink = document.getElementById('referral-link').textContent;
          navigator.clipboard.writeText(referralLink)
            .then(() => {
              alert('Referral link copied to clipboard!');
            })
            .catch(err => {
              console.error('Failed to copy: ', err);
            });
        }
        
        // Check if user already has a referral code
        window.addEventListener('DOMContentLoaded', function() {
          const storedCode = localStorage.getItem('peochain_referral_code');
          const storedPosition = localStorage.getItem('peochain_position');
          
          if (storedCode && storedPosition) {
            // User already signed up
            document.getElementById('success-message').textContent = 
              'You are already on the waitlist at position #' + storedPosition;
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('waitlist-form').style.display = 'none';
            
            // Show referral section
            const referralSection = document.getElementById('referral-section');
            referralSection.style.display = 'block';
            
            // Set referral link
            const referralLink = document.getElementById('referral-link');
            const fullLink = window.location.origin + '/waitlist?ref=' + storedCode;
            referralLink.textContent = fullLink;
          }
        });
      </script>
    </body>
    </html>
  `);
});

// Home page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PeoChain DeFi Platform</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        header {
          text-align: center;
          margin-bottom: 40px;
        }
        h1 {
          color: #4a7c59;
          font-size: 2.5rem;
        }
        .intro {
          font-size: 1.2rem;
          margin-bottom: 30px;
        }
        .features {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .features h2 {
          color: #4a7c59;
        }
        .features ul {
          padding-left: 20px;
        }
        .features li {
          margin-bottom: 10px;
        }
        .btn {
          display: inline-block;
          background: #4a7c59;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          margin-right: 10px;
        }
        footer {
          margin-top: 40px;
          text-align: center;
          font-size: 0.9rem;
          color: #777;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>PeoChain DeFi Platform</h1>
        <p class="intro">A cutting-edge DeFi platform designed to transform blockchain education through interactive and engaging digital experiences.</p>
      </header>
      
      <div class="features">
        <h2>Key Features</h2>
        <ul>
          <li><strong>Dynamic Contribution Scoring</strong> - Reward community participants based on meaningful contributions</li>
          <li><strong>Scalable Architecture</strong> - Built to handle millions of users with a focus on performance</li>
          <li><strong>Educational Resources</strong> - Comprehensive learning modules for blockchain beginners and experts</li>
          <li><strong>Interactive Whitepaper</strong> - Dive deep into our innovative Proof of Synergy (PoSyg) consensus mechanism</li>
        </ul>
      </div>
      
      <div class="cta">
        <a href="/whitepaper" class="btn">Read Whitepaper</a>
        <a href="/waitlist" class="btn">Join Waitlist</a>
      </div>
      
      <footer>
        <p>&copy; ${new Date().getFullYear()} PeoChain. All rights reserved.</p>
      </footer>
    </body>
    </html>
  `);
});

// Start server ASAP
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

// This is now just a simple server to satisfy the port check
// We will keep this server running instead of trying to start the main one
console.log('Simple server ready - Replit workflow should detect it now');
console.log('Access the application at: https://REPLNAME.replit.app');

// Add API endpoints
app.get('/api/info', (req, res) => {
  res.json({
    name: 'PeoChain DeFi Platform',
    version: '1.0.0',
    description: 'A cutting-edge DeFi platform for blockchain education',
    consensus: 'Proof of Synergy (PoSyg)',
    features: [
      'Dynamic Contribution Scoring',
      'Scalable Architecture',
      'Educational Resources',
      'Interactive Whitepaper'
    ]
  });
});

// Simple in-memory storage for waitlist (temporary)
const waitlistEntries = [];

// Waitlist API endpoint
app.post('/api/waitlist', (req, res) => {
  const { email, name, referralCode } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  // Check if email already exists
  const existingEntry = waitlistEntries.find(entry => entry.email === email);
  if (existingEntry) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  
  // Create new entry
  const newEntry = {
    id: waitlistEntries.length + 1,
    email,
    name: name || '',
    referralCode: referralCode || '',
    createdAt: new Date().toISOString(),
    position: waitlistEntries.length + 1,
    referralCount: 0,
    ownReferralCode: generateReferralCode(email)
  };
  
  waitlistEntries.push(newEntry);
  
  res.status(201).json({
    success: true,
    message: 'Successfully joined the waitlist!',
    position: newEntry.position,
    referralCode: newEntry.ownReferralCode
  });
});

// Get referral info
app.get('/api/referral/:code', (req, res) => {
  const { code } = req.params;
  
  const entry = waitlistEntries.find(e => e.ownReferralCode === code);
  
  if (!entry) {
    return res.status(404).json({ error: 'Referral code not found' });
  }
  
  res.json({
    referrerName: entry.name || 'A PeoChain community member',
    referralCount: entry.referralCount
  });
});

// Simple referral code gefunction generateReferralCode(email) {
  const base = email.split('@')[0].substring(0, 5).toUpperCase();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${base}-${random}`;
}dom}`;
}