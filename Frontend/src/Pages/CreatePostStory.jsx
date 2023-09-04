import React, { useState , useEffect } from 'react';
import { Typography, TextField, Button, Container, CssBaseline, Box ,InputAdornment , Select , MenuItem , FormControl , InputLabel} from '@mui/material';import { useNavigate } from 'react-router-dom';

function PostStoryPage() {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [option , setOption] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    const Authorize = async () => {
      try {
        const response = await fetch('https://ShakeDvirGanttAPI/api/Authorize', {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
          },
          credentials:'include',
        });
        if (response.ok) {
          console.log('authenticated');
        }
        else
        {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    };

    Authorize();
  }, []);

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

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
    formData.append('option' , option);

    files.forEach((file) => {
      formData.append('files', file);
    });
      
    try {
      console.log(formData);
      const response = await fetch('https://ShakeDvirGanttAPI/api/createItem', {
        method: 'POST',
        credentials:'include',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Post created successfully');
        navigate('/calendar')
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <div lang='he' dir='rtl' style={{backgroundColor:'#f8f7f6'}}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h2" sx={{color:'#D2B48C'}}>צור פוסט או סטורי</Typography>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>בחר אופציה</InputLabel>
          <Select
            value={option}
            onChange={handleOptionChange}
            label="בחר אופציה"
          >
            <MenuItem value="Post">פוסט</MenuItem>
            <MenuItem value="Story">סטורי</MenuItem>
          </Select>
        </FormControl>

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
          <Button variant="contained" sx={{backgroundColor:'rgba(255, 80, 114, 1.00)'}} onClick={handleCreatePost}>
            צור פוסט
          </Button>
        </Box>
      </Container>
    </div>
  );
}
export default PostStoryPage;
