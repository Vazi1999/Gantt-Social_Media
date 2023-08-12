import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useEffect , useState} from 'react';

const localizer = momentLocalizer(moment);


const BigCalendar = () => {
  const [events, setEvents] = useState([]); // State to hold the events

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getEvents');
        if (response.ok) {
          const eventData = await response.json();
          setEvents(eventData); // Update the events state
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);
  
  const navigate = useNavigate();

  const handleDayClick = async (date) => {
    // Convert the date to the desired format if needed
    const formattedDate = moment(date).format('YYYY-MM-DD');
    
    try {
      console.log(formattedDate);
      const response = await fetch('http://localhost:3000/api/getDate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify JSON content type
        },
        body: JSON.stringify({ date: formattedDate }), // Send data as JSON
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        const serverMessage = responseData.message; // Access the message property
        console.log('Date sent successfully:', serverMessage);
      } else {
        console.error('Failed to send date');
      }
    } catch (error) {
      console.error('Error sending date', error);
    }
  
    // Navigate to the EventDetailPage with the selected date
    navigate(`/page/${formattedDate}`);
  };
  




  return (
    <div>
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
