import React, { useState } from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom'

const TokenVerification = () => {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  
  const { email } = useParams();
  console.log(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to verify token
      const response = await fetch(`/api/v1/forgot-password/verify-otp/${token}/${email}`, {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ token }),
      });

      const text = await response.text(); // First get text
      console.log("Raw response:", text);
      // if (text === "Otp verified successfully") {
      //   setMessage('Token verified. You can now reset your password.');
      //   // Redirect to Reset Password Page
      //   window.location.href = '/reset-password';
      // } else {
      //   setMessage('Invalid token. Please try again.');
      // }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again later.');
    }
    navigate(`/reset-password/${email}`);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Verify Token</Title>
        <Label>Token</Label>
        <Input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter the token from your email"
          required
        />
        <Button type="submit">Verify Token</Button>
        {message && <Message>{message}</Message>}
      </Form>
    </Container>
  );
};

// Styled Components: Same styles as ForgotPassword page
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f4f4f4;
`;

const Form = styled.form`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  color: #333;
`;

export default TokenVerification;
