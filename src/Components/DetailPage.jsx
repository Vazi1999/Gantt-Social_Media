import React from 'react';
import { useParams} from 'react-router-dom';
import {Typography , Grid , Container ,Button , Popover} from '@mui/material';
import { useState } from 'react';


const DetailPage = () => {
    const { date } = useParams();
    const formattedDate = new Date(date);
    const humanReadableDate = formattedDate.toLocaleDateString();
    const pageData ={};

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
        if(buttonText === 'Post')
        {
            window.location.href = "/create-post";
        }
        else{
            console.log(buttonText);
            window.location.href = "/create-story";
        }
    }
    
    return (
        <div>
            <Typography variant="h3" gutterBottom align='center'>
            {humanReadableDate}
            </Typography>
            <Container> 
                {/* map over the pageData */}
                <Grid container spacing={10}>
                    <Grid item xs={2}>
                        <Typography variant="h6" gutterBottom align='left'>
                            HH:MM
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h5" gutterBottom align='center'>
                            Data
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Container align='center'>
            

                <Button onClick={handleAddClick} variant="outlined" size="large" align='center'>
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
                    }}
                >
                    <Typography sx={{ padding: '16px' }}>
                    <Button onClick={handleItemClick} variant="contained" sx={{ marginBottom: '8px', width: '100%' }}>
                        Post
                    </Button>
                    <Button onClick={handleItemClick} variant="contained" sx={{ marginBottom: '8px', width: '100%' }}>
                        Reel
                    </Button>
                    <Button onClick={handleItemClick} variant="contained" sx={{ width: '100%' }}>
                        Story
                    </Button>
                    </Typography>
                </Popover>
            </Container>
            
        </div>

    
        
    
  );
};

export default DetailPage;
