import React, { useEffect, useState } from "react";
import CartHeader from "../../Component/Cart/CartHeader/CartHeader";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../helper";
import axios from "axios";
import Checkout from "../../Component/Cart/checkout/Checkout";
import { getCartAction } from "../../Redux/action/cart.action";
import Loading from "../../Component/Loading/Loading";

const Cart = () => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [userData, setUserData] = useState({});
  const [userCartData, setuserCartData] = useState([]);
  const [cartRes, setCartRes] = useState({});

  useEffect(() => {
    async function getUserData() {
      await await axios
        .get(`http://localhost:5000/user/get_user_data`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(
          (response) => {
            setUserData(response.data.user);
          },
          (err) => {
            console.log(err);
          }
        );
    }

    getUserData();
  }, []);

  const { addCartLoading } = useSelector((state) => state.addToCart);
  const { decreaseItemLoading } = useSelector(
    (state) => state.decreaseCartItem
  );

  useEffect(() => {
    const loadSpots = async () => {
      await dispatch(getCartAction(token));
    };
    loadSpots();
  }, [dispatch, addCartLoading, decreaseItemLoading]);

  const { userCart, cartRestaurant } = useSelector((state) => state.getCart);

  useEffect(() => {
    if (userCart) {
      setuserCartData(userCart);
    }
  }, [userCart]);

  useEffect(() => {
    if (cartRestaurant) {
      setCartRes(cartRestaurant);
    }
  }, [cartRestaurant]);

  const totalPrice =
    userCartData.length >= 1 &&
    userCartData
      ?.map((item) => item.price)
      ?.reduce((prev, next) => prev + next + 0);

  return (
    <>
      {addCartLoading || decreaseItemLoading ? <Loading /> : null}
      <CartHeader userData={userData} />
      {userCartData.length > 0 ? (
        <Checkout
          userCartData={userCartData}
          totalPrice={totalPrice}
          userData={userData}
          cartRes={cartRes}
        />
      ) : (
        <div className="empty_cart">
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            alt=""
          />
          <h4>Your cart is empty</h4>
          <p>You can go to home page to view more restaurants</p>
          <button>SEE RESTAURANTS NEAR YOU</button>
        </div>
      )}
    </>
  );
};

export default Cart;
