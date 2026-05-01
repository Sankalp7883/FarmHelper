import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields'); return; }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! 🌱');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Login failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);
      toast.success('Welcome! 🌱');
      navigate('/');
    } catch (err) {
      toast.error('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="auth-page" id="login-page">
      <div className="auth-container">
        {/* Left — Visual Panel with agriculture image */}
        <div className="auth-visual">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
            alt="Beautiful golden wheat field at sunset"
            className="auth-visual-img"
          />
          <div className="auth-visual-overlay" />
          <div className="auth-visual-brand">
            <span>🌾</span>
            <span>FarmHelper</span>
          </div>
          <div className="auth-visual-content">
            <h2 className="auth-visual-tagline">
              Grow Smarter,<br />Harvest Better
            </h2>
            <p className="auth-visual-subtitle">
              Data-driven crop recommendations powered by real-time weather and soil analysis.
            </p>
            <div className="auth-visual-dots">
              <div className="auth-visual-dot" />
              <div className="auth-visual-dot active" />
              <div className="auth-visual-dot" />
            </div>
          </div>
        </div>

        {/* Right — Form Panel */}
        <div className="auth-form-panel">
          <h1 className="auth-heading">Welcome back</h1>
          <p className="auth-subheading">
            Don't have an account? <Link to="/signup" id="signup-link">Sign up</Link>
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <div className="input-with-icon">
                <input
                  id="login-password"
                  className="form-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-icon-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} id="login-submit-btn">
              {loading ? (
                <><div className="loader-spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">or continue with</div>

          <div className="google-btn-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google Sign-In failed')}
              theme="outline"
              size="large"
              width={380}
              text="signin_with"
              shape="rectangular"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
