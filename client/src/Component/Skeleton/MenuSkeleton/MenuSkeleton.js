import React from "react";
import SkeletonElement from "../SkeletonElement";
import "./MenuSkeleton.css";
import Shimmer from "../Shimmer/Shimmer";

const MenuSkeleton = () => {
  return (
    <div className="menu_box_loading">
      <div className="menu_box_details_loading">
        <SkeletonElement type="title" />
        <SkeletonElement type="box" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <div className="menu_box_image_loading">
        <SkeletonElement type="menuImage" />
      </div>
      <Shimmer />
    </div>
  );
};

export default MenuSkeleton;
