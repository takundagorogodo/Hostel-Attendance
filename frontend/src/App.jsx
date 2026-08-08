import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import PageTransition from './components/PageTransition.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Attendance from './pages/Attendance.jsx';
import Reports from './pages/Reports.jsx';
import Students from './pages/Students.jsx';
import Rooms from './pages/Rooms.jsx';
import Profile from './pages/Profile.jsx';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/dashboard" element={<ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
            <Route path="/attendance" element={<ProtectedRoute><PageTransition><Attendance /></PageTransition></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><PageTransition><Reports /></PageTransition></ProtectedRoute>} />
            <Route path="/students" element={<ProtectedRoute><PageTransition><Students /></PageTransition></ProtectedRoute>} />
            <Route path="/rooms" element={<ProtectedRoute><PageTransition><Rooms /></PageTransition></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><PageTransition><Profile /></PageTransition></ProtectedRoute>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;