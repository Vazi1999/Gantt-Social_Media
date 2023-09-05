import React from 'react';
import { useParams} from 'react-router-dom';
import {Typography , Grid , Container ,Button , Popover} from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../Components/Post';
import DeleteButton from '../Components/DeleteButton';
import AddButton from '../Components/AddButton';
import './public/index.css';

const backendServer = 'https://shakedvirganttapi.onrender.com'; // on development need to be changed.

const DetailPage = () => {
    const { date } = useParams();
    const formattedDate = new Date(date);
    const humanReadableDate = formattedDate.toLocaleDateString();
    const [pageData, setPageData] = useState([]);
    const [user , setUser] = useState('');
    const [admin , setAdmin] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
      const Authorize = async () => {
        try {
          const response = await fetch(backendServer +'/api/Authorize', {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'authorization' : 'Bearer ' + token
            },
            credentials:'include',
          });
          if (response.ok) {
            console.log('authenticated');
            const data = await response.json();
            console.log('data for auth is : ' + data.admin + data.user);
            setAdmin(data.admin);
            setUser(data.user);
          }
          else
          {
            navigate('/');
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      Authorize();
    }, []);


    useEffect(() => {
        // Fetch pageData from the server.
        const fetchPageData = async () => {
          try {
            const response = await fetch(backendServer +'/api/getPosts', {
              method: 'GET',
              headers: { 
                'Content-Type': 'application/json',
                'authorization' : 'Bearer ' + token
              },
              credentials:'include',
            });
            if(response.ok) {
              const data = await response.json();
              setPageData(data);
              console.log("Data fetched successfully")
            }
          else
          {
            navigate('/');
          }
          } catch (error) {
            console.error('Error fetching users', error);
          }
        };
        fetchPageData();
      }, []);


    return (
         <div lang='he' dir='rtl' className='background'>
      <Container
            maxWidth={false}
            sx={{
              position: 'fixed',
              backgroundColor: '#f8f7f6',
              top: 0,
              left: 0, 
              width: '100%', 
            }}
          >
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid item >
            
            <Typography variant='h3' className='font' onClick={() => navigate('/calendar')}>
            {humanReadableDate}
            </Typography>
          </Grid>
          <Grid item >
          <Typography variant='h2' sx={{ fontFamily:'Josefin Sans' , color:'rgba(255, 80, 114, 1.00)'}} onClick={() => navigate('/calendar')}>
              Social Media 
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h3' className='font' onClick={() => navigate('/calendar')}>
              GANTT  
            </Typography>
            <Typography variant='h6' className='font' onClick={() => navigate('/calendar')}>
              by Shaked Dvir
           </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{marginTop:'80px'}}>
        {/* highligh section */}
        {pageData.filter((item) => item.type === 'Highlights').map((item)=>(
          <Grid container>
          {admin && 
          <Grid item xs={12} align='start'>
            <DeleteButton itemToDelete={item} />
          </Grid>}
          <Grid item xs={12} align='center'>
            <Typography variant='h4' gutterBottom  className='itemTitle' sx={{marginBottom:'40px'}}>:HighLights</Typography>
            <img src={backendServer+'/'+item.files[0]} width={400} height={100}></img>
          </Grid>
        </Grid>
        ))}
      </Container>
      {/* Story Section */}
      <Container className='Story' sx={{marginTop:'80px'}}>
          <Grid container spacing={1}>
                {pageData
                  .filter((item) => item.type === 'Story')
                  .map((item, index) => (
                    <>
                      <Grid item xs={12}>
                        <Typography variant='h4' gutterBottom align='center' className='itemTitle' sx={{marginTop:'30px'}}>:Story</Typography>
                      </Grid>
                    <React.Fragment key={index}>
              {admin &&
                      <Grid item xs={12} align='start'>
                        <DeleteButton itemToDelete={item} />
                      </Grid>}
                      <Grid item xs={12} md={6} container alignItems="center">
                        <Paper elevation={4}>
                          <Box padding={3}>
                            <Typography className='text'>{item.description}</Typography>
                          </Box>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {item.files.map((imageURL, imgIndex) => {
                          const fileExtension = imageURL.split('.').pop().toLowerCase();
                          if (fileExtension === 'mov' || fileExtension === 'mp4') {
                            return (
                              <video
                                key={imgIndex}
                                controls
                                style={{
                                  width: '250px',
                                  height: '400px',
                                  marginBottom: '10px',
                                  marginLeft: '10px',
                                }}
                              >
                                <source
                                  src={backendServer +'/'+ imageURL}
                                />
                              </video>
                            );
                          } else {
                            return (
                              <img
                                key={imgIndex}
                                src={backendServer +'/'+ imageURL}
                                alt={`Story Image ${imgIndex}`}
                                style={{
                                  width: '250px',
                                  height: '400px',
                                  marginBottom: '10px',
                                  marginLeft: '10px',
                                }}
                              />
                            );
                          }
                        })}
                      </Grid>
                    </React.Fragment>
                    </>
                  ))}
              </Grid>
        </Container>
      <Container maxWidth={false}>
        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
             {pageData.find((item)=> item.type === "Post" || item.type === "Reel") &&
              <Grid item xs={12}>
                <Typography variant='h4' gutterBottom align='center' className='itemTitle'>:Posts/Reels</Typography>
              </Grid>}
          {['Post', 'Reel'].map((type) => (
            <React.Fragment key={type}>
              {pageData
                .filter((item) => item.type === type)
                .map((item, index) => (
                  <div>
            {admin&&
                    <Grid item xs={12} align='start'>
                      <DeleteButton itemToDelete={item} />
                    </Grid>}
                    <Grid item key={index} margin={1}>
                      <Post
                        username={user}
                        slides={item.files}
                        description={item.description}
                        upload={item.upload}
                        type={item.type}
                      />
                    </Grid>
                  </div>
                ))}
            </React.Fragment>
          ))}
        </Grid>
        <Grid container justifyContent="center" marginTop="40px">
          <img src="/detailContact.gif" width="500" height="200"></img>
        </Grid>
      </Container>
            {admin && (
            <Container align='center' style={{marginTop:'5%'}}>
                <AddButton/>
            </Container>
        )}
        </div>
    );
};

export default DetailPage;
