// BasicModal.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

// Define the types for the props
interface BasicModalProps {
  open: boolean;
  handleClose: () => void;
}

const BasicModal: React.FC<BasicModalProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
    //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>

        <TextField
          id="outlined-textarea"
          label="Notes"
          placeholder="Notes go here"
          multiline
        />

        <TextField
          id="outlined-textarea"
          label="Keywords"
          placeholder="Keywords go here"
          multiline
        />

        <Button variant="contained" onClick = {handleClose}>Cancel</Button>
        <Button variant="contained" onClick = {handleClose}>Add Card</Button>

        </Box>
    </Modal>
  );
};

export default BasicModal;
