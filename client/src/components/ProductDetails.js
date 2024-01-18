import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import '../styles/ProductDetails.css'
import { useAuth } from "../AuthContext";

function ProductDetails() {

    const location = useLocation();
    const productDetails = location.state;
    const { userData } = useAuth(); // Assuming you're using AuthContext
    const [ocena, setOcena] = useState(0);
    const [komentarz, setKomentarz] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    if (!productDetails) {
        return <div>Loading...</div>;
    }

    const handleAddReview = async () => {
        if (!userData) {
            alert("You need to be logged in to add a review.");
            return;
        }

        const uzytkownikID = userData[0].UzytkownikID; // Assuming this is how you store user ID
        console.log(uzytkownikID);
        console.log(ocena);
        console.log(komentarz);

        try {
            const response = await fetch('http://localhost:5000/api/addReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ UzytkownikID: uzytkownikID, ProduktID: id, Ocena: ocena, Komentarz: komentarz }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Review added successfully:', result);
            setShowPopup(false);
            // Handle successful addition of review (e.g., show a message to the user, clear the form, etc.)

        } catch (error) {
            console.error('Error during adding review:', error);
            alert('Error while adding the review');
        }
    };

    // Destructure the properties from productDetails
    const { id, title, image, price, rating, comment } = productDetails;

    return (
        <div className="productDetails">
            <h2 className="productDetails__title">{title}</h2>
            <p className="productDetails__price">Price: zł{price}</p>
            <img className="productDetails__image" src={image} alt={title} />
            <div>
            <button onClick={() => setShowPopup(true)}>Add Review</button>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Add a Review</h3>
                        <input type="number" value={ocena} onChange={(e) => setOcena(e.target.value)} placeholder="Rating" />
                        <textarea value={komentarz} onChange={(e) => setKomentarz(e.target.value)} placeholder="Comment"></textarea>
                        <button onClick={handleAddReview}>Submit Review</button>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
            <div className="productDetails_UserOpinions">
                <div className="productDetails__rating">
                    {Array(rating).fill().map((_, i) => (
                        <span key={i}>⭐</span>
                    ))}
                </div>
                <p className="productDetails__comment">{comment}</p>
            </div>
        </div>
    )
}

export default ProductDetails