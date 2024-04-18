"use client";

import React, { useState } from 'react';
import mongoose from 'mongoose';
import { useEffect } from 'react';
// import Navigation from '../navigation/navigation';
// import Modal from '../modal/modal';
import { model, connectionURI } from '../mongo/db.mjs';

export default function Event() {

    return (
        <div className="event">
            <input type="text" className="event-input" placeholder="Enter event here..."></input>
        </div>
    );  
};


