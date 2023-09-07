import React from 'react';
import {Typography ,Button , Popover} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddButton = () =>{
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAddClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'options-popover' : undefined;

    const handleItemClick = (event) => {
        const buttonText = event.target.textContent
        if(buttonText === 'Post/Story')
        {
            navigate("/create-post");
        }
        else{
            navigate("/create-reel");
      
        }
    }

    return(
        <>
        <Button onClick={handleAddClick} variant='outlined' size='large' color='secondary' align='center'>
                    Add
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                    <Typography sx={{ padding: '16px' }}>
                        <Button
                            onClick={handleItemClick}
                            variant='contained'
                            sx={{ marginBottom: '8px', width: '100%' }}>
                            Post/Story
                        </Button>
                        <Button
                            onClick={handleItemClick}
                            variant='contained'
                            sx={{ marginBottom: '8px', width: '100%' }}>
                            Highlight/Reel
                        </Button>
                    </Typography>
                </Popover>
                </>
    )
}
export default AddButton;