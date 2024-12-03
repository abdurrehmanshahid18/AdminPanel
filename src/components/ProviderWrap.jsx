"use client";
import { fetchOrderData } from "@/APIs/Order/getOrderData";
import { fetchProducts } from "@/APIs/Product/getProductData";
import { setCurrentUser, setLoading } from "@/Redux/Authentication/AuthSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProviderWrap = ({ children }) => {
  const dispatch = useDispatch();
  const { currUser } = useSelector((state) => state.currentUser);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    dispatch(setCurrentUser(user));
    dispatch(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (currUser) {
      fetchOrderData(dispatch, currUser?.brandName);
      fetchProducts(dispatch, currUser?.brandName);
    }
  }, [currUser]);

  return <>{children}</>;
};

export default ProviderWrap;
