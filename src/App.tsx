
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./lib/i18n/LanguageContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Medlemskap from "./pages/Medlemskap";
import Trosgrunnlag from "./pages/Trosgrunnlag";
import Aktuelt from "./pages/Aktuelt";
import Temagrupper from "./pages/Temagrupper";
import Auth from "./pages/Auth";
import MemberLogin from "./pages/MemberLogin";
import MemberOverview from "./pages/MemberOverview";
import MemberProfile from "./pages/MemberProfile";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Posts from "./pages/admin/Posts";
import AdminEvents from "./pages/admin/Events";
import Pages from "./pages/admin/Pages";
import Categories from "./pages/admin/Categories";
import Members from "./pages/admin/Members";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Events from "./pages/Events";
import Kalender from "./pages/Kalender.tsx";
import BliMedlem from "./pages/BliMedlem";
import Betaling from "./pages/Betaling";
import Personvern from "./pages/Personvern";
import Vilkar from "./pages/Vilkar";

const queryClient = new QueryClient();

// Create a new context instance for react-helmet-async
const helmetContext = {};

// Shared routes used for both Norwegian (default) and English (/en) prefixes
const AppRoutes = () => (
  <Routes>
    {/* Norwegian routes (default) */}
    <Route path="/" element={<Index />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="/medlemskap" element={<Medlemskap />} />
    <Route path="/trosgrunnlag" element={<Trosgrunnlag />} />
    <Route path="/aktuelt" element={<Aktuelt />} />
    <Route path="/temagrupper" element={<Temagrupper />} />
    <Route path="/blogg" element={<Blog />} />
    <Route path="/blogg/:slug" element={<BlogPost />} />
    <Route path="/events" element={<Events />} />
    <Route path="/kalender" element={<Kalender />} />
    <Route path="/bli-medlem" element={<BliMedlem />} />
    <Route path="/betaling" element={<Betaling />} />
    <Route path="/personvern" element={<Personvern />} />
    <Route path="/vilkar" element={<Vilkar />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/medlem-login" element={<MemberLogin />} />
    <Route path="/medlem" element={<ProtectedRoute><MemberOverview /></ProtectedRoute>} />
    <Route path="/medlem/profil" element={<ProtectedRoute><MemberProfile /></ProtectedRoute>} />

    {/* English routes */}
    <Route path="/en" element={<Index />} />
    <Route path="/en/contact" element={<Contact />} />
    <Route path="/en/about" element={<About />} />
    <Route path="/en/membership" element={<Medlemskap />} />
    <Route path="/en/faith" element={<Trosgrunnlag />} />
    <Route path="/en/news" element={<Aktuelt />} />
    <Route path="/en/theme-groups" element={<Temagrupper />} />
    <Route path="/en/blog" element={<Blog />} />
    <Route path="/en/blog/:slug" element={<BlogPost />} />
    <Route path="/en/events" element={<Events />} />
    <Route path="/en/calendar" element={<Kalender />} />
    <Route path="/en/join" element={<BliMedlem />} />
    <Route path="/en/payment" element={<Betaling />} />
    <Route path="/en/privacy" element={<Personvern />} />
    <Route path="/en/terms" element={<Vilkar />} />
    <Route path="/en/auth" element={<Auth />} />
    <Route path="/en/member-login" element={<MemberLogin />} />
    <Route path="/en/member" element={<ProtectedRoute><MemberOverview /></ProtectedRoute>} />
    <Route path="/en/member/profile" element={<ProtectedRoute><MemberProfile /></ProtectedRoute>} />
      
    {/* Admin Routes (no English version) */}
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
    <Route path="/admin/members" element={
      <ProtectedRoute requireAdmin>
        <AdminLayout><Members /></AdminLayout>
      </ProtectedRoute>
    } />
    
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider context={helmetContext}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <LanguageProvider>
              <ScrollToTopOnNavigate />
              <AppRoutes />
            </LanguageProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
