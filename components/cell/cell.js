"use client";

import React, { useState } from 'react';
import mongoose from 'mongoose';
import { useEffect } from 'react';
import { IconTrash } from '@tabler/icons-react';
import Event from '../event/event';
// import Navigation from '../navigation/navigation';
// import Modal from '../modal/modal';
import { model, connectionURI } from '../mongo/db.mjs';

export default function Cell({day, events, index, selectedCell, setSelectedCell, editValue, deleteEvent, setMode}) {
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
                {events.map((event, index2) => (
                    <Event key={index2} loadValue={event.text} editValue={editValue} deleteEvent={deleteEvent} propId={event.id} setMode={setMode}></Event>
                ))}
              </div>
            </div>
    );  
};
