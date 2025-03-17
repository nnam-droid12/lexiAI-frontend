import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { navigate } from '@reach/router';
import styled from "styled-components";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("email:", email);
    e.preventDefault();
    try {
      // API call to send token to the email
      const response = await fetch(
        `/api/v1/forgot-password/verify-email/${email}`,
        {
          method: "POST",
          // headers: { 'Content-Type': 'application/json' },
          // body: JSON.stringify({ email }),
        }
      );

      const text = await response.text(); // First get text
      console.log("Raw response:", text);
      if (text === " Email verified successfully") {
        setMessage("A token has been sent to your email.");
      } else {
        setMessage("Failed to send token. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again later.");
    }
    navigate(`/token/${email}`);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Forgot Password</Title>
        <Label>Email Address</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Button type="submit">Send Token</Button>
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

export default ForgotPasswordPage;
