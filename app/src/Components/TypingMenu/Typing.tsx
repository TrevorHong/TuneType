import React, { useState, useRef } from 'react';
import './Typing.css';

interface TypingProps {
  paragraph: string; // Prop to accept the paragraph
}

const Typing: React.FC<TypingProps> = ({paragraph}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const paragraph = "Once upon a time there was a lovely princess. " +
  // "But she had an enchantment upon her of a fearful sort, " +
  // "which could only be broken by Love's first kiss. " +
  // "She was locked away in a castle guarded by a terrible fire breathing dragon. " +
  // "Many brave knights had attempted to free her from this dreadful prison, but none prevailed. " +
  // "She waited in the dragon's keep in the highest room of the tallest tower for her true love and true love's first kiss. " +
  // "Like that's ever going to happen. What a loony. Shrek Beware Stay out I think he's in here. " +
  // "All right. Lets get it! Hold on";

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

export default Typing;