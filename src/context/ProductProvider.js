import React, { createContext } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { actionTypes } from "../state/ProductState/actionTypes";
import {
  initilastate,
  productReducer,
} from "../state/ProductState/productReducer";
const PRODUCT_CONTEXT = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initilastate);
  console.log(state);

  useEffect(() => {
    dispatch({ type: actionTypes.FETCHING_START });
    fetch("http://localhost:5000/api/v1/products")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data.data })
      )
      .catch(() => {
        dispatch({ type: actionTypes.FETCHING_ERROR });
      });
  }, []);

  const value = {
    state,
    dispatch,
  };
  return (
    <PRODUCT_CONTEXT.Provider value={value}>
      {children}
    </PRODUCT_CONTEXT.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(PRODUCT_CONTEXT);
  return context;
};

export default ProductProvider;
