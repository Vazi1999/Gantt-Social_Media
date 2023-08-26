import React, { useState , useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function SignUpPage({ authorize }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  useEffect(() =>{
    async function authenticate(){
      const user = await authorize();
      if(user==null || user.user !== "Shaked")
      {
        navigate('/');
      }
    }
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
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers:{
          'content-type': 'application/json'
        },
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
