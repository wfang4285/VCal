"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';
import Navigation from '../navigation/navigation';
import Modal from '../modal/modal';
import './calendar.css';
import Event from '../mongo/db';
import connectionString from '../mongo/db';

export default function Calendar() {
  // Get current date
  const currentDate = new Date();
  const prevDateObj = new Date();
  const nextDateObj = new Date();
  prevDateObj.setMonth(currentDate.getMonth() - 1);
  const [date, setDate] = useState(currentDate);
  const [prevDate, setPrevDate] = useState(prevDateObj);
  const [nextDate, setNextDate] = useState(nextDateObj);
  const [showModal, setShowModal] = useState(false);
  const [selectedCell, setSelectedCell] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Function to get the number of days in a month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  // Function to get number of days before start of the month
  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };
  
  // Function to get the number of days in the previous month
  const getPrevMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 0).getDate();
  }

  // Function to get the number of days in the previous month
  const getNextMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 2;
    return new Date(year, month, 0).getDate();
  }

  // Function to handle previous month button click
  const goToPrevMonth = () => {
    const newDate = new Date(date);
    const newPrevDate = new Date(date); 
    newDate.setMonth(newDate.getMonth() - 1);
    newPrevDate.setMonth(newPrevDate.getMonth() - 2);
    setDate(newDate);
    setPrevDate(prevDate);
  };

  // Function to handle next month button click
  const goToNextMonth = () => {
    const newDate = new Date(date);
    const newPrevDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
    setPrevDate(newPrevDate);
  };

  //Add event listener for keydown to switch between cells
  const handleKeyDown = (event) => {
    //Keycode is deprecated
    const { key, target, ctrlKey } = event;

    //Prevents modal movement while creating event.
    if(target.name === 'title' ||
    target.name === 'description' ||
    target.name === 'startTime' ||
    target.name === 'endTime'){
      return;
    }
    if(key === "ArrowLeft" && ctrlKey){
      goToPrevMonth();
    } else if(key === "ArrowRight" && ctrlKey){
      goToNextMonth();
    } else if(key === "ArrowLeft" || key === "a"){
      moveSelectedLeft();
    } else if(key === "ArrowRight" || key === "d"){
      moveSelectedRight();
    } else if(key === "ArrowUp" || key === "w"){
      moveSelectedUp();
    } else if(key === "ArrowDown" || key === "s"){
      moveSelectedDown();
    } else if(key === "Enter"){
      setShowModal(true);
    } else if(key === "l"){ //L toggles darkmode
      setDarkMode((d) => !d);
    }
  };

  const moveSelectedRight = () => {
    setSelectedCell((current)=>{
      current = mod(current+1,calendarDays.length);
      if(current != mod(current, calendarDays.length)){
        current = mod(current, calendarDays.length);
      } else {
        console.log("current cell:" + current);
      }
      console.log(current);
      return current;
    });
  }

  const moveSelectedLeft = () => {
    setSelectedCell((current)=>{
      current = mod(current-1,calendarDays.length);
      if(current != mod(current, calendarDays.length)){
        current = mod(current, calendarDays.length);
      } else {
        console.log("current cell:" + current);
      }
      console.log(current);
      return current;
    });
  }

  const moveSelectedUp = () => {
    setSelectedCell((current)=>{
      current = mod(current-7, calendarDays.length);
      if(current != mod(current, calendarDays.length)){
        current = mod(current, calendarDays.length);
      } else {
        console.log("current cell:" + current);
      }
      console.log(current);
      return current;
    });
  }
  
  const moveSelectedDown = () => {
    setSelectedCell((current)=>{
      current = mod(current+7,calendarDays.length);
      if(current != mod(current, calendarDays.length)){
        current = mod(current, calendarDays.length);
      } else {
        console.log("current cell:" + current);
      }
      console.log(current);
      return current;
    });
  }

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [date]);

  const daysInMonth = getDaysInMonth(date);
  const firstDayOfMonth = getFirstDayOfMonth(date);
  const prevMonthDays = getPrevMonthDays(date);
  const calendarDays = Array.from({ length: daysInMonth + firstDayOfMonth }, (_, index) => {
    if (index < firstDayOfMonth) {
      return {day: prevMonthDays - firstDayOfMonth + index + 1, id: index};
    } else {
      return {day: index - firstDayOfMonth + 1, id: index};
    }
  });

  //TODO: Connection string is saying not read???
  const AddEvent = async (eventData, Event, connectionString) => {
    try {
      const { title, description, startTime, endTime } = eventData;
      const newEvent = new Event({
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      });
      await newEvent.save();
      console.log('Event added successfully');
    } catch (err) {
      console.error('Error adding event:', err);
    }
  };  
  
  const EditEvent = (index, updatedEvent) => {
    const updatedEvents = [...events];
    updatedEvents[index] = updatedEvent;
    setEvents(updatedEvents);
  };

  const DeleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div id="calendar-container">
      <Navigation
        id="navigation-menu"
        currentDate={date}
        prevMonth={goToPrevMonth}
        nextMonth={goToNextMonth}
      />
      <div id="calendar">
        <div className="days">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className="day">
              {day}
            </div>
          ))}
        </div>
        <div className="dates">
          {calendarDays.map((day, index) => (
            <div
              key={day.id}
              className={`date ${index === selectedCell ? 'selected' : ''}`}
              onClick={() => {
                setSelectedCell(index);
              }}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={(eventData) => {
            // Handle event data submission here
            AddEvent(eventData, Event, connectionString);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );  

  // <div id="calendar">
  //       <div className="days">
  //         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
  //           <div key={day} className="day">
  //             {day}
  //           </div>
  //         ))}
  //       </div>
  //       <div className="dates">
  //         {blankCells.map((element, index) => (
  //           <div key={`blank-${index}`} className="date">{element}</div>
  //         ))}
  //         {monthDays.map((day, index) => (
  //           <div
  //             key={day}
  //             className={`date ${index === selectedCell ? 'selected' : ''}`}
  //             onClick={() => {
  //               setSelectedCell(index);
  //             }}
  //           >
  //             {day}
  //           </div>
  //         ))}
  //       </div>
  //     </div>

  return (
    <div id="calendar-container">
      <Navigation id="navigation-menu" currentDate={date} prevMonth={goToPrevMonth} nextMonth={goToNextMonth} ></Navigation>
      <div id="calendar">
        <div className="days">
          {console.log(selectedCell)}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className={"day"}>{day}</div>
          ))}
        </div>
        <div className="dates">
          {blankCells.map((cell, index) => (
            <div key={index} className="date empty"></div>
          ))}
          {monthDays.map((day, index) => (
            <div key={day} className={"date "+ (index == selectedCell ? "selected" : "")}>{day}</div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div id="calendar-container">
      <Navigation id="navigation-menu" currentDate={date} prevMonth={goToPrevMonth} nextMonth={goToNextMonth}></Navigation>
      <div id="calendar">
        {/* ... */}
      </div>
      {modal && <Modal onClose={() => setModal(false)} onSubmit={addEvent} />}
    </div>
  );
};


