import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { KeyRound, Send, FileSignature, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";

function DocumentSigning() {
  const [signerEmail, setSignerEmail] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  // const [envelopeId, setEnvelopeId] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const postResponse = useSelector((state) => state.res);
  const envelopeId = postResponse.envelopId?.data.docuSignEnvelopeId;
  console.log(postResponse.envelopId.data.docuSignEnvelopeId);
  const handleAuthenticate = async () => {
    setIsAuthenticating(true);
    setError("");

    try {
      const response = await fetch("/api/v1/docusign/consent-url");

      if (response.ok) {
        const data = await response.json();
        const consentUrl = data.consent_url; // Extract the URL from the response
        window.open(consentUrl, "_blank");
      } else {
        const errorData = await response.json();
        alert(`Authorization failed: ${errorData.message}`);
      }
    } catch (error) {
      alert("An error occurred while fetching the authorization URL.");
      console.error("Error:", error);
    }
  };

  const handleSign = async () => {
    if (!signerEmail) {
      setError("Please enter your email address");
      return;
    }

    if (!envelopeId) {
      setError(
        "No envelope ID available. Please ensure the document is properly loaded."
      );
      return;
    }

    setIsSigning(true);
    setError("");

    try {
      const token = localStorage.getItem("userInfo");
      const parsedToken = JSON.parse(token);
        console.log(parsedToken.accessToken);
      const returnUrl =
        "https://contract-image-latest.onrender.com/api/v1/documents/signing-complete";

         // Construct query parameters manually
    const queryParams = new URLSearchParams({
        envelopeId,
        signerEmail,
        returnUrl,
      }).toString();

    console.log(queryParams);

      const response = await fetch(
        `/api/v1/documents/signing-url?${queryParams}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${parsedToken.accessToken}`}
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to get signing URL");
      }

      const data = await response.json();
      const signingUrl = data.signingUrl; // Extract the URL from the response
      window.open(signingUrl, "_blank");
    } catch (err) {
      setError("Failed to initiate signing. Please try again.");
      console.error("Signing error:", err);
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Document Signing</Title>

        {error && (
          <ErrorMessage>
            <AlertCircle size={20} />
            {error}
          </ErrorMessage>
        )}

        <Section>
          <AuthButton onClick={handleAuthenticate} disabled={isAuthenticating}>
            <KeyRound size={20} />
            {isAuthenticating
              ? "Authenticating..."
              : "Authenticate with DocuSign"}
          </AuthButton>
        </Section>

        <Section>
          <Label htmlFor="signerEmail">Signer Email</Label>
          <EmailInput
            id="signerEmail"
            type="email"
            value={signerEmail}
            onChange={(e) => setSignerEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </Section>

        <SignButton onClick={handleSign} disabled={isSigning || !signerEmail}>
          <FileSignature size={20} />
          {isSigning ? "Preparing to Sign..." : "Sign Document"}
        </SignButton>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  min-height: 80vh;
  padding: 2rem;
  background: #f7fafc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
`;

const AuthButton = styled(Button)`
  background: #4299e1;
  color: white;
  border: none;
  margin-bottom: 1.5rem;

  &:hover:not(:disabled) {
    background: #3182ce;
  }
`;

const SignButton = styled(Button)`
  background: #48bb78;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background: #38a169;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #fed7d7;
  color: #c53030;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
`;

export default DocumentSigning;
