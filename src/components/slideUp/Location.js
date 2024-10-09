import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import WazeIcon from '@assets/icons/icons8-waze.svg';
import GoogleMapsIcon from '@assets/icons/icons8-google-maps.svg';

const Location = ({ wedding_data, isLocationOpen, setLocationOpen }) => {
    function closeLocation() {
        setLocationOpen(false);
        document.body.classList.remove("no-scroll");
    }

    return (
        <>
        {/* Dark background overlay */}
        {(isLocationOpen) && <div className="slide-up-bg" onClick={closeLocation}></div>}

        {/* Sliding Location form */}
        <div className={`slide-up-container ${isLocationOpen ? "show" : ""}`}>
            <div className="slide-up-header">
            <h2>Location <FontAwesomeIcon icon={faMapMarkerAlt} /></h2>
            <p>{wedding_data.maklumat_majlis.alamat}</p>
            </div>

            {/* Responsive iframe container */}
            <div className="slide-up-content flex justify-center items-center w-full h-[40vh] p-[10px] px-[20px] box-border">
                <iframe 
                className="w-full h-full max-w-[600px] border-2 border-[#e0e0e0] rounded-[10px]"
                src={wedding_data.lokasi.google_maps_iframe}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
                ></iframe>
            </div>

            <div className="slide-up-footer">
                <button className="btn location-btn bg-[#33CCFF] hover:bg-[#29ABE2]">
                    <a 
                    target='_blank' rel="noopener noreferrer" 
                    href={wedding_data.lokasi.waze}>
                    <WazeIcon className="mr-[5px]"/><span>Waze</span> 
                    </a>
                    </button>
                <button className="btn location-btn bg-[#f9f9f9] hover:bg-[#f3f3f3]">
                    <a 
                    target='_blank' rel="noopener noreferrer" 
                    href={wedding_data.lokasi.google_maps}>
                    <GoogleMapsIcon className="mr-[5px]"/><span>Google Maps</span> 
                    </a>
                </button>
            </div>
        </div> 
        </>
    );
};

export default Location;