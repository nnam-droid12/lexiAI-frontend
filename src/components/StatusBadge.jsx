import React, { useState } from 'react';
import styled from 'styled-components';
import { CheckCircle2, Loader } from 'lucide-react';

function StatusBadge({ status, id, type, onStatusChange }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleStatusChange = async () => {
    setIsUpdating(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("userInfo");
      const parsedToken = JSON.parse(token);
      
      const endpoint = type === 'milestone' 
        ? `/api/v1/milestones/update-status/${id}`
        : type === 'obligation'
          ? `/api/v1/obligations/update-status/${id}`
          : `/api/v1/agreements/update-status/${id}/status`;

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${parsedToken.accessToken}`,
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update status: ${errorText}`);
      }

      const newStatus = status === 'pending' ? 'completed' : 'pending';
      onStatusChange?.(newStatus);
      
    } catch (err) {
      setError(err.message);
      console.error('Status update error:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <StatusWrapper onClick={handleStatusChange} disabled={isUpdating}>
      <Badge status={status}>
        {isUpdating ? (
          <Loader size={14} className="animate-spin" />
        ) : (
          <>
            <CheckCircle2 size={14} />
            {status}
          </>
        )}
      </Badge>
      {error && <ErrorTooltip>{error}</ErrorTooltip>}
    </StatusWrapper>
  );
}

const StatusWrapper = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s;
  
  background: ${props => {
    switch (props.status?.toLowerCase()) {
      case 'completed':
        return '#C6F6D5';
      case 'pending':
        return '#FEEBC8';
      default:
        return '#E2E8F0';
    }
  }};
  
  color: ${props => {
    switch (props.status?.toLowerCase()) {
      case 'completed':
        return '#2F855A';
      case 'pending':
        return '#C05621';
      default:
        return '#4A5568';
    }
  }};

  &:hover {
    filter: brightness(0.95);
  }
`;

const ErrorTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #FED7D7;
  color: #C53030;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 4px;
  z-index: 10;
`;

export default StatusBadge;