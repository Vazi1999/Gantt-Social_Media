import React, { useState } from 'react';
import { Typography, TextField, Button, Container, CssBaseline, Box ,InputAdornment } from '@mui/material';



function PostPage() {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileSelection = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append('description', description);

    formData.append('time', selectedTime);

    files.forEach((file) => {
      formData.append('files', file);
    });
      
    try {
      console.log(formData);
      const response = await fetch('http://localhost:3000/api/createPost', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Post created successfully');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post', error);
    }
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
         <Box mt={2} align='center'>
          <TextField
            label="זמן"
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { step: 300 }, // 5-minute intervals
              startAdornment: (
                <InputAdornment position="start">
                  <span role="img" aria-label="Clock">
                    ⏰
                  </span>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mt={2} align='center'>
          <input
            type="file"
            multiple
            onChange={handleFileSelection}
          />
        </Box>
        <Box mt={2} align='center'>
          <Button variant="contained" color="secondary" onClick={handleCreatePost}>
            צור פוסט
          </Button>
        </Box>
      </Container>
    </div>
  );
}
export default PostPage;
