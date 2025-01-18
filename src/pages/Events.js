// import { PageDivider } from "../components/PageDivider"
// import React, { useState } from 'react';

// export default function Events() {
//   // for keeping track of clicked day *************
//   const [currEvent, setEvent] = useState(undefined);
//   let eventDescWrapper = [];

//   if (currEvent != undefined) {
//     currEvent.style.border = "black 5px solid";
//   }
//   if (currEvent != undefined) {
//     if (currEvent.id == 17) { // 31 just temporary. we would have a list/map.keyset of all event dates instead.
//       eventDescWrapper = EventDesc({desc:'Deadline for magazine submission', time:'EOD', date:'January 17th'}) // also just temp.
//     }
//   }

//   const handleClick = (event) => {
//     var d = document.getElementById(event.target.id);
//     if (currEvent == undefined) {
//       setEvent(d);
//     } else {
//       currEvent.style.border = "none";
//       if (d == currEvent) {
//         setEvent(undefined);
//       } else {
//         setEvent(d);
//       }
//     }
//   }

//   // end of keeping track of clicked day ***********
  
//   // Creation of current month's calendar
//   let date = new Date();
//   let currMonth = date.toLocaleString('default', { month: 'long' }).toUpperCase();
//   let monthEvents = {'january': {'name': 'Deadline for magazine submission', 'day': 17, 'month': 1, 'year': 2025}}; // would be filled in with API and does not need to be the same structure of data as shown here (we would just need to alter code little bit no worries)
//   let dayCount = 31; // would be filled in with API
//   let dayCards = Object.keys(monthEvents).map((key => {
//     return (
//       <div class='resource-card-wrapper'>
//         {key}, {monthEvents[key].name}
//       </div>
//     )
//   }))
//   let monthframe = []
//   for (let i = 1; i <= dayCount; i++) {
//     monthframe.push(

//       <div class='resource-card-wrapper'>
//         {i}
//       </div>
//     )
//   }

//   return (
//     <div className='full-calendar page'>
//           <div className='calendar-image'>
//             <img src='images/sunrise.png'></img>
//           </div>
//           <div className='calendar-right-panel'>
//             <div className='calendar-wrapper'>
//               <div className='all-dates-wrapper'>
//                 <h1 className='month-header'>
//                   {currMonth}
//                 </h1>
//                 <CalHeader/>
//                 <DayGrid days={dayCount} handleClick={handleClick}/>
//               </div>
//               {eventDescWrapper}
//             </div>
//           </div>
//     </div>
//   )
// }

// // Creates the grid of days for each day in the given month
// // Currently does not match the exact weekday with the day numbers (ex. dec 1st is not on a sunday)
// // Params: 
// // - days: number of days in the current month
// export function DayGrid(props) {

//   let dayCount = props.days;
//   let dayList = []
//   for (let day = 1; day <= dayCount; day++) {
//     dayList.push(
//       <button key={day} id={day} className='day-card' onClick={props.handleClick}>
//         {day}
//       </button>
//     )
//   }
//   return (
//     <ul className='days-wrapper'>
//       {dayList}
//     </ul>
//   )
// }


// // Creates the header for the calendar (sun-sat)
// export function CalHeader() {

//   const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//   const weekdays_alt = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

//   let weekdays_list = []
//   for (let i = 0; i < 7; i++) {
//     weekdays_list.push(
//       <li id={weekdays[i]} key={i} className='weekday-card' aria-label={weekdays_alt[i]}>
//         {weekdays[i]}
//       </li>
//     )
//   }

//   return (
//     <ul className='weekdays-wrapper'>
//       {weekdays_list}
//     </ul>
//   )
// }

// // Creates an event description div if the day clicked has an event
// // If no events are happening, then show 'NO EVENTS' or blank
// export function EventDesc(props) {
//   const desc_string = props.desc;
//   const desc_time = props.date + " at " + props.time;
//   return (
//     <div className='event-description-wrapper'>
//       <p>
//         {desc_string.toUpperCase()}
//       </p>
//       <p>
//         {desc_time.toUpperCase()}
//       </p>
//     </div>
//   )
// }

import { PageDivider } from "../components/PageDivider"
export default function Events() {
  return (
    <PageDivider name="Coming soon"/> 
  )
}