import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { id, password });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'customer') {
        navigate('/customer-dashboard');
      } else if (role === 'merchant') {
        navigate('/merchant-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton type="submit">Login</LoginButton>
        </form>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
