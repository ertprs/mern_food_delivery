import React, { useEffect, useState } from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import CheckoutAddress from "./CheckoutAddress";
import { setAddressAction } from "../../../Redux/action/user.action";
import { useSelector, useDispatch } from "react-redux";

const Checkout = ({ userCartData, totalPrice, userData, cartRes }) => {
  // const dispatch = useDispatch();
  // const homeAddress = {
  //   address: userData?.homeAddress?.address,
  //   latitude: userData?.homeAddress?.latitude,
  //   longitude: userData?.homeAddress?.longitude,
  // };

  // useEffect(() => {
  //   const loadSpots = async () => {
  //     await dispatch(setAddressAction(homeAddress));
  //   };
  //   loadSpots();
  // }, [dispatch]);

  return (
    <div className="checkout_container">
      <div className="checkout_box">
        <div className="checkout_box_left">
          <CheckoutAddress userData={userData} cartRes={cartRes} />
        </div>
        <div className="checkout_box_right">
          <CheckoutProduct
            userCartData={userCartData}
            totalPrice={totalPrice}
            cartRes={cartRes}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
