
import React, { useState } from 'react';

const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
      <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
        <h3>{question}</h3>
        <span>{isOpen ? ' ' : ' '}</span>
      </div>
      {isOpen && <p>{answer}</p>}
    </div>
  );
};

export default Accordion;
