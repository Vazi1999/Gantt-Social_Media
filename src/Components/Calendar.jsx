import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useNavigate  } from 'react-router-dom';

const localizer = momentLocalizer(moment);


const BigCalendar = () => {
  const events = [
    // Array of your event objects
  ];
  const navigate = useNavigate();

  const handleDayClick = (date) => {
    // Convert the date to the desired format if needed
    const formattedDate = moment(date).format('YYYY-MM-DD');
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
