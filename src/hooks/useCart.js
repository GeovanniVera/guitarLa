import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db"

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }
    // State
    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    // Funciones descriptivas
    function addToCart(item) {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id);

        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            // Si el item ya existe, lo actualizamos
            const updateCart = [...cart]; // Creamos una copia del carrito
            updateCart[itemExist].quantity++; // Incrementamos la cantidad
            setCart(updateCart); // Actualizamos el estado con la copia modificada
        } else {
            // Si el item no existe, lo agregamos con una cantidad inicial de 1
            const newItem = { ...item, quantity: 1 };
            setCart([...cart, newItem]); // Agregamos el nuevo item al carrito
        }
    }


    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id != id))
    }

    function increseQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function decreseQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {

                return {
                    ...item,
                    quantity: item.quantity - 1

                }
            }
            return item
        })
        setCart(updateCart)
    }

    function emptyCart(e) {
        setCart([])
    }
    useEffect(() => {
        setData(db);
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const isEmpty = useMemo(() => cart.length === 0, [cart])//State derivado
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increseQuantity,
        decreseQuantity,
        emptyCart,
        isEmpty,
        cartTotal
    }
}