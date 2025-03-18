# PeoChain DeFi Platform

A cutting-edge DeFi platform landing page for PeoChain, designed to demystify blockchain technology through intuitive design and interactive experiences.

## Project Overview

PeoChain is pioneering a decentralized financial revolution, empowering underbanked populations globally through cutting-edge blockchain innovation. Our platform combines the novel Proof of Synergy (PoSyg) consensus mechanism with Dynamic Contribution Scoring (DCS) to achieve unparalleled scalability, security, and accessibility.

## Features

- **Interactive Whitepaper**: Comprehensive documentation with visualizations
- **Responsive Design**: Mobile-first approach for accessibility
- **Data Visualization**: Advanced interactive blockchain diagrams
- **Waitlist System**: Referral-based waitlist program with analytics
- **Admin Dashboard**: Complete analytics overview for waitlist and referral tracking

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **Visualization**: Recharts for data charts, custom SVG animations

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/peochain-platform.git
   cd peochain-platform
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/peochain
   ```

4. Initialize the database:
   ```
   npm run db:push
   ```

5. Run the development server:
   ```
   npm run dev
   ```

## Project Structure

- `client/`: Frontend React application
  - `src/components/`: UI components
  - `src/pages/`: Application pages
  - `src/hooks/`: Custom React hooks
  - `src/lib/`: Utility functions and client configuration
- `server/`: Backend Express server
  - `routes.ts`: API endpoints
  - `storage.ts`: Database interaction layer
  - `db.ts`: Database connection
- `shared/`: Shared code between client and server
  - `schema.ts`: Drizzle ORM schema definitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Built with [React](https://reactjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Database ORM by [Drizzle](https://orm.drizzle.team/)