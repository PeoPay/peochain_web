import { Router } from 'express';
import { db } from './db';

// Initialize router
export const apiRoutes = Router();

// Platform info
apiRoutes.get('/info', async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error fetching info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Waitlist signup
apiRoutes.post('/waitlist', async (req, res) => {
  try {
    const { email, name, referralCode } = req.body;
    
    // TODO: Add validation and store in database
    
    res.status(201).json({ 
      success: true, 
      message: 'Successfully joined the waitlist' 
    });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});