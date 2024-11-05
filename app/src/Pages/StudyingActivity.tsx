import React, {useState} from 'react';
import SavedStudyCard from '../Components/SavedStudyCards/SavedStudyCard';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import '/public/css/StudyingActivity.css'


function StudyingActivity() {
    const testString = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quod, ut dolorum aut optio similique sit numquam vitae officia nisi ducimus maxime impedit amet, magni commodi sequi vel necessitatibus saepe.";

    const testKeywords = "Lorem, ipsum, dolor";

    const parseKeywords = (keywords: string) => {
        const parsedKeywords = keywords.split(',').map(part => part.trim());

        // console.log(parsedKeywords);
        return parsedKeywords;
    }

    // const replaceWithUnderscore = (text: string, keywords: string[]) => {
    //     for(let i = 0; i < keywords.length; i++) {
    //         const regex = new RegExp(`\\b${keywords[i]}\\b`, 'gi'); // Matches whole words, case-insensitive
    //         text = text.replace(regex, '_'.repeat(keywords[i].length));
    //         // console.log(text);
    //     }
    //     return text;
    // }

    const [text, setText] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [currentText, setCurrentText] = useState("");
    const [keywordInput, setKeywordInput] = useState("");
    
    const initializeReplacement = () => {
        setCurrentText(text); // Set the text to be processed
        setKeywords(keywordInput.split(',').map(word => word.trim())); // Split keywords by commas and trim spaces
    };
    
    const removeNextKeyword = () => {
        if (keywords.length > 0) {
            const [nextKeyword, ...remainingKeywords] = keywords;
            const regex = new RegExp(`\\b${nextKeyword}\\b`, 'gi'); // Match whole words, case-insensitive
            const newText = currentText.replace(regex, '_'.repeat(nextKeyword.length));
            setCurrentText(newText);
            setKeywords(remainingKeywords); // Update to remove the processed keyword
        }
    }

    // const activityManager = (text: string, keywords: string) => {
    //     const parsedKeywords = parseKeywords(keywords);
    //     let currentString = text;

    //     const sessions = 5;



    // }

    
    return (
        <div id="main-content">
            <div>            
                <TextField
                    id="outlined-textarea"
                    label="Notes"
                    placeholder="Notes go here"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    multiline
                    fullWidth
                />
            </div>


            <div>
                <TextField
                    id="outlined-textarea"
                    label="Keywords"
                    placeholder="Keywords go here"
                    value={keywordInput} 
                    onChange={(e) => setKeywordInput(e.target.value)} 
                    multiline
                    fullWidth
                />
            </div>
            
            <div id="text">
                {/* <h2>{parseKeywords(testKeywords)}</h2> */}
                {/* <h2>{replaceWithUnderscore(testString, parseKeywords(testKeywords))}</h2> */}
                <Typography>Text: {currentText}</Typography>

            </div>

            <Button variant="contained" onClick = {initializeReplacement} disabled={!text || !keywordInput}>Initialize Notes and Keywords</Button>

            <Button variant="contained" onClick = {removeNextKeyword} disabled={keywords.length === 0}>Remove next keyword</Button>

        </div>

    );
}

export default StudyingActivity;