import React from 'react';
import { useParams} from 'react-router-dom';
import {Typography , Grid , Container ,Button , Popover} from '@mui/material';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../Components/Post';

const DetailPage = ({ authorize }) => {
    const { date } = useParams();
    const formattedDate = new Date(date);
    const humanReadableDate = formattedDate.toLocaleDateString();
    const [pageData, setPageData] = useState([]);
    const [user , setUser] = useState('');
    const [admin , setAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
        async function authenticate()
        {
            const user = await authorize();
            console.log(user);
            if(user==null)
            {
              navigate('/');
            }
            if(user.user=="Shaked")
            {
              setAdmin(true);
            }
        }
        authenticate();
    } ,[]);


    useEffect(() => {
        // Fetch pageData from the server.
        const fetchPageData = async () => {
          try {
            const response = await fetch('/api/getPosts');
            const data = await response.json();
            setPageData(data);
            console.log("Data fetched successfully")
          } catch (error) {
            console.error('Error fetching users', error);
          }
        };

        const fetchUser = async () => {
            const response = await fetch('/api/getUser');
            const data = await response.json();
            console.log(data.username);
            setUser(data.username);
        };
        fetchPageData();
        fetchUser();
      }, []);


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
            navigate("/create-post");
        }
        else{
            navigate("/create-story");
        }
    }
    
    return (
        <div lang='he' dir='rtl'>
            <Typography variant='h3' gutterBottom align='center'>
                {humanReadableDate}
            </Typography>
            <Container>
                {['Post', 'Story', 'Reel'].map((type) => (
                    <React.Fragment key={type}>
                        <Typography variant='h4' gutterBottom align='center'>
                            {type}
                        </Typography>
                        {pageData
                            .filter((item) => item.type === type)
                            .map((item) => (
                                <Grid container spacing={10}>
                                    <Grid item xs={2}>
                                        <Typography variant='h6' gutterBottom align='left'>
                                            {item.upload}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        
                                        <Post username={user} slides={item.files} description={item.description}/>
                                    </Grid>
                                </Grid>
                            ))}
                    </React.Fragment>
                ))}
            </Container>
            {admin && (
            <Container align='center'>
                <Button onClick={handleAddClick} variant='outlined' size='large' align='center'>
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
                            Post
                        </Button>
                        <Button
                            onClick={handleItemClick}
                            variant='contained'
                            sx={{ marginBottom: '8px', width: '100%' }}>
                            Story/Reel
                        </Button>
                    </Typography>
                </Popover>
            </Container>
        )}
        </div>
    );
};

export default DetailPage;
