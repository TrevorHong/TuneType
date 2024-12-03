import {useState} from 'react';
import SavedStudyCard from '../Components/SavedStudyCards/SavedStudyCard';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '../Components/Modal';

import '/public/css/StudyingHomePage.css'

// Unused static page, dropped due to lack of time
function Studying() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div id="main-content">        
            
            <div id="addOrDelete">
                <Typography>Test</Typography>
                <Button variant="contained" onClick = {handleOpen}>Add Card</Button>
                <Modal open={open} handleClose={handleClose}></Modal>
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