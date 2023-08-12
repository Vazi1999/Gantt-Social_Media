import React, { useState } from 'react';
import { Typography, TextField, Button, Container, CssBaseline, Box ,InputAdornment , Select , MenuItem , FormControl , InputLabel} from '@mui/material';



function ReelStoryPage() {
  const [files, setFiles] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileSelection = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };


  const handleCreate = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });
    formData.append('time', selectedTime);
    formData.append('option', selectedOption);
    try {
      console.log(formData);
      const response = await fetch('http://localhost:3000/api/createReelStory', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Created successfully');
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
      <Container maxWidth="md" align="center">
        <Typography variant="h4" gutterBottom>
          הוסף ריל או סטורי
        </Typography>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>בחר אופציה</InputLabel>
          <Select
            value={selectedOption}
            onChange={handleOptionChange}
            label="בחר אופציה"
          >
            <MenuItem value="Reel">ריל</MenuItem>
            <MenuItem value="Story">סטורי</MenuItem>
          </Select>
        </FormControl>
        <Box mt={2}>
          <input type="file" onChange={handleFileSelection} />
        </Box>
        <Box mt={2}>
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
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            צור רילס או סטורי
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default ReelStoryPage;
