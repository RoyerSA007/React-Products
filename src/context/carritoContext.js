import React, { createContext, useState } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carritoItems, setCarritoItems] = useState([]);

    const addToCarrito = (product) => {
        setCarritoItems(prevItems => [...prevItems, product]);
    };

    return (
        <CarritoContext.Provider value={{ carritoItems, addToCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};
