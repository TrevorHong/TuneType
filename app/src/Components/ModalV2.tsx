// Updated BasicModal.tsx
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
  handleSubmit: (input1: string, input2: string) => void;
}

const ModalV2: React.FC<BasicModalProps> = ({ open, handleClose, handleSubmit }) => {
  const [input1, setInput1] = React.useState("");
  const [input2, setInput2] = React.useState("");

  const onSubmit = () => {
    handleSubmit(input1, input2); // Pass values to the parent
    handleClose(); // Close the modal
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter Details
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Provide the necessary information below:
        </Typography>

        <TextField
          id="input1"
          label="Notes"
          placeholder="Notes go here"
          multiline
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          sx={{ mt: 2, width: '100%' }}
        />

        <TextField
          id="input2"
          label="Keywords"
          placeholder="Keywords go here"
          multiline
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          sx={{ mt: 2, width: '100%' }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalV2;
