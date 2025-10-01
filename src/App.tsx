
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
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Posts from "./pages/admin/Posts";
import AdminEvents from "./pages/admin/Events";
import Pages from "./pages/admin/Pages";
import Categories from "./pages/admin/Categories";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Events from "./pages/Events";
import Kalender from "./pages/Kalender";

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
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/medlemskap" element={<Medlemskap />} />
              <Route path="/trosgrunnlag" element={<Trosgrunnlag />} />
              <Route path="/aktuelt" element={<Aktuelt />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/events" element={<Events />} />
            <Route path="/kalender" element={<Kalender />} />
            <Route path="/auth" element={<Auth />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><Dashboard /></AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/posts" element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><Posts /></AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/events" element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><AdminEvents /></AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/pages" element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><Pages /></AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/categories" element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><Categories /></AdminLayout>
                </ProtectedRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
