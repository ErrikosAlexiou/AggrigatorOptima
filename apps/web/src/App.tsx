import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider as PolarisProvider, Frame, Navigation, TopBar } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import PricingPage from "./pages/Pricing";
import ContactPage from "./pages/Contact";
import SitemapPage from "./pages/Sitemap";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import DataPage from "./pages/Data";
import UploadPage from "./pages/Upload";
import ReportsPage from "./pages/Reports";
import AdminUsersPage from "./pages/AdminUsers";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NavigationMenu } from "./components/NavigationMenu";
import { PageLoader } from "./components/PageLoader";
import { AppTopBar } from "./components/AppTopBar";
import { MarketingLayout } from "./components/MarketingLayout";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/app/dashboard" replace />;
  return <>{children}</>;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <Frame navigation={<NavigationMenu />} topBar={<AppTopBar user={user} onLogout={logout} />}>
      {children}
    </Frame>
  );
};

const MarketingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MarketingLayout>{children}</MarketingLayout>
);

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <MarketingRoute>
          <HomePage />
        </MarketingRoute>
      }
    />
    <Route
      path="/about"
      element={
        <MarketingRoute>
          <AboutPage />
        </MarketingRoute>
      }
    />
    <Route
      path="/services"
      element={
        <MarketingRoute>
          <ServicesPage />
        </MarketingRoute>
      }
    />
    <Route
      path="/pricing"
      element={
        <MarketingRoute>
          <PricingPage />
        </MarketingRoute>
      }
    />
    <Route
      path="/contact"
      element={
        <MarketingRoute>
          <ContactPage />
        </MarketingRoute>
      }
    />
    <Route
      path="/sitemap"
      element={
        <MarketingRoute>
          <SitemapPage />
        </MarketingRoute>
      }
    />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route
      path="/app/dashboard"
      element={
        <ProtectedRoute>
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/app/data"
      element={
        <ProtectedRoute>
          <AppLayout>
            <DataPage />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/app/upload"
      element={
        <ProtectedRoute>
          <AppLayout>
            <UploadPage />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/app/reports"
      element={
        <ProtectedRoute>
          <AppLayout>
            <ReportsPage />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/app/admin/users"
      element={
        <AdminRoute>
          <AppLayout>
            <AdminUsersPage />
          </AppLayout>
        </AdminRoute>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => {
  return (
    <PolarisProvider i18n={enTranslations}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </PolarisProvider>
  );
};

export default App;
