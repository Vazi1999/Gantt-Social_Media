import React from 'react';
import { useParams , Link} from 'react-router-dom';
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

    const AddItem = (event) => {
        console.log(event);
    }
    
    return (
        <div>
            <Typography variant="h3" gutterBottom align='center'>
            {humanReadableDate}
            </Typography>
            <Container>
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <Typography variant="h6" gutterBottom align='left'>
                            {humanReadableDate}
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h5" gutterBottom align='center'>
                            Time
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
                    <Button  variant="contained" sx={{ marginBottom: '8px', width: '100%' }}>
                        Post
                    </Button>
                    <Button  variant="contained" sx={{ marginBottom: '8px', width: '100%' }}>
                        Reel
                    </Button>
                    <Button  variant="contained" sx={{ width: '100%' }}>
                        Story
                    </Button>
                    </Typography>
                </Popover>
            </Container>
            
        </div>

    
        
    
  );
};

export default DetailPage;
