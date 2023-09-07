import React, { useState , useEffect } from 'react';
import { Typography, TextField, Button, Container, CssBaseline, Box ,InputAdornment , Select , MenuItem , FormControl , InputLabel} from '@mui/material';
import { useNavigate } from 'react-router-dom';
const backendServer = 'http://localhost:3000';
function ReelHighlightPage() {
  const [files, setFiles] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    const Authorize = async () => {
      try {
        const response = await fetch(backendServer +'/api/Authorize', {
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
      formData.append('files', file);
    });
    formData.append('time', selectedTime);
    formData.append('option', selectedOption);
    formData.append('description', '');
    try {
      console.log(formData);
      const response = await fetch(backendServer +'/api/createItem', {
        method: 'POST',
        credentials:'include',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Created successfully');
        navigate('/calendar');
      } else {
        console.error('Failed to create item');
      }
    } catch (error) {
      console.error('Error creating item', error);
    }
  };

  return (
    <div style={{backgroundColor:'#f8f7f6'}}>
      <CssBaseline />
      <Container maxWidth="md" align="center">
        <Typography variant="h2" gutterBottom sx={{color:'#D2B48C'}}>
          הוסף ריל או היילייט
        </Typography>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>בחר אופציה</InputLabel>
          <Select
            value={selectedOption}
            onChange={handleOptionChange}
            label="בחר אופציה"
          >
            <MenuItem value="Reel">ריל</MenuItem>
            <MenuItem value="Highlights">היילייט</MenuItem>
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
            sx={{backgroundColor:'rgba(255, 80, 114, 1.00)'}}
          >
            צור רילס או היילטס
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default ReelHighlightPage;
