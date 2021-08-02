import React, { useEffect, useRef, useState } from "react";
import "./CartHeader.css";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";

const CartHeader = ({ userData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownHandler = () => {
    setDropdownOpen(!dropdownOpen);
  };

  let dropDown = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (dropDown.current && !dropDown.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="cart_header_container">
      <div className="cart_header_box">
        <div className="cart_header_left">
          <img src="/images/logo.png" alt="" />
          <h4>SECURE CHECKOUT</h4>
        </div>
        <div className="cart_header_right">
          <h4>
            <HeadsetMicIcon
              className="cartHeaderIcon"
              style={{ fontSize: "20px" }}
            />
            Help
          </h4>
          <h4 onClick={dropdownHandler}>
            <PersonIcon
              className="cartHeaderIcon"
              style={{ fontSize: "20px" }}
            />
            {userData.name}
          </h4>
        </div>
      </div>
      {dropdownOpen && (
        <div className="profile_options_tab" ref={dropDown}>
          <Link to="#">Profile</Link>
          <Link to="#">Orders</Link>
          <Link to="#">Coupon / super</Link>
          <Link to="#">Favourites</Link>
          <Link to="#">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default CartHeader;
