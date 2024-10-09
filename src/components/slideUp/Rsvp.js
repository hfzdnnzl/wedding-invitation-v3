import React, { useState, useContext } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore'; // Import Firestore functions
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheckCircle, faPhone, faUser, faUserPlus, faXmark, faTriangleExclamation, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Rsvp = ({ isRsvpOpen, setRsvpOpen }) => {
    const { id } = useParams();
    const firestore = getFirestore(); // Initialize Firestore
    const { weddingData } = useContext(FirebaseContext);
    const max_pax = weddingData.maklumat_majlis.max_rsvp;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [pax, setPax] = useState(""); // Default to 1 person attending
    const [isGuestOpen, setGuestOpen] = useState(false);
    const [invalidName, setInvalidName] = useState(false);
    const [invalidPhone, setInvalidPhone] = useState(false);
    const [invalidPax, setInvalidPax] = useState(false);


    const submitAttendanceToFirestore = async (rsvpData) => {
        try {
            rsvpData.datetime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur", hour12: false });
            const guestDocRef = doc(firestore, "guests", id); // Reference to your document
            await updateDoc(guestDocRef, {attendance: arrayUnion(rsvpData)});
            console.log("RSVP Submitted to Firestore:", rsvpData);
        } catch (error) {
            console.error("Error adding RSVP to Firestore: ", error);
        }
    };

    function openRSVP(event) {
        event.preventDefault(); // Prevent form submission
        setGuestOpen(false);
        setRsvpOpen(true);
        document.body.classList.add("no-scroll"); // Disable scrolling when open
        setPax("");
        setInvalidPax(false);
    }

    function closeContainer(event) {
        event.preventDefault();
        setRsvpOpen(false);
        setGuestOpen(false);
        document.body.classList.remove("no-scroll");
        setName("");
        setPhone("");
        setPax("");
        setInvalidName(false);
        setInvalidPhone(false);
        setInvalidPax(false);
    }

    const handleNameInput = (e) => {
        const namePattern = /^[A-Za-z\s]+$/;
        const value = e.target.value;
        setInvalidName(value==="" ? false : !namePattern.test(value.trim()));
        setName(value);
    }

    const handlePhoneInput = (e) => {
        const phoneRegex = /^[0-9]{1,11}$/; // Allows only numbers with 1 to 11 digits
        const value = e.target.value;
        const cleanedValue = value.replace(' ', '');
        setInvalidPhone(cleanedValue==="" ? false : !phoneRegex.test(cleanedValue.trim()));
        setPhone(cleanedValue);
    }

    const handlePaxInput = (e) => {
        const value = e.target.value;
        const cleanedValue = value.replace(/^0+/, ''); // Remove leading zeros
        setInvalidPax(cleanedValue==="" ? false : (cleanedValue <= 0 || cleanedValue > max_pax));
        setPax(cleanedValue); // Update the state without leading zeros
      };    

    // Validate inputs and mark them as invalid if they are empty
    const validateHadir = () => {
        const phoneRegex = /^[0-9]{10,11}$/; // Allows only numbers with 10 to 11 digits
        const namePattern = /^[A-Za-z\s]+$/;
        const tempInvalidName = !namePattern.test(name.trim());
        const tempInvalidPhone = !phoneRegex.test(phone.trim());
        setInvalidName(tempInvalidName);
        setInvalidPhone(tempInvalidPhone);
        return !tempInvalidName && !tempInvalidPhone;
    };

    // Handle form submission
    const handleHadir = (event) => {
        event.preventDefault();
        if (validateHadir()) {
            setRsvpOpen(false);
            setGuestOpen(true); // Open the guest form
        }
    };

    // Handle form submission
    const handleTidak = (event) => {
        event.preventDefault();
        if (validateHadir()) {
            // Process the form data (e.g., save or send it somewhere)
            setPax("0");
            const rsvpData = { name, phone, pax: 0, hadir: false};
            submitAttendanceToFirestore(rsvpData);
            console.log("RSVP Submitted:", rsvpData);
            closeContainer(event);
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const tempInvalidPax = pax <= 0 || pax > max_pax || pax === "";
        setInvalidPax(tempInvalidPax);
        if (!tempInvalidPax) {
            // Process the form data (e.g., save or send it somewhere)
            const rsvpData = { name, phone, pax: parseInt(pax), hadir: true};
            submitAttendanceToFirestore(rsvpData);
            console.log("RSVP Submitted:", rsvpData);
            closeContainer(event);            
        }
    };

    const getInvalidNameErrorMessage = () => {
        if (invalidName && name==="") {
            return "Name cannot be empty.";
        } else if (invalidName) {
            return "Please use only letters and spaces.";
        } else {
            return null
        }
    }

    const getInvalidPhoneErrorMessage = () => {
        if (invalidPhone && phone==="") {
            return "Phone number is empty.";
        } else if (invalidPhone && (phone.length<10 || phone.length>11)) {
            return "Invalid phone number length.";
        } else if (invalidPhone) {
            return "Invalid phone number.";
        } else {
            return null
        }
    }

    const getInvalidPaxErrorMessage = () => {
        if (invalidPax && pax==="") {
            return "Guest number cannot be empty.";
        } else if (invalidPax && pax>max_pax) {
            return `Maximum ${max_pax} guests allowed`;            
        } else if (invalidPax) {
            return "Invalid number of guests.";
        } else {
            return null;
        }
    };

    return (
        <>
        {/* Dark background overlay */}
        {(isRsvpOpen || isGuestOpen) && <div className="slide-up-bg" onClick={closeContainer}></div>}

        {/* Sliding RSVP form */}
        <div className={`slide-up-container ${isRsvpOpen ? "show" : ""}`}>
            <div className="slide-up-header">
            <h2>RSVP <FontAwesomeIcon icon={faPaperPlane} /></h2>
            <p>{weddingData.maklumat_majlis.tarikh}</p>
            </div>
            <div className="slide-up-content guest-content">
                <form>
                    <div className={`input-container ${invalidName ? 'invalid' : ''}`}>
                        <div className="guest-input-logo"><FontAwesomeIcon icon={faUser} /></div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => handleNameInput(e)}
                            autoComplete='name'
                            placeholder="Nama Tetamu"
                            required
                        />
                        {invalidName && (
                            <div className='warning-logo'><FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon></div>
                        )}
                    </div>
                    <p className="error-message">
                        {getInvalidNameErrorMessage() && <>{getInvalidNameErrorMessage()}</>}
                    </p>

                    <div className={`input-container ${invalidPhone ? 'invalid' : ''}`}>
                        <div className="guest-input-logo"><FontAwesomeIcon icon={faPhone} /></div>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => handlePhoneInput(e)}
                            autoComplete='tel'
                            placeholder="Nombor Telefon"
                            required
                        />
                        {invalidPhone && (
                            <div className='warning-logo'><FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon></div>
                        )}
                    </div>
                    <p className="error-message">
                        {getInvalidPhoneErrorMessage() && <>{getInvalidPhoneErrorMessage()}</>}
                    </p>
                </form>
            </div>

            <div className="slide-up-footer">
            <button type="button" className="btn btn-red" onClick={handleTidak}><FontAwesomeIcon icon={faXmark} /> Tidak</button>
            <button type="button" className="btn btn-green" onClick={handleHadir}><FontAwesomeIcon icon={faCheckCircle} /> Hadir</button>
            </div>
        </div>

        {/* Pax details form */}
        <div className={`slide-up-container ${isGuestOpen ? "show" : ""}`}>
            <div className="slide-up-header guest-header">
                <h2>Hadir <FontAwesomeIcon icon={faCheckCircle} /></h2>
                <p>{weddingData.maklumat_majlis.tarikh}</p>
            </div>

            <div className="slide-up-content guest-content">
                <form>
                    <div className={`input-container ${invalidPax ? 'invalid' : ''}`}>
                        <div className="guest-input-logo"><FontAwesomeIcon icon={faUserPlus} /></div>
                        <input
                            type="number"
                            value={pax}
                            onChange={(e) => handlePaxInput(e)}
                            placeholder="Bilangan Tetamu"
                            min="1"
                            max="5"
                            required
                        />
                        {invalidPax && (
                            <div className='warning-logo'><FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon></div>
                            )}
                    </div>
                    <p className="error-message">
                        {getInvalidPaxErrorMessage() && <>{getInvalidPaxErrorMessage()}</>}
                    </p>
                </form>
            </div>

            <div className="slide-up-footer">
                <button type="button" className="btn btn-dark" onClick={openRSVP}><FontAwesomeIcon icon={faRightToBracket} /> Balik</button>                     
                <button type="submit" className="btn btn-green" onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane} /> Hantar</button>                     
            </div>

        </div>
        </>
    );
};

export default Rsvp;