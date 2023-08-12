import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Container, CssBaseline, Box, InputAdornment } from '@mui/material';



function Test() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/getPosts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error retrieving posts:', error));
  }, []);

  return (
    // <div>
    //   <CssBaseline />
    //   <Container maxWidth="md">
    //       <div>
    //         {posts}
    //         <Typography variant="h6">{posts.description}</Typography>
    //         {posts.images.map(image => (
    //           <img key={image} src={image} alt="Image-fault" />
    //         ))}
    //       </div>
    //   </Container>
    // </div>
    <p>{posts.images.map(image=>(
        <img key={image} src={image} alt="Image-fault" />
    ))}</p>
  );
}

export default Test;
