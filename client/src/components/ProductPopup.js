import React, { useEffect, useState } from "react";
import '../styles/ProductPopup.css'

function ProductPopup({ onClose, onSave, initialData = {}, isEditing = false, categories }) {
    const [product, setProduct] = useState({
        NazwaProduktu: '',
        OpisProduktu: '',
        Cena: '',
        Dostepnosc: '',
        KategoriaID: '',
        ZdjecieProduktu: ''
    });

    useEffect(() => {
        if (isEditing) {
            const categoryName = categories.find(cat => cat.KategoriaID === initialData.categoryId)?.NazwaKategorii || '';
            setProduct({
                NazwaProduktu: initialData.title || '',
                OpisProduktu: initialData.description || '',
                Cena: initialData.price || '',
                Dostepnosc: initialData.availability || '',
                KategoriaID: categoryName || '',
                ZdjecieProduktu: initialData.image || ''
            });
        }
    }, [initialData, isEditing, categories]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const categoryId = categories.find(cat => cat.NazwaKategorii === product.KategoriaID)?.KategoriaID;
        if (!categoryId) {
            alert("Please select a valid category.");
            return;
        }
        const updatedProduct = {
            ...product,
            KategoriaID: categoryId
        };
        onSave(updatedProduct);
    };

    return (
        <div className="product-popup-backdrop">
            <div className="product-popup-container">
                <form onSubmit={handleSubmit}>
                    <input name="NazwaProduktu" value={product.NazwaProduktu} onChange={handleChange} placeholder="Nazwa Produktu" />
                    <input name="OpisProduktu" value={product.OpisProduktu} onChange={handleChange} placeholder="Opis Produktu" />
                    <input name="Cena" value={product.Cena} onChange={handleChange} placeholder="Cena" />
                    <input name="Dostepnosc" value={product.Dostepnosc} onChange={handleChange} placeholder="Dostepnosc" />
                    <input name="KategoriaID" value={product.KategoriaID} onChange={handleChange} placeholder="Kategoria" />
                    <input name="ZdjecieProduktu" value={product.ZdjecieProduktu} onChange={handleChange} placeholder="Zdjecie" />
                    <button type="submit">Save Product</button>
                    <button onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default ProductPopup;
