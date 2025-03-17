import React, { useState } from 'react';
import styled from 'styled-components';
import { Target, Flag, Trophy, CheckCircle, ArrowRight } from 'lucide-react';

const Container = styled.div`
  max-width: 800px;
  margin: 0.2rem auto;
  padding: 0 0rem;
`;

const Title = styled.h1`
  color: #1a365d;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 0.25rem;
  }
`;

const Tab = styled.button`
  flex: 1;
  background: ${props => props.isActive ? '#2b6cb0' : '#e2e8f0'};
  color: ${props => props.isActive ? 'white' : '#4a5568'};
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.isActive ? '#2b6cb0' : '#cbd5e0'};
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  min-height: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  background: ${props => props.isSubmit ? '#2c7a7b' : '#3182ce'};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.isSubmit ? '#285e61' : '#2b6cb0'};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #4a5568;
  font-weight: 500;
`;

// function AgreementForm() {
//   const [activeSection, setActiveSection] = useState(1);

//   const sections = [
//     {
//       id: 1,
//       title: 'Project Milestones',
//       icon: <Target size={20} />,
//       content: (
//         <>
//           <FormGroup>
//             <Label>Milestone Title</Label>
//             <Input type="text" placeholder="Enter milestone title" />
//           </FormGroup>
//           <FormGroup>
//             <Label>Target Date</Label>
//             <Input type="date" />
//           </FormGroup>
//           <FormGroup>
//             <Label>Description</Label>
//             <TextArea placeholder="Describe your milestone" />
//           </FormGroup>
//         </>
//       )
//     },
//     {
//       id: 2,
//       title: 'Goals & Objectives',
//       icon: <Flag size={20} />,
//       content: (
//         <>
//           <FormGroup>
//             <Label>Goal Title</Label>
//             <Input type="text" placeholder="Enter goal title" />
//           </FormGroup>
//           <FormGroup>
//             <Label>Priority Level</Label>
//             <Input type="number" min="1" max="5" placeholder="1-5" />
//           </FormGroup>
//           <FormGroup>
//             <Label>Success Criteria</Label>
//             <TextArea placeholder="Define success criteria" />
//           </FormGroup>
//         </>
//       )
//     },
//     {
//       id: 3,
//       title: 'Achievements',
//       icon: <Trophy size={20} />,
//       content: (
//         <>
//           <FormGroup>
//             <Label>Achievement Title</Label>
//             <Input type="text" placeholder="Enter achievement title" />
//           </FormGroup>
//           <FormGroup>
//             <Label>Date Accomplished</Label>
//             <Input type="date" />
//           </FormGroup>
//           <FormGroup>
//             <Label>Impact Description</Label>
//             <TextArea placeholder="Describe the impact" />
//           </FormGroup>
//         </>
//       )
//     }
//   ];

//   const handleNext = () => {
//     if (activeSection < sections.length) {
//       setActiveSection(activeSection + 1);
//     }
//   };

//   const handleSubmit = () => {
//     // Handle form submission here
//     console.log('Form submitted!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <Container>
//         <Title>Project Progress Tracker</Title>
        
//         <TabsContainer>
//           {sections.map((section) => (
//             <Tab
//               key={section.id}
//               isActive={activeSection === section.id}
//               onClick={() => setActiveSection(section.id)}
//             >
//               {section.icon}
//               {section.title}
//             </Tab>
//           ))}
//         </TabsContainer>

//         <ProgressIndicator>
//           Step {activeSection} of {sections.length}
//         </ProgressIndicator>

//         <FormContainer>
//           {sections.find(section => section.id === activeSection)?.content}
//         </FormContainer>

//         <ButtonContainer>
//           {activeSection < sections.length ? (
//             <Button onClick={handleNext}>
//               Next
//               <ArrowRight size={18} />
//             </Button>
//           ) : (
//             <Button onClick={handleSubmit} isSubmit>
//               <CheckCircle size={18} />
//               Submit
//             </Button>
//           )}
//         </ButtonContainer>
//       </Container>
//     </div>
//   );
// }

// export default AgreementForm;

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Target, Flag, Trophy, CheckCircle, ArrowRight } from 'lucide-react';

// ... (keep all styled components exactly the same)

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Target, Flag, Trophy, CheckCircle, ArrowRight } from 'lucide-react';

// const Container = styled.div`
//   max-width: 800px;
//   margin: 2rem auto;
//   padding: 0 1rem;
// `;

