import React, { useState } from 'react';
import Layout from '@theme/Layout';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Logging in...');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Login successful: ${data.message}`);
        // Optionally store token: localStorage.setItem('token', data.access_token);
        // Clear form
        setEmail('');
        setPassword('');
      } else {
        setMessage(`Login failed: ${data.detail || data.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <Layout title="Login" description="Log in to your account">
      <main>
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
          <h1>Login to your Account</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
          </form>
          {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
        </div>
      </main>
    </Layout>
  );
}

export default Login;
