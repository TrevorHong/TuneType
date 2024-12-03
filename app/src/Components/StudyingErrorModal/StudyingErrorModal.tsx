import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import './StudyingErrorModal.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface sentenceErrors{
index: number;
  expected: string;
  actual: string;
}

// Define the types for the props
interface BasicModalProps {
    open: boolean;
    errors: sentenceErrors[];
    handleClose: () => void;
}

// Displays errors for the Study Mode
// Formats them in outlined boxes, with expected text and what the user typed
const StudyingErrorModal: React.FC<BasicModalProps> = ({open, errors, handleClose }) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Errors found in your notes:
        </Typography>
        
        {errors.map((error) => (
            <div key={error.index} className='errorBox'>
                <h3>Error {error.index}</h3>
                <p>
                <strong>Expected:</strong> {error.expected}
                </p>
                <p>
                <strong>Actual:</strong> {error.actual}
                </p>
            </div>
            ))}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" onClick={handleClose}>
            Okay, Got it
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StudyingErrorModal;
