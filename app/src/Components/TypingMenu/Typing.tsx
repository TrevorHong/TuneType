import React, { useState, useRef, useEffect } from 'react';
import './Typing.css';
import Random from './Random';
import { useLocation } from 'react-router-dom';

const Typing = () => {
  const [input, setInput] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(60);
  const [startTime, setStartTime] = useState(0);
  // const [correctWords, setCorrectWords] = useState(0);
  const [wpm, setWpm] = useState(0); // Default WPM to 0

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const location = useLocation();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      setStartTime(Date.now());
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(interval); // Stop timer at 0
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const difficultyLevels: Record<string, number> = {
    '/NormalType/Easy': 7,
    '/NormalType/Medium': 10,
    '/NormalType/Hard': 14,
  };

  const maxLength = difficultyLevels[location.pathname as keyof typeof difficultyLevels] || 0;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    setIsRunning(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

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

  const cursorPosition = getCursorPosition();

  useEffect(() => {
    setInput('');
    setParagraph('');
  }, [location.pathname]);

  const calculateWPM = () => {
    if (startTime === 0 || !isRunning) {
      setWpm(0); // Default WPM to 0 when not running
      return;
    }

    const wordsTyped = input.trim().split(' ').length;
    const timeElapsed = (Date.now() - startTime) / 60000; // Time in minutes
    const calculatedWPM = timeElapsed > 0 ? Math.floor(wordsTyped / timeElapsed) : 0;
    setWpm(calculatedWPM);
  };

  useEffect(() => {
    const correct = input
      .split(' ')
      .filter((word, index) => word === paragraph.split(' ')[index]).length;
    // setCorrectWords(correct);
    calculateWPM(); // Recalculate WPM whenever input changes
  }, [input, paragraph]);

  return (
    <div className="App">
      <Random maxLength={maxLength} setParagraph={setParagraph} />
      <div className="Timer">{count}</div>
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
      <div className="wpm-display">Words Per Minute: {wpm}</div>
    </div>
  );
};

export default Typing;
