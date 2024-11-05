import React, { useState, useRef } from 'react';
import './Typing.css';
import Random from './Random';

const Typing = () => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { paragraph } = Random();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const getCursorPosition = () => {
    if (paragraphRef.current) {
      const cursorIndex = input.length; // Position the cursor at the end of the input
      const span = paragraphRef.current.children[cursorIndex] as HTMLElement;
      if (span) {
        const { offsetLeft, offsetTop } = span;
        return { left: offsetLeft, top: offsetTop + 4 }; // Adjust this offset for alignment
      }
    }
    return { left: 0, top: 0 };
  };
  
  

  const cursorPosition = getCursorPosition();

  return (
    <div className="App">
      <p className="paragraph" ref={paragraphRef}>
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
      {/* Blinking line */}
      <div
        className="blinking-cursor"
        style={{
          left: cursorPosition.left,
          top: cursorPosition.top,
        }}
      />
    </div>
  );
};

export default Typing;