// const Title = styled.h1`
//   color: #1a365d;
//   font-size: 2.5rem;
//   text-align: center;
//   margin-bottom: 2rem;
//   font-weight: bold;
// `;

// const TabsContainer = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   margin-bottom: 2rem;
//   flex-wrap: wrap;

//   @media (max-width: 640px) {
//     gap: 0.25rem;
//   }
// `;

// const Tab = styled.button`
//   flex: 1;
//   background: ${props => props.isActive ? '#2b6cb0' : '#e2e8f0'};
//   color: ${props => props.isActive ? 'white' : '#4a5568'};
//   padding: 1rem;
//   border: none;
//   border-radius: 8px;
//   font-size: 1rem;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
  
//   &:hover {
//     background: ${props => props.isActive ? '#2b6cb0' : '#cbd5e0'};
//     transform: translateY(-2px);
//   }

//   @media (max-width: 640px) {
//     padding: 0.75rem;
//     font-size: 0.875rem;
//   }
// `;

// const FormContainer = styled.div`
//   background: white;
//   padding: 2rem;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   margin-bottom: 1.5rem;
//   min-height: 400px;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1.5rem;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   color: #4a5568;
//   font-weight: 500;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   border: 2px solid #e2e8f0;
//   border-radius: 6px;
//   font-size: 1rem;
//   transition: all 0.2s;
  
//   &:focus {
//     outline: none;
//     border-color: #3182ce;
//     box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
//   }
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.75rem;
//   border: 2px solid #e2e8f0;
//   border-radius: 6px;
//   font-size: 1rem;
//   min-height: 100px;
//   transition: all 0.2s;
  
//   &:focus {
//     outline: none;
//     border-color: #3182ce;
//     box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
//   }
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 1rem;
// `;

// const Button = styled.button`
//   background: ${props => props.isSubmit ? '#2c7a7b' : '#3182ce'};
//   color: white;
//   padding: 0.75rem 1.5rem;
//   border: none;
//   border-radius: 6px;
//   font-size: 1rem;
//   cursor: pointer;
//   transition: all 0.2s;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
  
//   &:hover {
//     background: ${props => props.isSubmit ? '#285e61' : '#2b6cb0'};
//     transform: translateY(-2px);
//   }

//   &:disabled {
//     background: #cbd5e0;
//     cursor: not-allowed;
//     transform: none;
//   }
// `;

// const ProgressIndicator = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   margin-bottom: 1rem;
//   color: #4a5568;
//   font-weight: 500;
// `;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 1rem;
  border-radius: 6px;
  background-color: #fff5f5;
  margin-bottom: 1rem;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const SuccessMessage = styled.div`
  color: #2f855a;
  padding: 1rem;
  border-radius: 6px;
  background-color: #f0fff4;
  margin-bottom: 1rem;
  display: ${props => props.visible ? 'block' : 'none'};
// `;

