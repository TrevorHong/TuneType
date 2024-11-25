import React, { useState, useRef } from 'react';
import './Template.css';

interface TypingProps {
  paragraph: string; // Prop to accept the paragraph
}

const Template: React.FC<TypingProps> = ({paragraph}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="App">
      <p className="paragraph">
        {paragraph.split('').map((char, index) => (
          <span
            key={index}
            className={input[index] === char ? 'correct' : 'incorrect'}
          >
            {char}
          </span>
        ))}
      </p>
      <div className="clickable-area" onClick={handleClick}>
        Click here to start typing
      </div>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        rows={4}
        cols={50}
        className="hidden-textarea"
      />
    </div>
  );
};

export default Template;