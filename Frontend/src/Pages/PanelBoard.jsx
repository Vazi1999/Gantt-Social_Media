import React, { useState , useEffect } from 'react';
import {Typography , Grid , Container ,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './public/index.css';
const backendServer = 'https://shakedvirganttapi.onrender.com';
function PanelBoard() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    
    
    useEffect(() => {
        // Fetch users from your server
        const fetchUsers = async () => {
          try {
            
            const response = await fetch(backendServer +'/api/getUsers', {
              method: 'GET',
              headers: { 
                'Content-Type': 'application/json',
                'authorization' : 'Bearer ' + token
              },
              credentials:'include',
            });
            if(response.ok)
            {
              const data = await response.json();
              setUsers(data.users);
            }
            else
            {
              navigate('/');
            }
          } catch (error) {
            console.error('Error fetching users', error);
          }
        };
      
        fetchUsers();
      }, []);

      const handleUserClick = async (userId) => {
        try {
            const response = await fetch(backendServer +'/api/updateWhichUser', {
                method: 'PUT',
                headers: {
                   'Content-Type': 'application/json',
                   'authorization' : 'Bearer ' + token
                },
                credentials:'include',
                body: JSON.stringify({ userId: userId }),
         });
         if(response.ok)
         {
           console.log("User updated")
           navigate('/calendar');
         }
         else
         {
            navigate('/');
         }
        } catch (error) {
            console.log(error);
            navigate('/');
        }
      };

      const registerUser = ()=> {
        navigate('/sign-up')
      }
      
      return (
        <div className='panelboard'>
          <Container>
            <Grid container direction="row" justifyContent="start" alignItems="center" className='panelContainer'>
            <Grid item xs={12}>
              <Typography variant="h1" align="center" gutterBottom className='panel-text'>שלום ציקידושי</Typography>
            </Grid>
              <Grid item margin={1}>
                <Button onClick={registerUser} variant="contained" size="large" className='panelButtons'><Typography>Create New User</Typography></Button>
              </Grid>
              {users
                .filter(user => user.id !== 1) // Filter out user with ID 1
                .map((user) => (
                  <Grid item key={user.id} margin={1}>
                    <Button onClick={() => handleUserClick(user.id)} variant="contained" className='panelButtons' size="large">
                      <Typography>{user.username}</Typography>
                    </Button>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </div>
      ); 
}

export default PanelBoard;
