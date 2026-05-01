import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) { toast.error('Please fill in all fields'); return; }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }

    setLoading(true);
    try {
      await signup(name, email, password);
      toast.success('Account created successfully! 🎉');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Signup failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);
      toast.success('Account created! 🎉');
      navigate('/');
    } catch (err) {
      toast.error('Google sign-up failed. Please try again.');
    }
  };

  return (
    <div className="auth-page" id="signup-page">
      <div className="auth-container">
        {/* Left — Visual Panel with agriculture image */}
        <div className="auth-visual">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
            alt="Green rice paddy terraces with morning mist"
            className="auth-visual-img"
          />
          <div className="auth-visual-overlay" />
          <div className="auth-visual-brand">
            <span>🌾</span>
            <span>FarmHelper</span>
          </div>
          <div className="auth-visual-content">
            <h2 className="auth-visual-tagline">
              Empowering Farmers<br />With Data
            </h2>
            <p className="auth-visual-subtitle">
              Join thousands of farmers making smarter crop and fertilizer decisions every day.
            </p>
            <div className="auth-visual-dots">
              <div className="auth-visual-dot active" />
              <div className="auth-visual-dot" />
              <div className="auth-visual-dot" />
            </div>
          </div>
        </div>

        {/* Right — Form Panel */}
        <div className="auth-form-panel">
          <h1 className="auth-heading">Create an account</h1>
          <p className="auth-subheading">
            Already have an account? <Link to="/login" id="login-link">Log in</Link>
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                className="form-input"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="signup-password">Password</label>
                <div className="input-with-icon">
                  <input
                    id="signup-password"
                    className="form-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
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
              <div className="form-group">
                <label className="form-label" htmlFor="signup-confirm">Confirm</label>
                <input
                  id="signup-confirm"
                  className="form-input"
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} id="signup-submit-btn">
              {loading ? (
                <><div className="loader-spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Creating account...</>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">or register with</div>

          <div className="google-btn-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google Sign-Up failed')}
              theme="outline"
              size="large"
              width={380}
              text="signup_with"
              shape="rectangular"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
