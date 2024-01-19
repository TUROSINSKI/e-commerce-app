import React, { useState } from 'react';
import '../styles/CategoryPopup.css'

function AddCategoryPopup({ onSave, onClose }) {
    const [categoryName, setCategoryName] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();
        onSave(categoryName);
    };

    return (
        <div className="product-popup-backdrop">
        <div className="product-popup-container">
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <button type="submit">Add Category</button>
                <button onClick={onClose}>Close</button>
            </form>
        </div>
        </div>
    );
}

export default AddCategoryPopup;
