"use client";

import React, { useState } from 'react';
import mongoose from 'mongoose';
import { useEffect } from 'react';
import { IconTrash } from '@tabler/icons-react';
// import Navigation from '../navigation/navigation';
// import Modal from '../modal/modal';
import { model, connectionURI } from '../mongo/db.mjs';

export default function Event({editValue, deleteEvent, propId}) {

    return (
        <div className="event">
            <input type="text" className="event-input" placeholder="Enter event here..." onchange={()=>{
                editValue(propId);
            }}></input>
            {<IconTrash color="white" size="20" onClick={()=>{
                deleteEvent(propId);
            }}/>}
        </div>
    );  
};


