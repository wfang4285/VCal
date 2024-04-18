"use client";
import { IconChevronLeft } from '@tabler/icons-react';


export default function Navigation({currentDate, prevMonth, nextMonth, mode}) {
    return(
        <div id="navigation" className="flex header">
            <button className="arrow-button" onClick={prevMonth}>
                <IconChevronLeft size={20} color="white"/>
            </button>
            <span className="grow text-center">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}{mode!=="normal"?`(${mode})`:""}</span>
            <button className="arrow-button" onClick={nextMonth}>
            <IconChevronRight size={20} color="white"/>
            </button>
        </div>
    );

}