import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Contacts = ({ isContactsOpen, setContactsOpen }) => {
    const { weddingData } = useContext(FirebaseContext);
    const contacts = weddingData.contacts;

    function closeContacts() {
        setContactsOpen(false);
        document.body.classList.remove("no-scroll");
    }

    return (
        <>
        {/* Dark background overlay */}
        {(isContactsOpen) && <div className="slide-up-bg" onClick={closeContacts}></div>}

        <div className={`slide-up-container ${isContactsOpen ? "show" : ""}`}>
            <div className="slide-up-header">
                <h2>Contacts <FontAwesomeIcon icon={faUser} /></h2>
            </div>

            <div className='slide-up-content'>
                <ul className="contacts-list">
                    {contacts.map((item, index) => (
                        <li key={index} className="contacts-item">
                            <div className='contacts-details'>
                                <div className='contacts-name'>{item.name}</div>
                                <div className='contacts-role'>{item.role}</div>
                            </div>
                            <button type="button" className='btn btn-contacts btn-call'>
                                <a href={`tel:+6${item.tel}`}>
                                <FontAwesomeIcon icon={faPhone}/></a>
                            </button>
                            <button type="button" className='btn btn-contacts btn-ws'>
                                <a href={`https://wa.me/6${item.tel}`} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faWhatsapp}/></a>
                            </button>
                        </li>
                    ))}
                </ul>                
            </div>
        </div>    
        </>

    );
};

export default Contacts;
