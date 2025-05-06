import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load components for code splitting
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const Whitepaper = lazy(() => import("@/pages/Whitepaper"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const CrossChainDemo = lazy(() => import("@/pages/CrossChainDemo"));
const DesignSystem = lazy(() => import("@/pages/DesignSystem"));
const PeoPay = lazy(() => import("@/pages/PeoPay"));

// Loading component to display while page chunks are being loaded
const PageLoader = () => (
  <div className="w-full h-screen flex flex-col items-center justify-center p-8">
    <div className="space-y-4 w-full max-w-md">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-80 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/privacy-policy" component={PrivacyPolicy}/>
        <Route path="/terms-of-service" component={TermsOfService}/>
        <Route path="/whitepaper" component={Whitepaper}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/cross-chain-demo" component={CrossChainDemo}/>
        <Route path="/design-system" component={DesignSystem}/>
        <Route path="/peopay" component={PeoPay}/>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
