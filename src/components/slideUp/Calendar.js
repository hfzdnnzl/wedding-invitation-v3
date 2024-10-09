import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as GoogleCalendarIcon } from '@assets/icons/icons8-google.svg';
import { ReactComponent as AppleIcon } from '@assets/icons/icons8-apple.svg';

const Calendar = ({ wedding_data, isCalendarOpen, setCalendarOpen }) => {
    function closeCalendar() {
        setCalendarOpen(false);
        document.body.classList.remove("no-scroll");
    }

    const downloadICSFile = () => {
        const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:${wedding_data.calendar.apple.email}
BEGIN:VEVENT
UID:${wedding_data.calendar.apple.time_start}-${wedding_data.calendar.apple.email}
SUMMARY:${wedding_data.calendar.apple.title}
DTSTART;TZID=${wedding_data.calendar.apple.time_zone}:${wedding_data.calendar.apple.time_start}
DTEND;TZID=${wedding_data.calendar.apple.time_zone}:${wedding_data.calendar.apple.time_end}
LOCATION:${wedding_data.calendar.apple.location_name} Search Nearby
DESCRIPTION:${wedding_data.calendar.apple.description}\\n\\nLocation: ${wedding_data.calendar.apple.location_url}
BEGIN:VALARM
ACTION:DISPLAY
TRIGGER:-P1D
END:VALARM
END:VEVENT
END:VCALENDAR
        `;
      
        const blob = new Blob([icsContent.trim()], { type: 'text/calendar' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Majlis.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      

    return (
        <>
        {/* Dark background overlay */}
        {(isCalendarOpen) && <div className="slide-up-bg" onClick={closeCalendar}></div>}

        {/* Sliding Location form */}
        <div className={`slide-up-container ${isCalendarOpen ? "show" : ""} location-container`}>
            <div className="slide-up-header">
            <h2>Calendar <FontAwesomeIcon icon={faCalendarAlt} /></h2>
            <p>{wedding_data.maklumat_majlis.tarikh}</p>
            </div>

            <div className="slide-up-footer calendar-footer">
                <button className="btn brand-btn btn-cal btn-dark" onClick={downloadICSFile}>
                    <div>
                    <AppleIcon/> <span>Apple Calendar</span> 
                    </div>
                    </button>
                <button className="btn brand-btn btn-cal google-btn">
                <a target='_blank' rel="noopener noreferrer" 
                    href={wedding_data.calendar.google}>
                    <GoogleCalendarIcon/> <span>Google Calendar</span>
                    </a>
                </button>
            </div>
        </div> 
        </>
    );
};

export default Calendar;