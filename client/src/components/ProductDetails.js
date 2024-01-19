import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ProductDetails.css'
import { useAuth } from "../AuthContext";
import ProductPopup from "./ProductPopup";

function ProductDetails() {

    const location = useLocation();
    const productDetails = location.state;
    const { userData } = useAuth();
    const [ocena, setOcena] = useState(0);
    const [komentarz, setKomentarz] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [reviewUserDetails, setReviewUserDetails] = useState({});
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = () => {
        fetch('http://localhost:5000/api/getCategory')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching categories');
                }
                return response.json();
            })
            .then(categories => {
                setCategories(categories);
                console.log(categories);
            })
            .catch(err => {
                console.log(err.message);
            })
    };


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
            console.log('User details after fetch:', userDetails);
            setReviewUserDetails(userDetails);
        };

        if (productDetails.reviews && productDetails.reviews.length > 0) {
            fetchUserDetails();
        }
    }, [productDetails.reviews]);

    if (!productDetails) {
        return <div>Loading...</div>;
    }

    const handleDeleteProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/deleteProduct/${productDetails.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            console.log('Product deleted successfully');
            navigate('/');
        } catch (error) {
            console.error('Error during deleting product:', error);
            alert('Error while deleting the product');
        }
    };

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

        const uzytkownikID = userData[0].UzytkownikID;

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

        } catch (error) {
            console.error('Error during adding review:', error);
            alert('Error while adding the review');
        }
    };

    const { id, title, description, image, price, reviews, availability, categoryId } = productDetails;

    return (
        <div className="productDetails">
            <div className="productDetails__titleContainer">
                <h2 className="productDetails__title">{title}</h2>
            </div>
            <p className="productDetails__price"><strong>Price:</strong> <small>zł</small>{price}</p>
            <img className="productDetails__image" src={image} alt={title} />
            <p className="productDetails__description"><h3>Description:</h3>{description}</p>
            <div className="productDetails__buttonColumn">
                {userData && userData[0].rola === 'admin' && (
                    <>
                        <button className="productDetails__editButton" onClick={() => setShowEditPopup(true) & fetchCategories()}>Edit Product</button>
                        {showEditPopup && (
                            <ProductPopup
                                initialData={productDetails}
                                onSave={handleEditProduct}
                                onClose={() => setShowEditPopup(false)}
                                isEditing={true}
                                categories={categories}
                            />
                        )}
                        <button className="productDetails__deleteButton" onClick={handleDeleteProduct}>Delete Product</button>
                    </>
                )}


                <button className="productDetails__addButton" onClick={() => setShowPopup(true)}>Add Review</button>
                {showPopup && (
                    <div className="popup">
                        <div className="popup__content">
                            <h2>Add a Review</h2>
                            <p><strong>Star rating</strong></p>
                            <select value={ocena} onChange={(e) => setOcena(e.target.value)} placeholder="Rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>

                            <textarea
                                value={komentarz}
                                onChange={(e) => setKomentarz(e.target.value)}
                                placeholder="Comment"
                                className="comment-textarea"
                            ></textarea>
                            <button className="popup__buttonSubmit" onClick={handleAddReview}>Submit Review</button>
                            <button className="popup__buttonClose" onClick={() => setShowPopup(false)}>Close</button>
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