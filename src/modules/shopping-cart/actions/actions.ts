// 'use client'
/*
cookie: cart 
{
    'uui-123': 4,
    'uui-125': 2,
    'uui-126': 7,
}
*/

import { getCookie, hasCookie, setCookie } from "cookies-next";


export const getCookieCart = (): { [id: string]: number } => {
    if (hasCookie('cart')) {
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}');
        return cookieCart;
    }
    return {};
}

export const addProductToCart = (id: string) => {
    const cookieCart = getCookieCart();
    if (cookieCart[id]) {
        cookieCart[id] = cookieCart[id] + 1;
    } else {
        cookieCart[id] = 1;
    }

    setCookie('cart',JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id: string) => {
    const cookieCart = getCookieCart();
    if (cookieCart[id]) {
      delete cookieCart[id];
    } 
    setCookie('cart',JSON.stringify(cookieCart))
}

export const removeSingleItemFromCart = (id: string) => {
    const cookieCart = getCookieCart();
    if(!cookieCart[id]) return;

    // Option 1
    const itemsInCart = cookieCart[id] - 1;
    if(itemsInCart<=0){
        delete  cookieCart[id]
    }else{
        cookieCart[id] = itemsInCart;   
    }
    setCookie('cart',JSON.stringify(cookieCart))
    
    // Option 2
    /* 
    if(cookieCart[id] === 1){
        delete  cookieCart[id]
    }
    if (cookieCart[id] > 1) {
        cookieCart[id] = cookieCart[id] - 1;
    } 
    setCookie('cart',JSON.stringify(cookieCart))
    */
}