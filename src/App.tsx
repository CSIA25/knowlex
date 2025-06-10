import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ContactPage from "./pages/ContactPage";
import MediaPage from "./pages/MediaPage";
import ServicesPage from "./pages/ServicesPage";
import TeacherServicesPage from "./pages/TeacherServicesPage";
import InstitutionalServicesPage from "./pages/InstitutionalServicesPage";
import EventsPage from "./pages/EventsPage";
import PaymentPage from "./pages/PaymentPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/teachers" element={<TeacherServicesPage />} />
            <Route path="/services/institutions" element={<InstitutionalServicesPage />} />
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/events" element={<EventsPage />} />
            
            {/* User Dashboard - Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Admin Dashboard - Protected for Admins */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
          
          {/* Auth routes without Navbar/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Catch-all Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;