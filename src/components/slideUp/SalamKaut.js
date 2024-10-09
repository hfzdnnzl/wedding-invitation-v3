import React, { useState, useContext, useRef } from "react";
import FirebaseContext from '../../FirebaseContext'; // Import the context
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faBuildingColumns, faRightToBracket, faXmark, faQrcode, faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faClone } from '@fortawesome/free-regular-svg-icons';
import '../../styles/Cenderahati.css';

const SalamKaut = ({ isSalamKaut, setSalamKaut }) => {
    const { weddingData } = useContext(FirebaseContext);
    const [isBankDetailsOpen, setBankDetailsOpen] = useState(false);
    const [isQRDetailsOpen, setQRDetailsOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const timeoutRef = useRef(null); // Use ref to keep track of the timeout

    function openSalamKaut() {
        setBankDetailsOpen(false);
        setQRDetailsOpen(false);
        setSalamKaut(true);
    }

    function closeContainer() {
        setSalamKaut(false);
        setBankDetailsOpen(false);
        setQRDetailsOpen(false);
        document.body.classList.remove("no-scroll");
    }

    function openBankDetails() {
        setSalamKaut(false);
        setBankDetailsOpen(true);
    }

    function openQRDetails() {
        setSalamKaut(false);
        setQRDetailsOpen(true);
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setIsCopied(false); // Force popup to re-trigger by resetting state immediately

                // Clear any existing timeout
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                // Set a short timeout to allow re-render for popup
                setTimeout(() => {
                    setIsCopied(true); // Show popup

                    // Set another timeout to hide the popup after 2 seconds
                    timeoutRef.current = setTimeout(() => {
                        setIsCopied(false); // Hide popup after 2 seconds
                    }, 2000);
                }, 100); // Short delay for re-render
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    }

    return (
    <>
        {/* Dark background overlay */}
        {(isSalamKaut||isBankDetailsOpen||isQRDetailsOpen) && <div className="slide-up-bg" onClick={closeContainer}></div>}

        {/* Sliding Cenderahati */}
        <div className={`slide-up-container ${isSalamKaut ? "show" : ""}`}>
            <div className="slide-up-header">
            <h2>Salam Kaut <FontAwesomeIcon icon={faHandHoldingHeart} /></h2>
            </div>

            <div className="slide-up-footer calendar-footer">
                <button className="btn cover-box-btn btn-dark" onClick={openBankDetails}>
                <FontAwesomeIcon icon={faBuildingColumns} /> <span>Bank Transfer</span> 
                </button>
                <button className="btn cover-box-btn btn-dark" onClick={openQRDetails}>
                <FontAwesomeIcon icon={faQrcode} /> <span>QR Pay</span> 
                </button>
            </div>
        </div> 

        {/* Sliding Bank Details */}
        <div className={`slide-up-container ${isBankDetailsOpen ? "show" : ""}`}>
            <div className="slide-up-header">
            <h2>Salam Kaut <FontAwesomeIcon icon={faHandHoldingHeart} /></h2>
            <p>Maklumat Bank</p>
            </div>

            <div className='slide-up-content address-content'>
                <ul className='address-list'>
                    <li className='address-item'>
                        <span>{weddingData.cenderahati.maklumat_bank.name}</span>
                        <button onClick={() => copyToClipboard(weddingData.cenderahati.maklumat_bank.name)}>
                            <FontAwesomeIcon icon={faClone} />
                        </button>
                    </li>
                    <li className='address-item'>
                        <span>{weddingData.cenderahati.maklumat_bank.bank}</span>
                        <button onClick={() => copyToClipboard(weddingData.cenderahati.maklumat_bank.bank)}>
                            <FontAwesomeIcon icon={faClone} />
                        </button>
                    </li>
                    <li className='address-item'>
                        <span>{weddingData.cenderahati.maklumat_bank.acc_number}</span>
                        <button onClick={
                            () => copyToClipboard(weddingData.cenderahati.maklumat_bank.acc_number.replaceAll(" ", ""))
                            }>
                            <FontAwesomeIcon icon={faClone} />
                        </button>
                    </li>
                </ul>

            </div>

            <div className="slide-up-footer">
                <button className="btn btn-dark" onClick={openSalamKaut}>
                <FontAwesomeIcon icon={faRightToBracket} /> Balik
                </button>
                <button className="btn btn-dark" onClick={closeContainer}>
                <FontAwesomeIcon icon={faXmark} /> Tutup
                </button>
            </div>
        </div> 
        {isCopied && (<div className="copy-popup">Text Copied!</div>)}

        {/* Sliding QR Details */}
        <div className={`slide-up-container ${isQRDetailsOpen ? "show" : ""}`}>
            <div className="slide-up-header">
            <h2>Salam Kaut <FontAwesomeIcon icon={faHandHoldingHeart} /></h2>
            <p>Gambar QR</p>
            </div>

            <div className='slide-up-content love-gift-content'>
                <div className="order-content">
                    <div className="order-item">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/QR_code.jpeg`} alt="QR Code" />
                    </div>

                    <div className='order-item order-btns'>
                        <button className='btn btn-dark'>
                        <a href={`${process.env.PUBLIC_URL}/assets/images/QR_code.jpeg`} download="QR_code.jpeg">
                        <FontAwesomeIcon icon={faCircleDown} /> <span>Download</span> 
                        </a></button> 
                    </div>
                </div>
            </div>

            <div className="slide-up-footer">
                <button className="btn btn-dark" onClick={openSalamKaut}>
                <FontAwesomeIcon icon={faRightToBracket} /> Balik
                </button>
                <button className="btn btn-dark" onClick={closeContainer}>
                <FontAwesomeIcon icon={faXmark} /> Tutup
                </button>
            </div>
        </div> 
    </>
    );
};

export default SalamKaut;