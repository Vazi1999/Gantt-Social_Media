import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton , Grid , Dialog ,Button ,DialogActions , DialogContent ,DialogContentText , DialogTitle} from '@mui/material';

const backendServer = 'https://shakedvirganttapi.onrender.com';

function DeleteButton({ itemToDelete }) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const token = localStorage.getItem('token');

  const handleDeleteItem = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
        // Send a request to the server to delete the item
        const response = await fetch(backendServer +'/api/deleteItem', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
          },
          credentials:'include',
          body: JSON.stringify({item:itemToDelete}),
        });
  
        if (response.ok) {
          console.log('Item deleted successfully');
          //updated data
          window.location.reload();
        } else {
          console.error('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <div>
      {/* Your component code */}
      <Grid item xs={12} align='start'>
        <IconButton aria-label="delete" size="small" onClick={() => handleDeleteItem()}>
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </Grid>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteButton;
