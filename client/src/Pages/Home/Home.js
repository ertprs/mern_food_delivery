import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Slider from "../../Component/Home/Slider/Slider";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { allRestaurantAction } from "../../Redux/action/restaurant.action";
import StarIcon from "@material-ui/icons/Star";
import { FaPercentage, FaRupeeSign } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";
import RestSekeletonDetails from "../../Component/Skeleton/RestSekeletonDetails/RestSekeletonDetails";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [restaurantDetails, setRestaurantDetails] = useState([]);

  useEffect(() => {
    dispatch(allRestaurantAction());
  }, [dispatch]);

  const { getRestaurantLoading, restaurant } = useSelector(
    (state) => state.getRestaurant
  );

  useEffect(() => {
    if (restaurant) {
      setRestaurantDetails(restaurant);
    }
  }, [restaurant]);

  return (
    <>
      <Header />
      {getRestaurantLoading && <Loading />}
      <div className="home_container">
        <Slider />
        <div className="home_restaurant_container">
          {getRestaurantLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((r) => <RestSekeletonDetails />)
            : restaurantDetails.map((rest, index) => (
                <div
                  className="restaurant_box"
                  key={index}
                  onClick={() => {
                    history.push(`/restaurant/${rest._id}`);
                  }}
                >
                  <img src={rest.image} alt="Image" />
                  <h5>{rest.name}</h5>
                  <p>{rest.cuisine}</p>
                  <div className="restaurant_box_details">
                    <h5
                      className={
                        (rest.rating > 4 && "starGreen") ||
                        (rest.rating > 2 && rest.rating < 4 && "starOrange") ||
                        (rest.rating < 2 && rest.rating > 0 && "starRed") ||
                        (rest.rating === 0 && "starGreen")
                      }
                    >
                      <StarIcon
                        style={{ fontSize: "15px", marginRight: "3px" }}
                      />
                      {rest.rating > 0
                        ? Math.round(rest.rating * 10) / 10
                        : "NAH"}
                    </h5>
                    <p>{rest.DeliveryTime}</p>
                    <p>₹{rest.costForTwo}</p>
                  </div>
                  <div className="horizontalspacer"></div>
                  <p className="offerText">
                    <FaPercentage className="percentageIcon" />
                    40% off | Use TRYNEW
                  </p>
                  <div className="horizontalspacer"></div>
                  <button>QUICK VIEW</button>
                </div>
              ))}
        </div>
      </div>
      <div className="scroll_top">
        <ExpandLessIcon className="scroll_top_icon" />
      </div>
    </>
  );
};

export default Home;
