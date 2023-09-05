import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useEffect , useState} from 'react';
import { Button, Typography } from '@mui/material';
import './public/index.css';

// const localizer = momentLocalizer(moment);
moment.locale("en-GB");
const localizer = momentLocalizer(moment);
const backendServer = 'https://shakedvirganttapi.onrender.com';
const BigCalendar = () => {
  const [events, setEvents] = useState([]); // State to hold the events
  const [admin ,setAdmin] = useState(false);
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(backendServer +'/api/getEvents', {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'authorization' : 'Bearer ' + token
          },
          credentials:'include',
        });
        if (response.ok) {
          const eventData = await response.json();
          setEvents(eventData); // Update the events state
        }
        else
        {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPermissions = async () => {
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
          const data = await response.json();
          setAdmin(data.admin)
        }
        else
        {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPermissions();
    fetchEvents();
  }, []);
  

  const handleDayClick = async (date) => {
    // Convert the date to the desired format if needed
    const formattedDate = moment(date).format('YYYY-MM-DD');
    try {
      console.log(formattedDate);
      const response = await fetch(backendServer +'/api/getDate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization' : 'Bearer ' + token // Specify JSON content type
        },
        credentials:'include',
        body: JSON.stringify({ date: formattedDate }), // Send data as JSON
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        const serverMessage = responseData.message; // Access the message property
        console.log('Date sent successfully:', serverMessage);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error sending date', error);
    }
  
    // Navigate to the EventDetailPage with the selected date
    navigate(`/page/${formattedDate}`);
  };
  


  return (
    <div>
      {admin && 
      <Button variant='contained' size='small' sx={{backgroundColor:'#D2B48C'}} onClick={()=> navigate('/panel')}><Typography>Logout</Typography></Button>
      }
      <Calendar
        localizer={localizer}
        events={events}
        defaultView='month'
        views={["month"]}
        startAccessor="start"
        endAccessor="end"
        style={{height: '95vh'}}
        onSelectSlot={(slotInfo) => handleDayClick(slotInfo.start)}
        selectable
      />
    </div>
  );
};

export default BigCalendar;
