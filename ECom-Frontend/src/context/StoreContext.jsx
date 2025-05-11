import { createContext, useEffect, useState } from "react";
import { fetchProductList } from "../service/productService";
import axios from "axios";
import {
  addToCart,
  getCartData,
  removeQtyFromCart,
} from "../service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [productList, setProductList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");

  const increaseQty = async (productId) => {
    setQuantities((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    await addToCart(productId, token);
  };

  const decreaseQty = async (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 0 ? prev[productId] - 1 : 0,
    }));
    await removeQtyFromCart(productId, token);
  };

  const removeFromCart = (productId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantitites = { ...prevQuantities };
      delete updatedQuantitites[productId];
      return updatedQuantitites;
    });
  };

  const loadCartData = async (token) => {
    const items = await getCartData(token);
    setQuantities(items);
  };

  const contextValue = {
    productList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    token,
    setToken,
    setQuantities,
    loadCartData,
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchProductList();
      setProductList(data);
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
