import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WebsiteHeader from './components/WebsiteHeader';
import LoadingScreen from './components/LoadingScreen';

// ── Lazy-loaded pages ──────────────────────────────────────────────────────
const Intro         = lazy(() => import('./pages/Intro'));
const Dashboard     = lazy(() => import('./pages/Dashboard'));
const BookMachine   = lazy(() => import('./pages/BookMachine'));
const Settings      = lazy(() => import('./pages/Settings'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Calculate     = lazy(() => import('./pages/Calculate'));

// ── App ────────────────────────────────────────────────────────────────────
const App = () => (
  <Suspense fallback={<LoadingScreen />}>
    <WebsiteHeader />
    <Routes>
      {/* All routes */}
      <Route path="/"           element={<Intro />} />
      <Route path="/intro"      element={<Intro />} />
      <Route path="/dashboard"  element={<Dashboard />} />
      <Route path="/book"       element={<BookMachine />} />
      <Route path="/calculate"  element={<Calculate />} />
      <Route path="/settings"   element={<Settings />} />
      <Route path="/gallery"    element={<Navigate to="/#gallery" replace />} />
      <Route path="/about"      element={<Navigate to="/#about" replace />} />
      <Route path="/contact"    element={<Navigate to="/#contact" replace />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Fallback */}
      <Route path="*"   element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default App;

