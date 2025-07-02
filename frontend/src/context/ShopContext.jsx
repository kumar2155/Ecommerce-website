import React, { createContext, useEffect, useState } from "react";

const url = "http://localhost:4000"; 

const getdefaultcart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
};

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [all_product, setall_product] = useState([]);
    const [cartitems, setcartitems] = useState(getdefaultcart());
    const [authtoken, setAuthtoken] = useState(localStorage.getItem("auth-token") || null); 

    // Function to update cart from backend
    const updateCartFromServer = () => {
        if (authtoken) {
            fetch("http://localhost:4000/getcart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": authtoken,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => setcartitems(data));
        }
    };

    useEffect(() => {
        // Fetch all products
        fetch("http://localhost:4000/allproducts")
            .then((response) => response.json())
            .then((data) => setall_product(data));

        // Load cart if logged in
        updateCartFromServer();
    }, [authtoken]);

    const addtocart = (itemid) => {
        setcartitems((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
        if (authtoken) {
            fetch("http://localhost:4000/addtocart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": authtoken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemid }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                updateCartFromServer(); // Refresh cart from backend
            });
        }
    };

    const removefromcart = (itemid) => {
        setcartitems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
        if (authtoken) {
            fetch("http://localhost:4000/removefromcart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "auth-token": authtoken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemid }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                updateCartFromServer(); // Refresh cart from backend
            });
        }
    };

    const getTotalCartAmount = () => {
        let totalamount = 0;
        for (const item in cartitems) {
            if (cartitems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalamount += itemInfo.new_price * cartitems[item];
                }
            }
        }
        return totalamount;
    };

    const gettotalcartitem = () => {
        let totalitem = 0;
        for (const item in cartitems) {
            if (cartitems[item] > 0) {
                totalitem += cartitems[item];
            }
        }
        return totalitem;
    };

    const contextValue = {
        gettotalcartitem,
        getTotalCartAmount,
        all_product,
        cartitems,
        addtocart,
        removefromcart,
        url,
        authtoken,
        setAuthtoken,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
