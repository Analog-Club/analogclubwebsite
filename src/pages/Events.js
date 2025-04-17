import React, { useState, useEffect } from 'react';
import useGoogleCalendar from '../components/GoogleCalendar';

export default function Events() {
  const [currEvent, setEvent] = useState(null);
  const { events, error } = useGoogleCalendar();
  const [monthEvents, setMonthEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  let eventDescWrapper = [];

  // Convert Google Calendar events to monthEvents format when events change
  useEffect(() => {
    if (events) {
      const formattedEvents = events.reduce((acc, event) => {
        const date = new Date(event.start.dateTime || event.start.date);
        const month = date.toLocaleString('default', { month: 'long' }).toLowerCase();
        const day = date.getDate();
        
        if (!acc[month]) {
          acc[month] = {};
        }
        
        acc[month][day] = {
          name: event.summary,
          day: day,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          description: event.description || '',
          time: date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          })
        };
        return acc;
      }, {});
      
      setMonthEvents(formattedEvents);
    }
  }, [events]);

  if (currEvent != undefined) {
    currEvent.style.border = "black 0.45vw solid";
    
    // Check if there's an event on the selected day
    const selectedDay = parseInt(currEvent.id);
    const selectedMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
    
    if (monthEvents[selectedMonth] && monthEvents[selectedMonth][selectedDay]) {
      const event = monthEvents[selectedMonth][selectedDay];
      eventDescWrapper = EventDesc({
        desc: event.name,
        time: event.time,
        date: `${selectedMonth} ${selectedDay}`
      });
    }
  }

  const handleClick = (event) => {
    var d = document.getElementById(event.target.id);
    const clickedDay = parseInt(event.target.id);

    if (currEvent == undefined) {
      setEvent(d);
      setSelectedDay(clickedDay);
    } else {
      currEvent.style.border = "none";
      if (d == currEvent) {
        setEvent(undefined);
        setSelectedDay(null);
      } else {
        setEvent(d);
        setSelectedDay(clickedDay);
      }
    }
  }

  // Creation of current month's calendar
  let date = new Date();
  let currMonth = date.toLocaleString('default', { month: 'long' }).toUpperCase();
  
  // Get number of days in current month
  let dayCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // Show error if API fails
  if (error) {
    return <div>Error loading calendar events: {error}</div>;
  }

  return (
    <div className='full-calendar'>
      <div className='calendar-image'>
        <img src='images/sunrise.png' alt="Calendar header"></img>
      </div>
      <div className='calendar-right-panel'>
        <div className='calendar-wrapper'>
          <div className='all-dates-wrapper'>
            <h1 className='month-header'>
              {currMonth}
            </h1>
            <CalHeader/>
            <DayGrid 
              days={dayCount}
              handleClick={handleClick}
              events={monthEvents[currMonth.toLowerCase()]}
              selectedDay={selectedDay}
            />
          </div>
          {eventDescWrapper}
        </div>
      </div>
    </div>
  );
}

export function DayGrid(props) {
  let dayCount = props.days;
  let dayList = [];

  const date = new Date();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayIndex = firstDayOfMonth.getDay();

  for (let i = 0; i < firstDayIndex; i++) {
    dayList.push(
      <div key={`empty-${i}`} className="day-card empty"></div>
    );
  }

  for (let day = 1; day <= dayCount; day++) {
    const hasEvent = props.events && props.events[day];
    const isSelected = props.selectedDay === day;
    dayList.push(
      <button
        key={day}
        id={day}
        className={`day-card ${hasEvent ? 'has-event' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={props.handleClick}
      >
        {day}
        {hasEvent && <span className="event-indicator">•</span>}
      </button>
    );
  }

  return (
    <ul className='days-wrapper'>
      {dayList}
    </ul>
  );
}

// Creates the header for the calendar (sun-sat)
export function CalHeader() {

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const weekdays_alt = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  let weekdays_list = []
  for (let i = 0; i < 7; i++) {
    weekdays_list.push(
      <li id={weekdays[i]} key={i} className='weekday-card' aria-label={weekdays_alt[i]}>
        {weekdays[i]}
      </li>
    )
  }

  return (
    <ul className='weekdays-wrapper'>
      {weekdays_list}
    </ul>
  )
}

// Creates an event description div if the day clicked has an event
// If no events are happening, then show 'NO EVENTS' or blank
export function EventDesc(props) {
  const desc_string = props.desc;
  const desc_time = props.date + " at " + props.time;
  return (
    <div className='event-description-wrapper'>
      <p>
        {desc_string.toUpperCase()}
      </p>
      <p>
        {desc_time.toUpperCase()}
      </p>
    </div>
  )
}