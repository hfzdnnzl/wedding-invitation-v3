import React, { useState, useRef, useContext } from 'react';
import FirebaseContext from '../../FirebaseContext'; // Import the context
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faGift, faRightToBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../../styles/Cenderahati.css';

const Cenderahati = ({ isCenderahatiOpen, setCenderahatiOpen }) => {
    const { weddingData } = useContext(FirebaseContext);
    const [isWishlistOpen, setWishlistOpen] = useState(false);
    const [isOrderOpen, setOrderOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [wishlist, setWishlist] = useState({ src: "", alt: "", url: "" });
    const timeoutRef = useRef(null); // Use ref to keep track of the timeout
    
    function openCenderahati() {
        setWishlistOpen(false);
        setCenderahatiOpen(true);
    }

    function openWishlist() {
        setCenderahatiOpen(false);
        setOrderOpen(false);
        setWishlistOpen(true);
    }

    function closeContainer() {
        setCenderahatiOpen(false);
        setWishlistOpen(false);
        setOrderOpen(false);
        document.body.classList.remove("no-scroll");
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

    const handleWishlistClick = (item) => {
        console.log(`Image clicked: ${item.src}`);
        // Implement the action on click, e.g., open a modal or redirect
        setWishlist(item);
        setCenderahatiOpen(false);
        setWishlistOpen(false);
        setOrderOpen(true);
    };
    

    return (
        <>
        {/* Dark background overlay */}
        {(isCenderahatiOpen||isWishlistOpen||isOrderOpen) && <div className="slide-up-bg" onClick={closeContainer}></div>}

        {/* Sliding Cenderahati */}
        <div className={`slide-up-container ${isCenderahatiOpen ? "show" : ""}`}>
            <div className="slide-up-header">
            <h2>Cenderahati <FontAwesomeIcon icon={faGift} /></h2>
            <p>Alamat Penerima</p>
            </div>

            <div className='slide-up-content address-content'>
                <ul className='address-list'>
                    <li className='address-item'>
                        <span>{weddingData.cenderahati.maklumat_penerima.nama}</span>
                        <button onClick={() => copyToClipboard(weddingData.cenderahati.maklumat_penerima.nama)}>
                            <FontAwesomeIcon icon={faClone} />
                        </button>
                    </li>
                    <li className='address-item'>
                        <span>{weddingData.cenderahati.maklumat_penerima.tel}</span>
                        <button onClick={() => copyToClipboard(weddingData.cenderahati.maklumat_penerima.tel)}>
                            <FontAwesomeIcon icon={faClone} />
                        </button>
                    </li>
                    <li className='address-item'>
                        <span>{weddingData.cenderahati.maklumat_penerima.alamat}</span>
                        <button onClick={() => copyToClipboard(weddingData.cenderahati.maklumat_penerima.alamat)}>
                            <FontAwesomeIcon icon={faClone} />
                        </button>
                    </li>
                </ul>

            </div>

            <div className="slide-up-footer">
                <button className="btn cover-box-btn btn-dark" onClick={openWishlist}>
                <FontAwesomeIcon icon={faGift} /> <span>Wishlist Pengantin</span> 
                </button>
            </div>
        </div> 
        {isCopied && (<div className="copy-popup">Text Copied!</div>)}

        {/* Sliding Wishlist */}
        <div className={`slide-up-container ${isWishlistOpen ? "show" : ""}`}>
            <div className="slide-up-header">
            <h2>Wishlist <FontAwesomeIcon icon={faGift} /></h2>
            <p>Pilih hadiah untuk tempah</p>
            </div>

            <div className='slide-up-content love-gift-content'>
                <div className='image-gallery'>
                    {weddingData.cenderahati.wishlist.map((image, index) => (
                    <div key={index} className="image-container">
                        <button className='img-button' onClick={() => handleWishlistClick(image)}>
                        <img src={require(`../../../public/assets/images/${image.src}`)} alt={image.alt} className="gallery-image" />
                        </button>                        
                    </div>
                    ))}                    
                </div>
            </div>
            
            <div className="slide-up-footer">
                <button className="btn btn-dark" onClick={openCenderahati}>
                <FontAwesomeIcon icon={faRightToBracket} /> Balik
                </button>
                <button className="btn btn-dark" onClick={closeContainer}>
                <FontAwesomeIcon icon={faXmark} /> Tutup
                </button>
            </div>
        </div> 

        {/* Sliding Order */}
        <div className={`slide-up-container ${isOrderOpen ? "show" : ""}`}>
            <div className="slide-up-header">
            <h2>Wishlist <FontAwesomeIcon icon={faGift} /></h2>
            <p>Maklumkan tempahan</p>
            </div>

            <div className='slide-up-content love-gift-content'>
                <div className='order-content'>
                    <div className="order-item">
                        {wishlist.src!=="" && (
                            <img src={require(`../../../public/assets/images/${wishlist.src}`)} 
                            alt={wishlist.alt} />                            
                        )}
                    </div>

                    <div className='order-item order-btns'>
                        <button className='btn btn-dark'><a href={wishlist.url} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> <span>Link</span> 
                        </a></button> 
                        <button className='btn ws-btn'>
                            <a href={`https://wa.me/6${weddingData.cenderahati.maklumat_penerima.tel}`} 
                            target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp}/> <span>Maklum</span>
                        </a></button> 
                    </div>
                </div>
            </div>

            <div className="slide-up-footer">
                <button className="btn btn-dark" onClick={openWishlist}>
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

export default Cenderahati;