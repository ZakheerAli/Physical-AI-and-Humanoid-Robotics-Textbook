import React, { useState } from 'react';
import Layout from '@theme/Layout';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Registering...');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Registration successful: ${data.message}`);
        // Optionally store token: localStorage.setItem('token', data.access_token);
        // Clear form
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('student');
      } else {
        setMessage(`Registration failed: ${data.detail || data.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <Layout title="Register" description="Register for a new account">
      <main>
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
          <h1>Register for an Account</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
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
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>
                Role:
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              >
                <option value="student">Student</option>
                <option value="educator">Educator</option>
                <option value="researcher">Researcher</option>
              </select>
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
              Register
            </button>
          </form>
          {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
        </div>
      </main>
    </Layout>
  );
}

export default Register;
