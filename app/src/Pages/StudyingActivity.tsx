import React, {useState, useRef, useEffect} from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ModalV2 from '../Components/ModalV2';
import '/public/css/Typing.css'

import '/public/css/StudyingActivity.css'


function StudyingActivity() {

    const parseKeywords = (keywords: string) => {
        const parsedKeywords = keywords.split(',').map(part => part.trim());

        // console.log(parsedKeywords);
        return parsedKeywords;
    }

    const [text, setText] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [lastText, setLastText] = useState("");
    const [currentText, setCurrentText] = useState("");

    //For one more button press after keywords array hits 0
    const [oneMoreClick, setOneMoreClick] = useState(true);

    const nextIteration = () => {
        const sentenceErrors = findSentenceErrors(text, input);
        console.log(sentenceErrors);
        console.log(lastText);

        removeNextKeyword();
    }
    
    const removeNextKeyword = () => {
        // const sentenceErrors = findSentenceErrors(text, input);
        // console.log(sentenceErrors);
        // console.log(lastText);

        if(keywords.length == 0 && oneMoreClick) {
            setOneMoreClick(false);
            return;
        }

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

    // const activityManager = (text: string, keywords: string) => {
    //     const parsedKeywords = parseKeywords(keywords);
    //     let currentString = text;

    //     const sessions = 5;



    // }

    // For modal
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (input1: string, input2: string) => {
        setText(input1);
        setCurrentText(input1);
        setInput("");
        setKeywords(parseKeywords(input2));
        setLastText(text);
        handleClose();
      };

      // For typing

      const [input, setInput] = useState('');
      const textareaRef = useRef<HTMLTextAreaElement>(null);
    
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const typedValue = e.target.value;
        // setInput(e.target.value);

        //Replace underscores with letter

         // Iterate through the user's input and replace underscores with matching characters
        let updatedText = currentText.split("").map((char, index) => {
            if (char === "_" && typedValue[index] !== undefined) {
            return typedValue[index]; // Replace underscore with the typed letter
            }
            return char; // Otherwise, keep the original character
        }).join(""); // Join the array back into a string
        
        setCurrentText(updatedText); // Update the current text with replacements
        setInput(typedValue); // Update the input state

      };
    
      const handleClick = () => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      };

        // For checking keyword errors
        // Function to split a paragraph into sentences
        const splitIntoSentences = (text: string) => {
            // A simple sentence split using regex. It matches sentence-ending punctuation.
            return text.match(/[^.!?]+[.!?]*\s*/g) || [];
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

    return (



        <div id="main-content">
            {/* Add Notes via Modal */}
            <Button variant="contained" onClick = {handleOpen}>Add or adjust notes!</Button>
            <ModalV2 open={open} handleClose={handleClose} handleSubmit={handleSubmit}></ModalV2>
            

            {/* Typing Functionality */}
            <div className="App">
                <h1>Typing Prompt</h1>
                <p className="paragraph">
                    {currentText.split('').map((char, index) => (
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

            {/* <Button variant="contained" onClick = {initializeReplacement} disabled={!text || !keywordInput}>Initialize Notes and Keywords</Button> */}

            <Button variant="contained" onClick = {removeNextKeyword} disabled={keywords.length === 0 && !oneMoreClick}>Remove next keyword</Button>

        </div>

    );
}

export default StudyingActivity;