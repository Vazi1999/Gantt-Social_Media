import React, { useState } from 'react';
import { Typography, TextField, Button, Container, CssBaseline, Box } from '@mui/material';



function PostPage() {
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileSelection = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleCreatePost = () => {
    console.log(description);
    console.log('Creating post...');
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h2">צור פוסט</Typography>
        <TextField
          label="תיאור הפוסט"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
          margin="normal"
          variant="outlined"
        />
        <Box mt={2}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelection}
          />
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="secondary" onClick={handleCreatePost}>
            צור פוסט
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default PostPage;
