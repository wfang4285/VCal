"use client";

import React, { useRef, useState } from 'react';
import mongoose from 'mongoose';
import { useEffect } from 'react';
import { IconTrash } from '@tabler/icons-react';
import Event from '../event/event';
// import Navigation from '../navigation/navigation';
// import Modal from '../modal/modal';
import { model, connectionURI } from '../mongo/db.mjs';

export default function Cell({day, events, index, selectedCell, setSelectedCell, editValue, deleteEvent, setMode, selectedEvent, setSelectedEvent}) {
    
    const refArray = useRef([]);

    useEffect(() => {
      refArray.current = refArray.current.slice(0, events.length);
    }, [events]);


    const moveFocusDown = (currentIndex) => {
      if(currentIndex < events.length - 1){
        setSelectedEvent((val) => {
          refArray[currentIndex + 1].current.focus();
          return currentIndex + 1;
        });
      }
    }

    const moveFocusUp = (currentIndex) => {
      // if(currentIndex > 0){
      //   setSelectedEvent((val) => {
      //     refArray[currentIndex - 1].current.focus();
      //     return currentIndex - 1;
      //   });
      // }
      // refArray[currentIndex + 1].current.focus();
    }
  
    return (
        <div
              className={`date ${index === selectedCell ? 'selected' : ''}`}
              onClick={() => {
                setMode("normal");
                setSelectedCell(index);
              }}
            >
              {day}
              <div className="event-list">
                {events.map((event, index2) => {
                  console.log("my index: ", index2)
                  console.log("current selectedEvent: ", selectedEvent)
                  return (
                    <Event 
                      key={index2}
                      ref={el => refArray.current[index2] = el}
                      eventIndex={index2} 
                      loadValue={event.text} 
                      editValue={editValue} 
                      deleteEvent={deleteEvent} 
                      propId={event.id} 
                      setMode={setMode}
                      selectedEvent={selectedEvent}
                      setSelectedEvent={setSelectedEvent}
                      cellIndex={index}
                      setSelectedCell={setSelectedCell}
                      moveFocusDown={moveFocusDown}
                      moveFocusUp={moveFocusUp}
                    ></Event>
                )})}
              </div>
            </div>
    );  
};
