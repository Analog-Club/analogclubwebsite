// import { PageDivider } from "../components/PageDivider"
import React, { useState, useEffect } from 'react';
import useGoogleCalendar from '../components/GoogleCalendar';

export default function Events() {
  const [currEvent, setEvent] = useState(null);
  const { events, error } = useGoogleCalendar();
  const [monthEvents, setMonthEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [displayedMonth, setDisplayedMonth] = useState(new Date()); // New state for current displayed month
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('');
  let eventDescWrapper = [];

  // Convert Google Calendar events to monthEvents format when events change
  useEffect(() => {
    const processEvents = async () => {
      if (events) {
        try {
          const formattedEvents = events.reduce((acc, event) => {
            const date = new Date(event.start.dateTime || event.start.date);
            // Use year-month as key for easier month switching
            const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
            const day = date.getDate();
            
            if (!acc[monthKey]) {
              acc[monthKey] = {};
            }
            
            if (!acc[monthKey][day]) {
              acc[monthKey][day] = [];
            }
            
            acc[monthKey][day].push({
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
            });
            
            return acc;
          }, {});
          
          setMonthEvents(formattedEvents);
        } catch (error) {
          console.error("Error processing events:", error);
        }
      }
    };
    
    processEvents();
  }, [events]);

  // Define current and next month dates for navigation
  const currentMonthDate = new Date();
  const nextMonthDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1);

  // Go back to current month
  const handlePrevMonth = () => {
    if (displayedMonth.getMonth() === nextMonthDate.getMonth()) {
      setIsAnimating(true);
      setAnimationDirection('slide-right');
      setTimeout(() => {
        setDisplayedMonth(currentMonthDate);
        setSelectedDay(null);
        setEvent(null);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Go to next month
  const handleNextMonth = () => {
    if (displayedMonth.getMonth() === currentMonthDate.getMonth()) {
      setIsAnimating(true);
      setAnimationDirection('slide-left');
      setTimeout(() => {
        setDisplayedMonth(nextMonthDate);
        setSelectedDay(null);
        setEvent(null);
        setIsAnimating(false);
      }, 300);
    }
  };

  if (currEvent !== null) {
    currEvent.style.outline = "black 0.4vw solid";
    
    // Check if there's an event on the selected day
    const selectedDay = parseInt(currEvent.id);
    const displayedMonthKey = `${displayedMonth.getFullYear()}-${displayedMonth.getMonth()}`;
    
    if (monthEvents[displayedMonthKey] && monthEvents[displayedMonthKey][selectedDay]) {
      const dayEvents = monthEvents[displayedMonthKey][selectedDay];
      // If multiple events, display them all
      eventDescWrapper = (
        <div className='event-description-wrapper'>
          {dayEvents.map((event, index) => (
            <EventDesc
              key={index}
              desc={event.name}
              time={event.time}
              date={`${displayedMonth.toLocaleString('default', { month: 'long' })} ${selectedDay}`}
            />
          ))}
        </div>
      );
    }
  }

  const handleClick = (event) => {
    var d = document.getElementById(event.target.id);
    const clickedDay = parseInt(event.target.id);
 
    if (currEvent === null) {
      setEvent(d);
      setSelectedDay(clickedDay);
    } else {
      currEvent.style.outline = "none";
      if (d === currEvent) {
        setEvent(null);
        setSelectedDay(null);
      } else {
        setEvent(d);
        setSelectedDay(clickedDay);
      }
    }
  }

  // Use displayedMonth instead of current date
  let currMonth = displayedMonth.toLocaleString('default', { month: 'long' }).toUpperCase();
  let currYear = displayedMonth.getFullYear();
  
  // Get number of days in displayed month
  let dayCount = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 0).getDate();
  
  // Generate key for displayed month
  const displayedMonthKey = `${displayedMonth.getFullYear()}-${displayedMonth.getMonth()}`;

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
          <div className={`all-dates-wrapper ${isAnimating ? animationDirection : ''}`}>
            <div className='month-header-container'>
              <button 
                onClick={handlePrevMonth} 
                className='month-arrow prev-arrow'
                disabled={displayedMonth.getMonth() === currentMonthDate.getMonth()}
              >
                &lt;
              </button>
              <h1 className='month-header'>
                {currMonth}
              </h1>
              <button 
                onClick={handleNextMonth} 
                className='month-arrow next-arrow'
                disabled={displayedMonth.getMonth() === nextMonthDate.getMonth()}
              >
                &gt;
              </button>
            </div>
            <CalHeader/>
            <DayGrid 
              days={dayCount}
              handleClick={handleClick}
              events={monthEvents[displayedMonthKey] || {}}
              selectedDay={selectedDay}
              dateContext={displayedMonth}
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

  // Use dateContext for calculating first day of month
  const firstDayOfMonth = new Date(props.dateContext.getFullYear(), props.dateContext.getMonth(), 1);
  const firstDayIndex = firstDayOfMonth.getDay();

  for (let i = 0; i < firstDayIndex; i++) {
    dayList.push(
      <div key={`empty-${i}`} className="day-card empty"></div>
    );
  }

  for (let day = 1; day <= dayCount; day++) {
    const hasEvent = props.events && props.events[day] && props.events[day].length > 0;
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