import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export default function CartContextProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(()=>{
        if(cartProducts.length > 0){
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        }
    },[cartProducts]);

    useEffect(()=>{
        if(!cartProducts.length > 0 && localStorage.getItem('cartProducts')){
            setCartProducts(JSON.parse(localStorage.getItem('cartProducts')));
        }
    },[cartProducts])

    return(
        <CartContext.Provider value={{cartProducts,setCartProducts}}>
            {children}
        </CartContext.Provider>
    );
}