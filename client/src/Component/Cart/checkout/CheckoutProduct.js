import React, { useEffect, useState } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import Nonvegicon from "../../Icon/Nonvegicon";
import Vegicon from "../../Icon/Vegicon";
import { RiPercentLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../../helper";
import {
  addToCartAction,
  getCartAction,
  decreaseCartItemAction,
} from "../../../Redux/action/cart.action";

const CheckoutProduct = ({ userCartData, totalPrice, cartRes }) => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [userCart, setUserCart] = useState([]);
  const [userPosition, setUserPosition] = useState({});

  const { seleAddress } = useSelector((state) => state.setAddress);

  useEffect(() => {
    if (seleAddress) {
      setUserPosition(seleAddress);
    }
  }, [seleAddress]);

  const lat1 = userPosition.latitude;
  const lon1 = userPosition.longitude;
  const lat2 = cartRes.latitude;
  const lon2 = cartRes.longitude;

  function getDistanceFromLatLonInKm(lat1, lat2, lon1, lon2) {
    var R = 6371;
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  const deliveryFee =
    (Math.round(getDistanceFromLatLonInKm(lat1, lat2, lon1, lon2) * 10) / 10) *
    7;

  return (
    <>
      <div className="restaurant_cart_details">
        <img src="/images/restaurantimage.jfif" />
        <div className="restaurant_info">
          <h3>Falahaar & Kota Kachori</h3>
          <p>Banaswadi</p>
          <div className="cartSpacer"></div>
        </div>
      </div>
      <div className="checkout_cart_box">
        {userCartData &&
          userCartData?.map((cart, index) => (
            <div className="single_cart_box active" key={index}>
              {cart.product.isVeg ? <Vegicon /> : <Nonvegicon />}
              <div className="product_name">
                <p>{cart.product.name}</p>
              </div>
              <div className="quantity_box">
                <RemoveIcon
                  className="minusIcon"
                  onClick={() => {
                    const cartItem = {
                      product: cart.product._id,
                      quantity: 1,
                      price: cart.product.price,
                    };
                    dispatch(decreaseCartItemAction(cartItem, token));
                  }}
                />
                <p>{cart.quantity}</p>
                <AddIcon
                  className="plusIcon"
                  onClick={() => {
                    const cartItem = {
                      product: cart.product._id,
                      quantity: 1,
                      price: cart.product.price,
                    };
                    dispatch(addToCartAction(cartItem, token));
                  }}
                />
              </div>
              <p>
                <span>&#x20B9;</span>
                {cart.price}
              </p>
            </div>
          ))}
        <input
          type="text"
          placeholder="Any suggestions? we will pass it on..."
        />
        <div className="apply_coupon_box">
          <RiPercentLine className="percentageIcontwo" />
          <h5>Apply Coupon</h5>
        </div>

        <div className="checkout_price_details">
          <h4>Bill Details</h4>
          <div className="checkout_price_box">
            <p>Item Total</p>
            <p>
              <span>&#x20B9;</span>
              {totalPrice}
            </p>
          </div>
          <div className="checkout_price_box">
            <p>
              Delivery Partner Fee for &nbsp;
              {Math.round(
                getDistanceFromLatLonInKm(lat1, lat2, lon1, lon2) * 10
              ) / 10}
              &nbsp; kms
            </p>
            <p>
              <span>&#x20B9;</span>
              {deliveryFee}
            </p>
          </div>
          <div className="cartSpacerline"></div>
          <div className="checkout_price_box">
            <p>Taxes and Charges</p>
            <p>
              <span>&#x20B9;</span>
              {cartRes.taxPrice}
            </p>
          </div>
        </div>
      </div>
      <div className="total_price_tab">
        <h4>TO PAY</h4>
        <h4>&#x20B9; {totalPrice + deliveryFee + cartRes.taxPrice}</h4>
      </div>
    </>
  );
};

export default CheckoutProduct;
