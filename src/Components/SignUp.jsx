import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = () => {
    // Implement your signup logic here
    console.log('Signing up...');
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
