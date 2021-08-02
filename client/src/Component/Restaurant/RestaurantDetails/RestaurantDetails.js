import React, { useEffect, useState } from "react";
import "./RestaurantDetails.css";
import StarIcon from "@material-ui/icons/Star";
import { BiRupee } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPercentage } from "react-icons/fa";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import SkeletonElement from "../../Skeleton/SkeletonElement";

const RestaurantDetails = ({
  match,
  singleRestaurant,
  reviewOpen,
  setReviewOpen,
  sinRestLoading,
}) => {
  const ratingPageHandler = () => {
    setReviewOpen(!reviewOpen);
  };

  const [userPosition, setUserPosition] = useState({});

  const { seleAddress } = useSelector((state) => state.setAddress);

  useEffect(() => {
    if (seleAddress) {
      setUserPosition(seleAddress);
    }
  }, [seleAddress]);

  const lat1 = userPosition.latitude;
  const lon1 = userPosition.longitude;
  const lat2 = singleRestaurant.latitude;
  const lon2 = singleRestaurant.longitude;

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

  const deliveryTime =
    (Math.round(getDistanceFromLatLonInKm(lat1, lat2, lon1, lon2) * 10) / 10) *
    7;

  function time_convert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours + ":" + minutes;
  }

  return (
    <div className="restaurant_details_container">
      <div className="restaurant_left_container">
        {sinRestLoading ? (
          <SkeletonElement type="image" />
        ) : (
          <img src={singleRestaurant.image} alt="Image" />
        )}
      </div>
      <div className="restaurant_middle_container">
        {sinRestLoading ? (
          <>
            <SkeletonElement type="title" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
          </>
        ) : (
          <>
            <h1>{singleRestaurant.name}</h1>
            <p>{singleRestaurant.cuisine}</p>
            <p>{singleRestaurant.address}</p>
            <div className="restaurant_details_box">
              <div className="restaurant_rating" onClick={ratingPageHandler}>
                <h4>
                  <StarIcon style={{ fontSize: "16px", marginRight: "4px" }} />
                  {singleRestaurant.rating > 0
                    ? Math.round(singleRestaurant.rating * 10) / 10
                    : "no reviews yet"}
                </h4>
                <h5>{singleRestaurant.reviews?.length} reviews</h5>
              </div>
              <div className="spacer"></div>
              <div className="restaurant_delivery">
                <h4>
                  {Math.round(singleRestaurant?.cookingTime + deliveryTime)}
                  &nbsp;Mins
                </h4>
                <h5>Delivery Time</h5>
              </div>
              <div className="spacer"></div>
              <div className="restaurant_costTwo">
                <h4>
                  <BiRupee style={{ fontSize: "16px", marginRight: "4px" }} />
                  {singleRestaurant.costForTwo}
                </h4>
                <h5>Cost For Two</h5>
              </div>
            </div>
            <div className="restaurant_options">
              <div className="search">
                <FiSearch className="searchIcon" />
                <input type="text" placeholder="Search for dishes..." />
              </div>
              <div className="vegonly">
                <input type="checkbox" />
                <h4>Veg Only</h4>
              </div>
              <div className="favourite">
                <FavoriteBorderIcon
                  style={{
                    fontSize: "16px",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                />
                <h4>Favourite</h4>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="restaurant_right_container">
        {sinRestLoading ? (
          <>
            <SkeletonElement type="title" />
          </>
        ) : (
          <fieldset>
            <legend>OFFER</legend>

            <div className="offerBox">
              <p>30% off up to ₹300 on orders above ₹600 | Use code PARTY</p>
            </div>
            <div className="offerBox">
              <p>50% off up to ₹100 | Use code TRYNEW</p>
            </div>
          </fieldset>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
