import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../../helper";
import {
  addToCartAction,
  getCartAction,
  decreaseCartItemAction,
} from "../../../Redux/action/cart.action";
import Nonvegicon from "../../Icon/Nonvegicon";
import Vegicon from "../../Icon/Vegicon";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [userCartData, setuserCartData] = useState([]);
  const [cartFixed, setCartFixed] = useState(false);

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

  const { userCart } = useSelector((state) => state.getCart);

  useEffect(() => {
    if (userCart) {
      setuserCartData(userCart);
    }
  }, [userCart]);

  const totalPrice =
    userCartData.length >= 1 &&
    userCartData
      ?.map((item) => item.price)
      ?.reduce((prev, next) => prev + next + 0);

  const changePositionHandler = () => {
    if (window.scrollY >= 320) {
      setCartFixed(true);
    } else {
      setCartFixed(false);
    }
  };

  window.addEventListener("scroll", changePositionHandler);

  return (
    <div className={cartFixed ? "cart_box_fixed" : "cart_box"}>
      {userCartData.length === 0 ? (
        <div className="cart_empty">
          <h2>Cart Empty</h2>
          <img src="/images/cart_empty.png" alt="cart empty" />
          <p>
            Good food is always cooking! Go ahead, order some yummy items from
            the menu.
          </p>
        </div>
      ) : (
        <div className="cart_details">
          <div className="cart_top_title_button">
            <h1>Cart</h1>
            <DeleteIcon className="deleteIcon" />
          </div>
          <p>{userCartData.length} ITEM</p>
          <div className="cart_items_list_container">
            {userCartData.map((cart) => (
              <div className="single_cart_box">
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
          </div>
          <div className="total_price_box">
            <div className="total_title">
              <h3>Subtotal</h3>
              <p>Extra charges may apply</p>
            </div>

            <h4>&#x20B9; {totalPrice}</h4>
          </div>
          <Link to="/cart">
            <button>
              Checkout <ArrowRightAltIcon className="arrowIcon" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
