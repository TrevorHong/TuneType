// import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import CardHeader from '@mui/material/CardHeader';

const card = {
    margin: '10px',
  }

function SavedStudyCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card sx={card}>
    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardHeader title = "Title of Study Card"/>
        <DeleteIcon />
    </Box>
    
    <CardContent>
    
    <Box>
              {/* <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary'}}>
        Title of Study Card
      </Typography> */}
      
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1.5 }}>Excerpt from notes</Typography>
      <Typography variant = "body2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis totam eaque assumenda. Debitis dicta reprehenderit dolore, quisquam rem eius autem culpa commodi a! Molestiae laborum tempora et, molestias veritatis eaque?</Typography>

      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1.5 }}>Keywords</Typography>
      <Typography variant = "body2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis totam eaque assumenda. Debitis dicta reprehenderit dolore, quisquam rem eius autem culpa commodi a! Molestiae laborum tempora et, molestias veritatis eaque?</Typography>

      </Box>

      
    </CardContent>
    </Card>
    </Box>
  );
}

export default SavedStudyCard;