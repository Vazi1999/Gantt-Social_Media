import React, { useState , useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  useEffect(() =>{
    async function authenticate(){
      try {
        const response = await fetch('https://shakedvirganttapi.onrender.com/api/Authorize', {
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
    authenticate();
  } ,[]);


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async () => {
    const requestBody = {username: username, password: password};
    try {
      const response = await fetch('https://shakedvirganttapi.onrender.com/api/register', {
        method: 'POST',
        headers:{
          'content-type': 'application/json',
          'authorization' : 'Bearer ' + token
        },
        credentials:'include',
        body: JSON.stringify(requestBody),
      });
      if(response.status===200){
        navigate('/panel');
      }
      else{
        alert("Somthing went wrong!");
      }
    } catch (error) {
      
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
         רישום לקוח חדש
      </Typography>
      <TextField
        label="שם משתמש"
        fullWidth
        value={username}
        onChange={handleUsernameChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="סיסמה"
        type="password"
        fullWidth
        value={password}
        onChange={handlePasswordChange}
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSignUp}
      >
        הירשם
      </Button>
    </Container>
  );
}

export default SignUpPage;
