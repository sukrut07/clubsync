import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import MemberDashboard from './pages/MemberDashboard';
import ClubPage from './pages/ClubPage';
import EventPage from './pages/EventPage';
import CreateEvent from './pages/CreateEvent';
import RegisterEvent from './pages/RegisterEvent';
import Leaderboard from './pages/Leaderboard';
import Announcements from './pages/Announcements';
import ClubsPage from './pages/ClubsPage';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import DemoPage from './pages/DemoPage';
import DashboardLayout from './components/DashboardLayout';
import './index.css';

// Protected Route with DashboardLayout choice
const ProtectedRoute = ({ children, roles, useLayout = true }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'member') return <Navigate to="/member" replace />;
    return <Navigate to="/events" replace />;
  }

  return useLayout ? <DashboardLayout>{children}</DashboardLayout> : children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={user ? (user.role === 'admin' ? <Navigate to="/admin" /> : (user.role === 'member' ? <Navigate to="/member" /> : <Navigate to="/events" />)) : <LoginPage />} />
      <Route path="/signup" element={user ? (user.role === 'admin' ? <Navigate to="/admin" /> : (user.role === 'member' ? <Navigate to="/member" /> : <Navigate to="/events" />)) : <SignupPage />} />

      {/* SaaS Dashboards (Wrapped in Sidebar) */}
      <Route path="/dashboard" element={
        <ProtectedRoute roles={['student']}>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/member" element={
        <ProtectedRoute roles={['member']}>
          <MemberDashboard />
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute roles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* Global SaaS Pages */}
      <Route path="/clubs" element={<ClubsPage />} />
      <Route path="/events" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />

      {/* Extra Misc */}
      <Route path="/events/create" element={
        <ProtectedRoute roles={['admin', 'member']}>
          <CreateEvent />
        </ProtectedRoute>
      } />

      <Route path="/events/register" element={
        <ProtectedRoute>
          <RegisterEvent />
        </ProtectedRoute>
      } />

      <Route path="/demo" element={<DemoPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;