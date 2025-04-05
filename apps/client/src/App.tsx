import React from 'react';
import { Route, Switch } from 'wouter';
import { Toaster } from '@/components/ui/toaster';

import HomePage from '@/pages/home';
import WaitlistPage from '@/pages/waitlist';
import AboutPage from '@/pages/about';
import Layout from '@/components/Layout';

export default function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/waitlist" component={WaitlistPage} />
          <Route path="/about" component={AboutPage} />
          <Route>
            <div className="container flex flex-col items-center justify-center h-[80vh]">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
              <a href="/" className="text-primary hover:underline">Go back home</a>
            </div>
          </Route>
        </Switch>
      </Layout>
      <Toaster />
    </>
  );
}