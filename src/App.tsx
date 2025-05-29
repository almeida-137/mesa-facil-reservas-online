import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

// Import pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminDashboard from '@/pages/AdminDashboard';
import DashboardPage from '@/pages/DashboardPage';
import TablesPage from '@/pages/TablesPage';
import ReservationsPage from '@/pages/ReservationsPage';
import MenuPage from '@/pages/MenuPage';
import OrdersPage from '@/pages/OrdersPage';
import FinancesPage from '@/pages/FinancesPage';
import SubscriptionPage from '@/pages/SubscriptionPage';
import SettingsPage from '@/pages/SettingsPage';
import PrintOrdersPage from '@/pages/PrintOrdersPage';
import PublicMenuPage from '@/pages/PublicMenuPage';
import PublicReservationPage from '@/pages/PublicReservationPage';
import NotFound from '@/pages/NotFound';

import '@/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/menu" element={<PublicMenuPage />} />
            <Route path="/reserva" element={<PublicReservationPage />} />
            
            {/* Protected admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="tables" element={<TablesPage />} />
              <Route path="reservations" element={<ReservationsPage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="print" element={<PrintOrdersPage />} />
              <Route path="finances" element={<FinancesPage />} />
              <Route path="subscription" element={<SubscriptionPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
