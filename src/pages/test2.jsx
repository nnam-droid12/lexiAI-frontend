import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Calendar, CheckCircle2, AlertCircle, Clock, User, Trash2 } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: #E53E3E;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4A5568;
  text-decoration: none;
  margin-bottom: 2rem;

  &:hover {
    color: #2D3748;
  }
`;

const Header = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.875rem;
  color: #2D3748;
  margin-bottom: 1rem;
`;

const MetaData = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4A5568;
`;

const Status = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  
  ${({ status }) => status === 'completed' ? `
    background: #C6F6D5;
    color: #2F855A;
  ` : `
    background: #FEEBC8;
    color: #C05621;
  `}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StatusButton = styled(Button)`
  background: #EBF4FF;
  color: #2B6CB0;
  border: 1px solid #BEE3F8;

  &:hover:not(:disabled) {
    background: #BEE3F8;
  }
`;

const DeleteButton = styled(Button)`
  background: #FED7D7;
  color: #C53030;
  border: 1px solid #FEB2B2;

  &:hover:not(:disabled) {
    background: #FEB2B2;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

function AgreementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchAgreement();
  }, [id]);

  const fetchAgreement = async () => {
    try {
      const response = await fetch(`https://contract-image-latest.onrender.com/api/v1/documents/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch agreement details');
      }
      const data = await response.json();
      setAgreement(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`https://contract-image-latest.onrender.com/api/v1/documents/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      setAgreement(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteAgreement = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`https://contract-image-latest.onrender.com/api/v1/documents/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete agreement');
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <div className="animate-spin">Loading...</div>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <p>Error: {error}</p>
      </ErrorContainer>
    );
  }

  if (!agreement) {
    return (
      <ErrorContainer>
        <p>Agreement not found</p>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <BackLink to="/">
        <ArrowLeft size={20} />
        Back to Agreements
      </BackLink>

      <Header>
        <Title>{agreement.title}</Title>
        <MetaData>
          <MetaItem>
            <Calendar size={16} />
            Signed: {new Date(agreement.signedDate).toLocaleDateString()}
          </MetaItem>
          <MetaItem>
            <CheckCircle2 size={16} />
            Status: <Status status={agreement.status}>{agreement.status}</Status>
          </MetaItem>
          <MetaItem>
            <AlertCircle size={16} />
            DocuSign ID: {agreement.docuSignEnvelopeId}
          </MetaItem>
        </MetaData>

        <ActionButtons>
          <StatusButton
            onClick={() => updateStatus(agreement.status === 'pending' ? 'completed' : 'pending')}
            disabled={isUpdating}
          >
            <CheckCircle2 size={16} />
            {isUpdating ? 'Updating...' : `Mark as ${agreement.status === 'pending' ? 'Completed' : 'Pending'}`}
          </StatusButton>
          <DeleteButton
            onClick={() => setShowDeleteModal(true)}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
            Delete Agreement
          </DeleteButton>
        </ActionButtons>
      </Header>

      {showDeleteModal && (
        <Modal>
          <ModalContent>
            <h2 style={{ marginBottom: '1rem', color: '#2D3748' }}>Confirm Delete</h2>
            <p style={{ color: '#4A5568' }}>Are you sure you want to delete this agreement? This action cannot be undone.</p>
            <ModalButtons>
              <Button
                onClick={() => setShowDeleteModal(false)}
                style={{ background: '#E2E8F0', border: '1px solid #CBD5E0', color: '#4A5568' }}
              >
                Cancel
              </Button>
              <DeleteButton onClick={deleteAgreement} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </DeleteButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default AgreementDetail;


// incase
{/* <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            name="status"
            value={agreement.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </Select>
        </FormGroup> */}