import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  const { login } = useAppStore();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(credentials.email, credentials.password);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <Card className="login-card" padding="xl" shadow="lg">
          <div className="login-header">
            <h1>Kampify Checklist</h1>
            <p>Sign in to manage your kampify tasks</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
            >
              Sign In
            </Button>
          </form>

          <div className="demo-credentials">
            <p>Demo credentials:</p>
            <p><strong>Manager:</strong> manager@kampify.com / password</p>
            <p><strong>Staff:</strong> staff@kampify.com / password</p>
          </div>
        </Card>
      </div>
    </div>
  );
};