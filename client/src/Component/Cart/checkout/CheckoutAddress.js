import React, { useState } from "react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useSelector, useDispatch } from "react-redux";
import { setAddressAction } from "../../../Redux/action/user.action";

const CheckoutAddress = ({ userData, cartRes }) => {
  const dispatch = useDispatch();
  const [deliveryAddressOpen, setDeliveryAddressOpen] = useState(false);
  const [deliveredAddress, setDeliveredAddress] = useState("");
  const [expectingTime, setEpectingTime] = useState("");

  const addressChangeHandler = () => {
    setDeliveryAddressOpen(false);
  };

  const lat1 = userData.homeAddress?.latitude;
  const lon1 = userData.homeAddress?.longitude;
  const lat2 = cartRes.latitude;
  const lon2 = cartRes.longitude;

  const wlat1 = userData.workAddress?.latitude;
  const wlon1 = userData.workAddress?.longitude;
  const wlat2 = cartRes.latitude;
  const wlon2 = cartRes.longitude;

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

  const homedeliveryTime =
    (Math.round(getDistanceFromLatLonInKm(lat1, lat2, lon1, lon2) * 10) / 10) *
    7;

  const workdeliveryTime =
    (Math.round(getDistanceFromLatLonInKm(wlat1, wlat2, wlon1, wlon2) * 10) /
      10) *
    7;

  function time_convert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours + ":" + minutes;
  }

  const homeExpectTime = Math.round(cartRes?.cookingTime + homedeliveryTime);
  const workExpectTime = Math.round(cartRes?.cookingTime + workdeliveryTime);

  const homeAddress = {
    address: userData?.homeAddress?.address,
    latitude: userData?.homeAddress?.latitude,
    longitude: userData?.homeAddress?.longitude,
  };

  const workAddress = {
    address: userData?.workAddress?.address,
    latitude: userData?.workAddress?.latitude,
    longitude: userData?.workAddress?.longitude,
  };

  const homeAddressHandler = () => {
    dispatch(setAddressAction(homeAddress));
    setDeliveryAddressOpen(true);
    setDeliveredAddress(userData.homeAddress.address);
    setEpectingTime(homeExpectTime);
  };

  const workAddressHandler = () => {
    dispatch(setAddressAction(workAddress));
    setDeliveryAddressOpen(true);
    setDeliveredAddress(userData.workAddress.address);
    setEpectingTime(workExpectTime);
  };

  return (
    <div className="checkout_address_container">
      {/* <h1>Choose a delivery address</h1>
      <p>Multiple addresses in this location</p> */}
      <div className="multiple_address_tab">
        <div className="homeaddress_delivery_tab">
          <div className="address_left">
            <HomeOutlinedIcon />
          </div>
          <div className="address_right">
            <h4>Home</h4>
            <p>{userData?.homeAddress?.address}</p>
            <h4>{Math.round(cartRes?.cookingTime + homedeliveryTime)} Mins</h4>
            <button onClick={homeAddressHandler}>DELIVER HERE</button>
          </div>
        </div>
        <div className="workaddress_delivery_tab">
          <div className="address_left">
            <WorkOutlineOutlinedIcon />
          </div>
          <div className="address_right">
            <h4>Work</h4>
            <p>{userData?.workAddress?.address}</p>
            <h4>
              {time_convert(
                Math.round(cartRes?.cookingTime + workdeliveryTime)
              )}
              &nbsp; Mins
            </h4>
            <button onClick={workAddressHandler}>DELIVER HERE</button>
          </div>
        </div>
      </div>
      {deliveryAddressOpen && (
        <div className="transparent_cover_bg">
          <div className="address_title_cover">
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1>Delivery Address</h1>
              <CheckCircleIcon className="tickIcon" />
            </div>
            <button onClick={addressChangeHandler}>change</button>
          </div>
          <p>{deliveredAddress}</p>
          <h4>{expectingTime} Mins</h4>
        </div>
      )}
    </div>
  );
};

export default CheckoutAddress;
