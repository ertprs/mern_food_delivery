import React from "react";
import Shimmer from "../Shimmer/Shimmer";
import SkeletonElement from "../SkeletonElement";
import "./RestSekeletonDetails.css";

const RestSekeletonDetails = () => {
  return (
    <div className="restaurant_loading_box">
      <div className="loading_image">
        <SkeletonElement type="image" />
      </div>
      <SkeletonElement type="title" />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />

      <div className="restaurant_loading_details">
        <SkeletonElement type="box" />
        <SkeletonElement type="box" />
      </div>
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      <Shimmer />
    </div>
  );
};

export default RestSekeletonDetails;
