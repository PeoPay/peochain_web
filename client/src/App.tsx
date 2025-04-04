import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Whitepaper from "@/pages/Whitepaper";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/privacy-policy" component={PrivacyPolicy}/>
      <Route path="/terms-of-service" component={TermsOfService}/>
      <Route path="/whitepaper" component={Whitepaper}/>
      <Route component={NotFound} />
    </Switch>
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
