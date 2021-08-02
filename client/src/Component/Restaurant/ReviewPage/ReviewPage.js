import React, { useState } from "react";
import Rating from "./Rating";
import "./ReviewPage.css";
import CloseIcon from "@material-ui/icons/Close";
import StarRatings from "react-star-ratings";
import { isAuth, getCookie } from "../../../helper";
import { useSelector, useDispatch } from "react-redux";
import { addReviewAction } from "../../../Redux/action/review.action";

const ReviewPage = ({ reviewOpen, setReviewOpen, restaurantData, match }) => {
  const dispatch = useDispatch();
  const starRatingHandler = () => {};
  const [starRating, setStarRating] = useState(1);
  const [comment, setComment] = useState("");
  const token = getCookie("token");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(addReviewAction(restaurantData._id, starRating, comment, token));
  };

  return (
    <>
      <div
        className={
          reviewOpen
            ? "transparent_layer_bg active"
            : "transparent_layer_bg diable"
        }
      >
        <div
          className={
            reviewOpen ? "review_container active" : "review_container disable"
          }
        >
          <div className="title_close">
            <h1>{restaurantData.name}</h1>
            <CloseIcon
              onClick={() => {
                setReviewOpen(!reviewOpen);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/rpa04zelcbyjlrkiuqeq"
            alt="Image"
          />
          {restaurantData.reviews?.length > 0 ? (
            <div className="review_box">
              {restaurantData.reviews?.map((review, index) => (
                <div className="single_review_box" key={index}>
                  <div className="review_user_box">
                    <h1>{review.name.charAt(0)}</h1>
                  </div>
                  <div className="review_details_box">
                    <h5>{review.name}</h5>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="review_box">
              <h4>No reviews Yet</h4>
            </div>
          )}
          <div className="review_input">
            <h4>Post Your Review</h4>
            <StarRatings
              rating={starRating}
              starRatedColor="#60b246"
              changeRating={(newRating, name) => {
                setStarRating(newRating);
              }}
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="1px"
              style={{ fontSize: "10px", width: "50px" }}
            />
            {isAuth() ? (
              <div className="review_input_box">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                ></textarea>
                <button type="submit" onClick={formSubmitHandler}>
                  submit
                </button>
              </div>
            ) : (
              <div className="review_input_box">
                <h4>Please Login to review</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
