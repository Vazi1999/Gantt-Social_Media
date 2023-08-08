import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, TextField, Button, Container, CssBaseline, Box } from '@mui/material';

const theme = createTheme({
  direction: 'rtl', // Set the direction to right-to-left
});

function ReelStoryPage() {
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileSelection = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleCreatePost = () => {
    // You can implement the logic to create a post here
    // Use 'description' and 'selectedFiles' for post content and images
    console.log('Creating post...');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" align='center'>
        <Typography variant="h2">הוסף ריל או סטורי</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelection}
          />
      </Container>
    </ThemeProvider>
  );
}

export default ReelStoryPage;
