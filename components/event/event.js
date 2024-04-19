"use client";

import React, { useState } from 'react';
import mongoose from 'mongoose';
import { useEffect } from 'react';
import { IconTrash } from '@tabler/icons-react';
// import Navigation from '../navigation/navigation';
// import Modal from '../modal/modal';
import { model, connectionURI } from '../mongo/db.mjs';


export default function Event({loadValue, editValue, deleteEvent, propId, setMode, selectedEvent, cellIndex, eventIndex, setSelectedEvent, setSelectedCell, moveFocusDown, moveFocusUp}) {
    const [lastValue, setLastValue] = useState("");

    return (
        <div className={eventIndex === selectedEvent ? 'event selected' : 'event'} onClick={(e)=>{
            e.stopPropagation();
            setMode("insert");
            
        }}>
            <input type="text" className="event-input" placeholder="Enter event here..." value={loadValue} onChange = {(e)=>{
                editValue(propId, e.target.value)
            }} onKeyDown={(e)=>{
                console.log("last value: '" + e.target.value+"'");
                setLastValue(e.target.value);
                if(e.key === "ArrowDown"){
                    moveFocusDown();
                } else if(e.key === "ArrowUp"){
                    moveFocusUp();
                }
            }}onKeyUp={(e)=>{
                if(e.key === "Backspace" && lastValue === ""){
                    deleteEvent(propId);
                } else {
                    editValue(propId, e.target.value);
                }
            }} onFocus={(e)=>{
                setSelectedEvent(eventIndex);
                setSelectedCell(cellIndex);
            }} autoFocus/>
            {<IconTrash color="white" size="20" onClick={()=>{
                deleteEvent(propId);
            }}/>}
        </div>
    );  
};


