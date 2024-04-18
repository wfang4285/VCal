"use client";

import React, { useState } from 'react';
import mongoose from 'mongoose';
import { useEffect } from 'react';
import { IconTrash } from '@tabler/icons-react';
// import Navigation from '../navigation/navigation';
// import Modal from '../modal/modal';
import { model, connectionURI } from '../mongo/db.mjs';

export default function Event({loadValue, editValue, deleteEvent, propId, setMode}) {

    return (
        <div className="event" onClick={(e)=>{
            e.stopPropagation();
            setMode("insert");
        }}>
            <input type="text" className="event-input" placeholder="Enter event here..." value={loadValue} onChange = {(e)=>{editValue(propId, e.target.value)}} onKeyUp={(e)=>{
                editValue(propId, e.target.value);
            }} autoFocus/>
            {<IconTrash color="white" size="20" onClick={()=>{
                deleteEvent(propId);
            }}/>}
        </div>
    );  
};


