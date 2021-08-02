import React, { useEffect, useState } from "react";
import "./Restaurant.css";
import Header from "../../Component/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../Component/Loading/Loading";
import RestaurantDetails from "../../Component/Restaurant/RestaurantDetails/RestaurantDetails";
import { singleRestaurantAction } from "../../Redux/action/restaurant.action";
import Menu from "../../Component/Restaurant/Menu/Menu";
import ReviewPage from "../../Component/Restaurant/ReviewPage/ReviewPage";

const Restaurant = ({ match }) => {
  const dispatch = useDispatch();
  const [singleRestaurant, setSingleRestaurant] = useState({});
  const [reviewOpen, setReviewOpen] = useState(false);

  useEffect(() => {
    dispatch(singleRestaurantAction(match.params.id));
  }, [dispatch]);

  const { singleRestaurantLoading, srestaurant } = useSelector(
    (state) => state.getSingleRestaurant
  );

  useEffect(() => {
    if (srestaurant) {
      setSingleRestaurant(srestaurant);
    }
  }, [srestaurant]);

  const { addCartLoading } = useSelector((state) => state.addToCart);
  const { decreaseItemLoading } = useSelector(
    (state) => state.decreaseCartItem
  );
  const { deleteCartLoading } = useSelector((state) => state.deleteCart);

  return (
    <>
      <Header />
      {singleRestaurantLoading ||
      addCartLoading ||
      decreaseItemLoading ||
      deleteCartLoading ? (
        <Loading />
      ) : null}
      <RestaurantDetails
        match={match}
        singleRestaurant={singleRestaurant}
        reviewOpen={reviewOpen}
        setReviewOpen={setReviewOpen}
        sinRestLoading={singleRestaurantLoading}
      />
      <Menu
        menuData={singleRestaurant.menu}
        singleRestaurant={singleRestaurant}
        sinRestLoading={singleRestaurantLoading}
      />

      <ReviewPage
        reviewOpen={reviewOpen}
        setReviewOpen={setReviewOpen}
        restaurantData={singleRestaurant}
      />
    </>
  );
};

export default Restaurant;
