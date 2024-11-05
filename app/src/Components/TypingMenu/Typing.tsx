import React, { useState, useRef, useEffect } from 'react';
import './Typing.css';
import Random from './Random';
import { useLocation } from 'react-router-dom';

const Typing = () => {
  const [input, setInput] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [WPM, setWPM] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  
  const location = useLocation();

  const [count, setCount] = useState(60);

   
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
        interval = setInterval(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);
    }

    // Cleanup the interval when the counter stops or component unmounts
    return () => clearInterval(interval);
}, [isRunning]);
  
  // Define the maximum length for different difficulty levels
  const difficultyLevels: Record<string, number> = {
    '/NormalType/Easy': 7,
    '/NormalType/Medium': 10,
    '/NormalType/Hard': 14,
  };

  const maxLength = difficultyLevels[location.pathname as keyof typeof difficultyLevels] || 0;

  // Handle input change in the textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Focus on the text area when clicking the clickable area
  const handleClick = () => {
    setIsRunning(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Calculate cursor position based on input length
  const getCursorPosition = () => {
    if (paragraphRef.current) {
      const cursorIndex = input.length;
      const span = paragraphRef.current.children[cursorIndex] as HTMLElement;
      if (span) {
        const { offsetLeft, offsetTop } = span;
        return { left: offsetLeft, top: offsetTop + 4 };
      }
    }
    return { left: 0, top: 0 };
  };

  // Calculate cursor position
  const cursorPosition = getCursorPosition();

  // Effect to reset input and fetch new paragraph when the location changes
  useEffect(() => {
    setInput('');
    setParagraph('');
  }, [location.pathname]);

  return (
    <div className="App">
      <Random maxLength={maxLength} setParagraph={setParagraph} />
      <div className = "Timer">{count}</div>
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
