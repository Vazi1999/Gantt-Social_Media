import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreatePostPage = () => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [uploadTime, setUploadTime] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    // Handle image upload and setImages
  };

  const handleTimeChange = (event) => {
    setUploadTime(event.target.value);
  };

  const handleCreatePost = () => {
    // Handle post creation and navigation
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <TextField
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={handleDescriptionChange}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <TextField
        label="Upload Time (HH:MM)"
        value={uploadTime}
        onChange={handleTimeChange}
      />
      <Button variant="contained" onClick={handleCreatePost}>
        Create Post
      </Button>
    </div>
  );
};

export default CreatePostPage;
