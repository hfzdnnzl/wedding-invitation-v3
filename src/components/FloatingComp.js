import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faCalendarAlt, faPhone, faMapMarkerAlt, faEnvelope, faVolumeHigh, faVolumeMute } 
from '@fortawesome/free-solid-svg-icons';
// import Location from './slide-up/Location';
// import Rsvp from './slide-up/Rsvp';
// import Contacts from './slide-up/Contacts';
// import Calendar from './slide-up/Calendar';
import styles from '@styles/NavBar.module.css';
import { Snowfall } from 'react-snowfall';

const FloatingComp = ({ snow_color }) => {
  const [isLocationOpen, setLocationOpen] = useState(false); 
  const [isRsvpOpen, setRsvpOpen] = useState(false); 
  const [isContactsOpen, setContactsOpen] = useState(false); 
  const [isCalendarOpen, setCalendarOpen] = useState(false); 
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };
  
  function openLocation() {
    setLocationOpen(true);
    document.body.classList.add("no-scroll"); // Disable scrolling when open
  }

  function openRSVP() {
    setRsvpOpen(true);
    document.body.classList.add("no-scroll"); // Disable scrolling when open
  }

  function openContacts() {
    setContactsOpen(true);
    document.body.classList.add("no-scroll");
  }

  function openCalendar() {
    setCalendarOpen(true);
    document.body.classList.add("no-scroll");
  }
  
  return (
    <>
      <div className={styles["navbar"]} data-aos="fade-up" data-aos-offset="0" data-aos-once="true">
        <button onClick={() => window.location.reload()}>
          <FontAwesomeIcon icon={faSync} size="1x" />
          <span>Refresh</span>
        </button>
        <button onClick={openCalendar}>
          <FontAwesomeIcon icon={faCalendarAlt} size="1x" />
          <span>Kalendar</span>
        </button>
        <button onClick={openContacts}>
          <FontAwesomeIcon icon={faPhone} size="1x" />
          <span>Hubungi</span>
        </button>
        <button onClick={openLocation}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />
          <span>Lokasi</span>
        </button>
        <button onClick={openRSVP}>
          <FontAwesomeIcon icon={faEnvelope} size="1x" />
          <span>RSVP</span>
        </button>
      </div>   

      {/* Mute/Unmute Button */}
      <div className={styles['music-btn']} data-aos="fade-left" data-aos-offset="0" data-aos-once="true">
        <button onClick={toggleMute} className="btn bg-[#212529] hover:bg-[#343a40]">
          {isMuted ? (<FontAwesomeIcon icon={faVolumeMute} size="1x" />) : (<FontAwesomeIcon icon={faVolumeHigh} size="1x" />)}
          
        </button>
      </div>


      {/* <audio ref={audioRef} autoPlay loop>
        <source src={`${process.env.PUBLIC_URL}/assets/music/wedding_song.mp3`}  type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> */}

      <Snowfall color={snow_color}  snowflakeCount={100} speed={[0, 0.5]} 
      wind={[-1, 1]} radius={[0.5, 5]} style={{position: 'fixed', width: '100vw', height: '100vh'}}/>

      {/* Sliding Location form */}
      {/* <Location isLocationOpen={isLocationOpen} setLocationOpen={setLocationOpen}></Location>
      <Rsvp isRsvpOpen={isRsvpOpen} setRsvpOpen={setRsvpOpen}></Rsvp>
      <Contacts isContactsOpen={isContactsOpen} setContactsOpen={setContactsOpen}></Contacts>
      <Calendar isCalendarOpen={isCalendarOpen} setCalendarOpen={setCalendarOpen}></Calendar> */}
    </>

  );
};

export default FloatingComp;

