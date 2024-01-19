import React, { useEffect, useState } from "react";
import '../styles/ProductPopup.css'

function ProductPopup({ onClose, onSave, initialData = {}, isEditing = false, categories }) {
    const [product, setProduct] = useState({
        NazwaProduktu: '',
        OpisProduktu: '',
        Cena: '',
        Dostepnosc: '',
        KategoriaID: '',  // Assuming this is the ID, not the name
        ZdjecieProduktu: ''
    });

    useEffect(() => {
        if (isEditing) {
            setProduct({
                NazwaProduktu: initialData.title || '',
                OpisProduktu: initialData.description || '',
                Cena: initialData.price || '',
                Dostepnosc: initialData.availability || '',
                KategoriaID: initialData.categoryId || '',  // Use the categoryId directly
                ZdjecieProduktu: initialData.image || ''
            });
        }
    }, [initialData, isEditing]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(product);
    };

    return (
        <div className="product-popup-backdrop">
            <div className="product-popup-container">
                <form onSubmit={handleSubmit}>
                    <input name="NazwaProduktu" value={product.NazwaProduktu} onChange={handleChange} placeholder="Nazwa Produktu" />
                    <input name="OpisProduktu" value={product.OpisProduktu} onChange={handleChange} placeholder="Opis Produktu" />
                    <input name="Cena" value={product.Cena} onChange={handleChange} placeholder="Cena" />
                    <input name="Dostepnosc" value={product.Dostepnosc} onChange={handleChange} placeholder="Dostepnosc" />
                    <select name="KategoriaID" value={product.KategoriaID} onChange={handleChange}>
                        <option value="">Select a Category</option>
                        {categories.map((category) => (
                            <option key={category.KategoriaID} value={category.KategoriaID}>
                                {category.NazwaKategorii}
                            </option>
                        ))}
                    </select>
                    <input name="ZdjecieProduktu" value={product.ZdjecieProduktu} onChange={handleChange} placeholder="Zdjecie" />
                    <button type="submit">Save Product</button>
                    <button onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default ProductPopup;
