import React, { useState , useEffect } from 'react';
import { Typography, Button, Container} from '@mui/material';
import { useNavigate } from 'react-router-dom';


function PanelBoard({ authorize }) {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() =>{
      async function authenticate(){
        const user = await authorize();

        if(user==null || user.user !== "Shaked")
        {
          navigate('/');
        }
      }
      authenticate();
    } ,[]);

    
    useEffect(() => {
        // Fetch users from your server
        const fetchUsers = async () => {
          try {
            const response = await fetch('/api/getUsers');
            const data = await response.json();
            setUsers(data.users);
          } catch (error) {
            console.error('Error fetching users', error);
          }
        };
      
        fetchUsers();
      }, []);

      const handleUserClick = async (userId) => {
        try {
            const response = await fetch('http://localhost:3000/api/updateWhichUser', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId }),
         });
        console.log("User updated")
        } catch (error) {
            console.log(error);
        }
        navigate('/calendar');
      };

      const registerUser = ()=> {
        navigate('/sign-up')
      }

  return (
    <div>
        <Container>
          <Button onClick={registerUser} variant="contained" color="secondary"><Typography>Create New User</Typography></Button>
            {users.map((user) => (
                <Button key={user.id} onClick={() => handleUserClick(user.id)} variant="contained" color="secondary">
                <Typography>{user.username}</Typography>
                </Button>
            ))}
        </Container>
    </div>
  );
}

export default PanelBoard;
