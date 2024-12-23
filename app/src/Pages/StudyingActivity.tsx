import React, {useState, useRef, useEffect} from 'react';
import Button from '@mui/material/Button';
import ModalV2 from '../Components/ModalV2';
import StudyingErrorModal from '../Components/StudyingErrorModal/StudyingErrorModal';

import '../../public/css/StudyTyping.css'
// import '/src/Components/TypingMenu/Typing.css'

import '../../public/css/StudyingActivity.css'


function StudyingActivity() {

    // Parses the keywords
    // Separates into separate keywords by separating via commas
    // If no keywords, return empty array
    const parseKeywords = (keywords: string) => {
        const parsedKeywords = keywords.trim() ? keywords.split(',').map(part => part.trim()) : [];

        // console.log(parsedKeywords);
        return parsedKeywords;
    }

    // states for various things
    // names are relatively self-explanatory
    const [text, setText] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [lastText, setLastText] = useState("");
    const [currentText, setCurrentText] = useState("");
    const [sentenceErrors, setSentenceErrors] = useState<{index: number, expected: string, actual: string}[]>([])

    //For one more button press after keywords array hits 0
    const [oneMoreClick, setOneMoreClick] = useState(true);

    // Remove next keyword logic is here
    const removeNextKeyword = () => {
        // Find the errors and place them into a variable
        // findSentenceErrors returns an array
        const sentenceErrors = findSentenceErrors(text, input);
        setSentenceErrors(sentenceErrors);
        // console.log(sentenceErrors);
        // console.log(lastText);
        setIsRunning(false);
        setReview(true);
        setCount(0);

        // If there are no more keywords, disable the button
        if(keywords.length == 0 && oneMoreClick) {
            setOneMoreClick(false);
            return;
        }

        // While there are keywords, remove the next keyword and
        // update the text displayed on the screen
        if (keywords.length > 0) {
            const [nextKeyword, ...remainingKeywords] = keywords;
            const regex = new RegExp(`\\b${nextKeyword}\\b`, 'gi'); // Match whole words, case-insensitive
            const newText = lastText.replace(regex, '_'.repeat(nextKeyword.length));
            setCurrentText(newText);
            setLastText(newText);
            setInput("");
            setKeywords(remainingKeywords); // Update to remove the processed keyword
        }
    }

    // For modal to add notes and keywords
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        setIsRunning(false);
    };
    const handleClose = () => setOpen(false);

    const handleSubmit = (input1: string, input2: string) => {
        setText(input1);
        setCurrentText(input1);
        setLastText(input1);
        setInput("");
        setKeywords(parseKeywords(input2));
        setCount(0);
        handleClose();
      };

      // For typing

      const [input, setInput] = useState('');
      const textareaRef = useRef<HTMLTextAreaElement>(null);
    
      // While the user is typing
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const typedValue = e.target.value;

        // Replace underscores with the letters the user types
        // Iterate through the user's input and replace underscores with matching characters
        let updatedText = currentText.split("").map((char, index) => {
            if (char === "_" && typedValue[index] !== undefined) {
            return typedValue[index];
            }
            return char;
        }).join("");
        
        // Update the states
        setCurrentText(updatedText);
        setInput(typedValue);

      };

      // Displaying UI for typing like cursor and timer

      const paragraphRef = useRef<HTMLParagraphElement>(null);

      const [count, setCount] = useState(0);
      const [isRunning, setIsRunning] = useState(false);


        // Calculate cursor position based on input length
        const getCursorPosition = () => {
            if (paragraphRef.current) {
            const cursorIndex = input.length;
            const span = paragraphRef.current.children[cursorIndex] as HTMLElement;
            if (span) {
                const { offsetLeft, offsetTop } = span;
                return { left: offsetLeft, top: offsetTop - 16 };
            }
            }
            return { left: 0, top: 0 };
        };

        // Calculate cursor position
        const cursorPosition = getCursorPosition();

        useEffect(() => {
            let interval: string | number | NodeJS.Timeout | undefined;
            if (isRunning) {
                interval = setInterval(() => {
                    setCount(prevCount => prevCount + 1);
                }, 1000);
            }
        
            // Cleanup the interval when the counter stops or component unmounts
            return () => clearInterval(interval);
        }, [isRunning]);
    
      const handleClick = () => {
        setIsRunning(true);
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      };

        // For checking keyword errors
        // Function to split a paragraph into sentences
        const splitIntoSentences = (text: string) => {
            // A simple sentence split using regex. It matches sentence-ending punctuation.
            return text.match(/[^.!?\n]+[.!?\n]*\s*/g) || [];
        };
  
        // Function to compare sentences and find errors
        const findSentenceErrors = (text1: string, text2: string) => {
            const sentences1 = splitIntoSentences(text1); // Split text1 into sentences
            const sentences2 = splitIntoSentences(text2); // Split text2 into sentences
        
            const errors = [];
        
            // Compare the sentences
            const maxLength = Math.max(sentences1.length, sentences2.length);
        
            for (let i = 0; i < maxLength; i++) {
            const sentence1 = sentences1[i] || ""; // Handle case when sentences are missing in one of the texts
            const sentence2 = sentences2[i] || "";
        
            if (sentence1 !== sentence2) {
                errors.push({
                index: i, // The index of the sentence
                expected: sentence1,
                actual: sentence2,
                });
            }
            }
        
            return errors;
        };


        const [review, setReview] = useState(false);

        const handleCloseReview = () => setReview(false);
    return (
        <div id="main-content">
            {/* Add Notes via Modal */}
            <div id="button-area">
                <Button variant="contained" onClick = {handleOpen}>Add or adjust notes!</Button>
                <Button variant="contained" className="clickable-area" onClick={handleClick}>
                    Click here to start typing
                </Button>
            </div>
            <ModalV2 open={open} handleClose={handleClose} handleSubmit={handleSubmit}></ModalV2>
            
            {/* Display errors through Modal */}
            <StudyingErrorModal open={review} handleClose={handleCloseReview} errors={sentenceErrors}></StudyingErrorModal>
            
            {/* Typing Functionality */}

                <div className="App">
                    <p className="paragraph" ref={paragraphRef}>
                        {currentText.split('').map((char, index) => (
                        <span
                            key={index}
                            className={input[index] === char ? 'correct' : 'incorrect'}
                        >
                            {char}
                        </span>
                        ))}
                    </p>
                    {/* <div className="clickable-area" onClick={handleClick}>
                        Click here to start typing
                    </div> */}
                    <div>
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


                    <div className = "Timer">
                        
                        <div>Time taken</div>
                        <div>{count}</div>                        
                    </div>
                    
                    </div>

            <Button variant="contained" onClick = {removeNextKeyword} disabled={keywords.length === 0 && !oneMoreClick}>Remove next keyword</Button>

        </div>

    );
}

export default StudyingActivity;