function AgreementForm() {
  const [activeSection, setActiveSection] = useState(1);
  const [formData, setFormData] = useState({
    // agreementId: 0,
    docuSignEnvelopeId: "",
    title: "",
    status: "DRAFT",
    signedDate: " ",
    milestones: [],
    obligations: []
  });

  const [currentMilestone, setCurrentMilestone] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "PENDING"
  });

  const [currentObligation, setCurrentObligation] = useState({
    description: "",
    dueDate: "",
    assignedTo: "",
    status: "PENDING"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMilestoneChange = (e) => {
    const { name, value } = e.target;
    setCurrentMilestone(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleObligationChange = (e) => {
    const { name, value } = e.target;
    setCurrentObligation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAgreementChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sections = [
    {
      id: 1,
      title: 'Agreement Details',
      icon: <Target size={20} />,
      content: (
        <>
          <FormGroup>
            <Label>Agreement Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleAgreementChange}
              placeholder="Enter agreement title"
            />
          </FormGroup>
          {/* <FormGroup>
            <Label>DocuSign Envelope ID</Label>
            <Input
              type="text"
              name="docuSignEnvelopeId"
              value={formData.docuSignEnvelopeId}
              onChange={handleAgreementChange}
              placeholder="Enter DocuSign Envelope ID"
            />
          </FormGroup> */}
          <FormGroup>
            <Label>Signed Date</Label>
            <Input
              type="datetime-local"
              name="signedDate"
              value={formData.signedDate.split('.')[0]}
              onChange={handleAgreementChange}
            />
          </FormGroup>
        </>
      )
    },
    {
      id: 2,
      title: 'Milestones',
      icon: <Flag size={20} />,
      content: (
        <>
          <FormGroup>
            <Label>Milestone Title</Label>
            <Input
              type="text"
              name="title"
              value={currentMilestone.title}
              onChange={handleMilestoneChange}
              placeholder="Enter milestone title"
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <TextArea
              name="description"
              value={currentMilestone.description}
              onChange={handleMilestoneChange}
              placeholder="Describe the milestone"
            />
          </FormGroup>
          <FormGroup>
            <Label>Due Date</Label>
            <Input
              type="datetime-local"
              name="dueDate"
              value={currentMilestone.dueDate}
              onChange={handleMilestoneChange}
            />
          </FormGroup>
        </>
      )
    },
    {
      id: 3,
      title: 'Obligations',
      icon: <Trophy size={20} />,
      content: (
        <>
          <FormGroup>
            <Label>Description</Label>
            <TextArea
              name="description"
              value={currentObligation.description}
              onChange={handleObligationChange}
              placeholder="Describe the obligation"
            />
          </FormGroup>
          <FormGroup>
            <Label>Due Date</Label>
            <Input
              type="datetime-local"
              name="dueDate"
              value={currentObligation.dueDate}
              onChange={handleObligationChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Assigned To</Label>
            <Input
              type="text"
              name="assignedTo"
              value={currentObligation.assignedTo}
              onChange={handleObligationChange}
              placeholder="Enter assignee"
            />
          </FormGroup>
        </>
      )
    }
  ];

  const handleNext = () => {
    if (activeSection === 2) {
      setFormData(prev => ({
        ...prev,
        milestones: [
          ...prev.milestones,
          {
            // milestoneId: prev.milestones.length,
            ...currentMilestone,
            // agreement: prev.title,
            status: "PENDING"
          }
        ]
      }));
      setCurrentMilestone({
        title: "",
        description: "",
        dueDate: "",
        status: "PENDING"
      });
    }
    
    if (activeSection < sections.length) {
      setActiveSection(activeSection + 1);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    // Add the final obligation before submitting
    const finalFormData = {
      ...formData,
      obligations: [
        ...formData.obligations,
        {
        //   obligationId: formData.obligations.length,
          ...currentObligation,
        //   agreement: formData.title,
          status: "PENDING"
        }
      ]
    };
    console.log(JSON.stringify(finalFormData));

    try {
        const token = localStorage.getItem('userInfo');
        const parsedToken = JSON.parse(token);
        console.log(parsedToken.accessToken);
        const response = await fetch('/api/v1/agreements/sign-agreement', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${parsedToken.accessToken}` // Add authorization header
          },
          body: JSON.stringify(finalFormData)
        });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      setSuccess('Agreemnent Created successfully!');
      setTimeout(() => {
        setSuccess("");
      }, 5000);
      console.log('Server Response:', data);
      
      // Reset form
      setFormData({
        agreementId: 0,
        docuSignEnvelopeId: "",
        title: "",
        status: "DRAFT",
        signedDate: "",
        milestones: [],
        obligations: []
      });
      
      setCurrentMilestone({
        title: "",
        description: "",
        dueDate: "",
        status: "PENDING"
      });
      
      setCurrentObligation({
        description: "",
        dueDate: "",
        assignedTo: "",
        status: "PENDING"
      });
      
      setActiveSection(1);
    } catch (error) {
      setError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Container>
        <Title>Agreement Progress Tracker</Title>
        
        <ErrorMessage visible={error}>
          {error}
        </ErrorMessage>
        
        <SuccessMessage visible={success}>
          {success}
        </SuccessMessage>
        
        <TabsContainer>
          {sections.map((section) => (
            <Tab
              key={section.id}
              isActive={activeSection === section.id}
              onClick={() => setActiveSection(section.id)}
            >
              {section.icon}
              {section.title}
            </Tab>
          ))}
        </TabsContainer>

        <ProgressIndicator>
          Step {activeSection} of {sections.length}
        </ProgressIndicator>

        <FormContainer>
          {sections.find(section => section.id === activeSection)?.content}
        </FormContainer>

        <ButtonContainer>
          {activeSection < sections.length ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight size={18} />
            </Button>
          ) : (
            <Button onClick={handleSubmit} isSubmit disabled={isSubmitting}>
              <CheckCircle size={18} />
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </ButtonContainer>
      </Container>
    </div>
  );
}

export default AgreementForm;