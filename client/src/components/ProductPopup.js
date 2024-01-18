import React, { useState } from "react";
import '../styles/ProductPopup.css'

function ProductPopup({ onClose, onSave }) {
    const [newProduct, setNewProduct] = useState({
        NazwaProduktu: '',
        OpisProduktu: '',
        Cena: '',
        Dostepnosc: '',
        KategoriaID: '',
        ZdjecieProduktu: ''
    });

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(newProduct);
    };

    return (
        <div className="product-popup-backdrop">
            <div className="product-popup-container">
                <form onSubmit={handleSubmit}>
                    <input name="NazwaProduktu" value={newProduct.NazwaProduktu} onChange={handleChange} placeholder="Nazwa Produktu" />
                    <input name="OpisProduktu" value={newProduct.OpisProduktu} onChange={handleChange} placeholder="Opis Produktu" />
                    <input name="Cena" value={newProduct.Cena} onChange={handleChange} placeholder="Cena" />
                    <input name="Dostepnosc" value={newProduct.Dostepnosc} onChange={handleChange} placeholder="Dostepnosc" />
                    <input name="KategoriaID" value={newProduct.KategoriaID} onChange={handleChange} placeholder="Kategoria" />
                    <input name="ZdjecieProduktu" value={newProduct.ZdjecieProduktu} onChange={handleChange} placeholder="Zdjecie" />
                    <button type="submit">Save Product</button>
                    <button onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default ProductPopup;
