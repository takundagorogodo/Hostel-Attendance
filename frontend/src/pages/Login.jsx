import { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/api.js';
import GlassCard from '../components/GlassCard.jsx';
import NeumorphicButton from '../components/NeumorphicButton.jsx';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Mock login for demo; replace with axios call to /api/auth/login
      const mockUser = {
        username: form.username || 'admin',
        role: form.username?.toLowerCase().includes('ward') ? 'warden' : form.username?.toLowerCase().includes('stud') ? 'student' : 'admin',
        token: 'mock-jwt-token-123',
      };
      login(mockUser);
      setAuthToken(mockUser.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <GlassCard className="w-full max-w-md relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-[#6366f1]/30 to-[#818cf8]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-[#818cf8]/30 to-[#6366f1]/30 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#818cf8] flex items-center justify-center shadow-glass">
              <Lock size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight font-display text-[#1a1a2e] dark:text-white">Hostel Pro</h2>
              <p className="text-xs text-[#777] dark:text-[#999]">Attendance & Management</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-2">Sign In</h3>
          <p className="text-sm text-[#777] dark:text-[#999] mb-6">Enter your credentials to access the dashboard</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]" />
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 transition placeholder:text-[#999]"
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]" />
              <input
                type={show ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-11 pr-11 py-3 rounded-2xl bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 transition placeholder:text-[#999]"
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777] hover:text-[#1a1a2e] dark:hover:text-white" aria-label="Toggle visibility">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            <NeumorphicButton type="submit" disabled={loading} className="w-full mt-2">
              {loading ? 'Signing In...' : 'Sign In'}
            </NeumorphicButton>
          </form>
        </div>
      </GlassCard>
    </div>
  );
}