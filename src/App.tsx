
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Medlemskap from "./pages/Medlemskap";
import Trosgrunnlag from "./pages/Trosgrunnlag";
import Aktuelt from "./pages/Aktuelt";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Create a new context instance for react-helmet-async
const helmetContext = {};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider context={helmetContext}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/medlemskap" element={<Medlemskap />} />
          <Route path="/trosgrunnlag" element={<Trosgrunnlag />} />
          <Route path="/aktuelt" element={<Aktuelt />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
