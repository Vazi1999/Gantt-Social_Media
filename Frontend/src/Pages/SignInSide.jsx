import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './public/index.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        Shaked Dvir {new Date().getFullYear()}
    </Typography>
  );
}

const imageUrls = [
  '../../src/assets/loginPhoto1.jpg',
  '../../src/assets/loginPhoto2.jpg',
  '../../src/assets/loginPhoto3.jpg',
  '../../src/assets/loginPhoto4.jpg',
  '../../src/assets/loginPhoto5.jpg',
  '../../src/assets/loginPhoto6.jpg',
  '../../src/assets/loginPhoto7.jpg',
  '../../src/assets/loginPhoto8.jpg',
  '../../src/assets/loginPhoto9.jpg',
  '../../src/assets/loginPhoto10.jpg',
]


export default function SignInSide() {
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {username:username, password:password}
    try {
      const response = await fetch('https://ShakeDvirGanttAPI/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials:'include',
        body: JSON.stringify(requestBody),
      });
      if(response.status === 200){
        //recieves token
        const data = await response.json();
        const token = data.accessToken;
        //save the token
        localStorage.setItem('token',token);
        
        if(username === "Shaked"){ // Administrator
          navigate('/panel')
        }
        else{
          navigate('/calendar')
        }
      } else{
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  useEffect(() => {
    // Automatically change the image every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  return (
      <Grid container component="main" sx={{ height: '100vh' }} >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${imageUrls[currentImageIndex]})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={8} square sx={{backgroundColor:'#f8f7f6'}}>
          <Box 
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4" sx={{color:'rgba(255, 80, 114, 1.00)'}}>
              התחברות
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="שם משתמש"
                name="username"
                autoFocus
                onChange={handleUsernameChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="סיסמה"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 ,backgroundColor: 'rgb(140, 117, 106)'}}
              >
                כניסה
              </Button>
              {errorMessage && (
              <Typography variant="h5" color="error" align="center">
                {errorMessage}
              </Typography>
              )}
              <Copyright sx={{ mt: 5 }} />
            </Box>
            <img src="../../src/assets/Contact.gif" width="500" height="300" style={{marginTop:'70px'}}></img>
          </Box>
        </Grid>
      </Grid>
  );
}
