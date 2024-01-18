import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import '../styles/ProductDetails.css'
import { useAuth } from "../AuthContext";
import ProductPopup from "./ProductPopup";

function ProductDetails() {

    const location = useLocation();
    const productDetails = location.state;
    const { userData } = useAuth(); // Assuming you're using AuthContext
    const [ocena, setOcena] = useState(0);
    const [komentarz, setKomentarz] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [reviewUserDetails, setReviewUserDetails] = useState({});

    const [categories, setCategories] = useState([
        { KategoriaID: 1, NazwaKategorii: 'Elektronika' },
        { KategoriaID: 2, NazwaKategorii: 'Książki' },
        { KategoriaID: 3, NazwaKategorii: 'Odzież' },
        { KategoriaID: 4, NazwaKategorii: 'Dom i Ogród' },
    ]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userDetails = {};
            for (const review of productDetails.reviews) {
                try {
                    const response = await fetch(`http://localhost:5000/api/findUser/${review.UzytkownikID}`);
                    if (!response.ok) {
                        throw new Error('User fetch failed');
                    }
                    const userData = await response.json();
                    userDetails[review.UzytkownikID] = userData;
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
            setReviewUserDetails(userDetails);
        };

        if (productDetails.reviews && productDetails.reviews.length > 0) {
            fetchUserDetails();
        }
    }, [productDetails.reviews]);

    if (!productDetails) {
        return <div>Loading...</div>;
    }

    const handleEditProduct = async (editedProduct) => {
        try {
            const response = await fetch(`http://localhost:5000/api/editProduct/${productDetails.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProduct)
            });
    
            if (!response.ok) {
                throw new Error('Product could not be edited');
            }
    
            const result = await response.json();
            console.log('Product edited successfully:', result);
            setShowEditPopup(false);
            // Update your product details state or re-fetch product details
    
        } catch (error) {
            console.error('Error during editing product:', error);
            alert('Error while editing the product');
        }
    };
    

    const handleAddReview = async () => {
        if (!userData) {
            alert("You need to be logged in to add a review.");
            return;
        }

        const uzytkownikID = userData[0].UzytkownikID; // Assuming this is how you store user ID

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
    const { id, title, description, image, price, reviews, availability, categoryId } = productDetails;

    return (
        <div className="productDetails">
            <h2 className="productDetails__title">{title}</h2>
            <p className="productDetails__price">Price: zł{price}</p>
            <img className="productDetails__image" src={image} alt={title} />
            <p>{description}</p>
            <div>
                <button onClick={() => setShowEditPopup(true)}>Edit Product</button>
                {showEditPopup && (
                    <ProductPopup
                        initialData={productDetails}
                        onSave={handleEditProduct}
                        onClose={() => setShowEditPopup(false)}
                        isEditing={true}
                        categories={categories}
                    />
                )}

                <button onClick={() => setShowPopup(true)}>Add Review</button>
                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <h3>Add a Review</h3>
                            <input type="number" min={1} max={5} value={ocena} onChange={(e) => setOcena(e.target.value)} placeholder="Rating" />
                            <textarea value={komentarz} onChange={(e) => setKomentarz(e.target.value)} placeholder="Comment"></textarea>
                            <button onClick={handleAddReview}>Submit Review</button>
                            <button onClick={() => setShowPopup(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="productDetails_UserOpinions">
                {reviews && reviews.map((review, index) => (
                    <div key={index} className="productDetails__review">
                        <strong>{reviewUserDetails[review.UzytkownikID] ? `${reviewUserDetails[review.UzytkownikID].Imie} ${reviewUserDetails[review.UzytkownikID].Nazwisko}` : 'Loading...'}</strong>
                        <div className="productDetails__rating">
                            {Array(review.Ocena).fill().map((_, i) => (
                                <span key={i}>⭐</span>
                            ))}
                        </div>
                        <p><strong>Review:</strong> {review.Komentarz}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductDetails