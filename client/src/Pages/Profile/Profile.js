import React from "react";
import "./Profile.css";
import Header from "../../Component/Header/Header";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <Header />
      <div className="profile_container">
        <div className="profile_details">
          <div className="profile_box">
            <h1>Pavithran</h1>
            <h5>8667282314 . pavithran9835@gmail.com</h5>
          </div>
          <button>Edit Profile </button>
        </div>
        <div className="profile_options_container">
          <div className="profile_options">
            <div className="profile_links">
              <h3>Orders</h3>
              <h3>Super</h3>
              <h3>Favourites</h3>
              <h3>Payments</h3>
              <h3>Address</h3>
            </div>
          </div>
          <div className="profile_options_data"></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
