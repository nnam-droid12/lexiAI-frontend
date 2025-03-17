import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
    
  const { email } = useParams();
  console.log(email);

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }

    try {
      // API call to reset the password
      const response = await fetch(`/api/v1/forgot-password/change-password/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, repeatedPassword: confirmPassword }),
      });

      
      const text = await response.text(); // First get text
      console.log("Raw response:", text);
    //   if (text === "Password changed successfully") {
    //     setMessage('Password reset successful. You can now log in.');
    //     // Redirect to login page
    //     window.location.href = '/login';
    //   } else {
    //     setMessage('Failed to reset password. Please try again.');
    //   }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again later.');
    }
    navigate('/dashboard')
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Reset Password</Title>
        <Label>New Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          required
        />
        <Label>Confirm Password</Label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
          required
        />
        <Button type="submit">Reset Password</Button>
        {message && <Message>{message}</Message>}
      </Form>
    </Container>
  );
};

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

export default ResetPassword;
