import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Admin components
import AdminLayout from './components/AdminLayout';
import DashboardOverview from './components/DashboardOverview';
import PrintQueue from './components/PrintQueue';
import AdminDashboard from './components/AdminDashboard';

// Customer-facing components
import PrintingPage from './components/PrintingPage';
import LoginPage from './components/LoginPage';

// Auth context
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import PaymentSuccessPage from './components/PaymentSuccessPage';
import PaymentStatus from './components/PaymentStatus';
import OrderDetailsPage from './components/OrderDetailsPage';
import Footer from './components/Footer';
import Header from './components/Header';
import TrackOrderPage from './components/TrackOrderPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Protected route component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Layout component to wrap public routes
const PublicLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col transition-colors duration-300">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes with layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/print" element={<PrintingPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/payment-failed" element={<PaymentStatus />} />
            <Route path="/payment-error" element={<PaymentStatus />} />
            <Route path="/order/:orderNumber" element={<OrderDetailsPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
          </Route>
          
          {/* Login page (might need different layout) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin routes - protected */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverview />} />
            <Route path="print-queue" element={<PrintQueue />} />
            <Route path="orders" element={<AdminDashboard />} />
            <Route path="orders/:orderNumber" element={<AdminDashboard />} />
            <Route path="statistics" element={<DashboardOverview />} />
            <Route path="settings" element={<div className="p-8 text-white">Settings page coming soon</div>} />
          </Route>
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;