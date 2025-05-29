
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./components/layouts/PublicLayout";
import AdminLayout from "./components/layouts/AdminLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TablesPage from "./pages/TablesPage";
import ReservationsPage from "./pages/ReservationsPage";
import SettingsPage from "./pages/SettingsPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import PublicReservationPage from "./pages/PublicReservationPage";
import MenuPage from "./pages/MenuPage";
import OrdersPage from "./pages/OrdersPage";
import PublicMenuPage from "./pages/PublicMenuPage";
import FinancesPage from "./pages/FinancesPage";
import NotFound from "./pages/NotFound";
import PrintOrdersPage from './pages/PrintOrdersPage';

// Create QueryClient with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/r/:restaurantSlug" element={<PublicReservationPage />} />
            <Route path="/r/:restaurantSlug/cardapio" element={<PublicMenuPage />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="tables" element={<TablesPage />} />
              <Route path="reservations" element={<ReservationsPage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="print-orders" element={<PrintOrdersPage />} />
              <Route path="finances" element={<FinancesPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="subscription" element={<SubscriptionPage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
