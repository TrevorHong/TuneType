import React from 'react';
import PlaceholderText from '../Components/TextDisplay/PlaceholderText';
import SavedStudyCard from '../Components/SavedStudyCards/SavedStudyCard';
import { Typography } from '@mui/material';

import '/public/css/StudyingHomePage.css'


function Studying() {
    return (
        <div id="main-content">        
            
            <div id="addOrDelete">
                    <Typography>Test</Typography>
            </div>
            
            <div id="cardList">
                <SavedStudyCard/>
                <SavedStudyCard/>
                <SavedStudyCard/>
            </div>
        </div>

    );
}

export default Studying;