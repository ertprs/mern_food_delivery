import React, { useState } from "react";
import "./Map.css";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { compose, withProps } from "recompose";
import { light } from "./mapStyles";
import Geocode from "react-geocode";
import Mapform from "./Mapform";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  updateHomeAddressAction,
  updateWorkAddressAction,
} from "../../../Redux/action/user.action";
import { getCookie } from "../../../helper";
Geocode.setApiKey("AIzaSyB1k40lzL-TwgdSebqPOhPLaJDPoCs6xX4");
Geocode.enableDebug();

const Map = ({ searchlat, searchlng, setmapConainerOpen }) => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [optionsData, setOptionsData] = useState({
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 17,
    height: 300,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  });

  const [formVisible, setFormVisible] = useState(false);
  const [homeOptionActive, setHomeOptionActive] = useState(false);
  const [workOptionActive, setWorkOptionActive] = useState(false);
  const [addressTittle, setAddressTittle] = useState("");
  const [userAddress, setUserAddress] = useState({
    flatno: "",
    area: "",
    landmark: "",
    address: optionsData.address,
    latitude: "",
    longitude: "",
  });

  const getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  const getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  const getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng).then((response) => {
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = getCity(addressArray),
        area = getArea(addressArray),
        state = getState(addressArray);

      setOptionsData({
        address: address ? address : "",
        city: city ? city : "",
        area: area ? area : "",
        state: state ? state : "",
        mapPosition: {
          lat: newLat,
          lng: newLng,
        },
        markerPosition: {
          lat: newLat,
          lng: newLng,
        },
      });

      setUserAddress({
        address: address ? address : "",
        latitude: newLat ? newLat : "",
        longitude: newLng ? newLng : "",
      });
    });
  };

  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: searchlat, lng: searchlng }}
        defaultOptions={{
          scrollwheel: false,
          streetViewControl: false,
          fullscreenControl: false,
          disableDefaultUI: false,
          mapTypeControl: false,
          scaleControl: false,
          zoomControl: false,
        }}
        options={{ styles: light }}
      >
        <Marker
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={{ lat: searchlat, lng: searchlng }}
        ></Marker>
      </GoogleMap>
    ))
  );

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setUserAddress((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const homeOptionHandler = () => {
    setWorkOptionActive(false);
    setHomeOptionActive(!homeOptionActive);
    setAddressTittle("Home");
  };

  const workOptionHandler = () => {
    setHomeOptionActive(false);
    setWorkOptionActive(!workOptionActive);
    setAddressTittle("Work");
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (homeOptionActive) {
      await dispatch(updateHomeAddressAction(userAddress, token));
      return setUserAddress({
        flatno: "",
        area: "",
        landmark: "",
        address: "",
      });
    }

    if (workOptionActive) {
      await dispatch(updateWorkAddressAction(userAddress, token));
      return setUserAddress({
        flatno: "",
        area: "",
        landmark: "",
        address: optionsData.address,
      });
    }
  };

  return (
    <>
      <div className="map_page_container">
        <div className="map_title_container">
          <h3>Set delivery location</h3>
          <KeyboardBackspaceIcon
            onClick={() => {
              setmapConainerOpen(false);
            }}
          />
        </div>
        <div className="gmap">
          <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB1k40lzL-TwgdSebqPOhPLaJDPoCs6xX4&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100px` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <div className="address_tab">
          <p>Address</p>
          {optionsData.address ? (
            <h4>{optionsData.address}</h4>
          ) : (
            <h4>Please Drag marker to get address</h4>
          )}
        </div>
        {formVisible && (
          <form action="">
            <input
              type="text"
              placeholder="Door / Flat No."
              name="flatno"
              onChange={inputChangeHandler}
              value={userAddress.flatno}
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="area"
              name="area"
              onChange={inputChangeHandler}
              value={userAddress.area}
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Landmark"
              name="landmark"
              onChange={inputChangeHandler}
              value={userAddress.landmark}
              autoComplete="off"
            />
            <div className="address_option">
              <div
                className={
                  homeOptionActive
                    ? "home_option active"
                    : "home_option disable"
                }
                onClick={homeOptionHandler}
              >
                <HomeOutlinedIcon />
                <p className="optionPara">Home</p>
              </div>
              <div
                className={
                  workOptionActive
                    ? "work_option active"
                    : "work_option disable"
                }
                onClick={workOptionHandler}
              >
                <WorkOutlineOutlinedIcon />
                <p className="optionPara">Work</p>
              </div>
            </div>
          </form>
        )}
        {!formVisible && (
          <div
            className="add_more_details"
            onClick={() => {
              setFormVisible(!formVisible);
            }}
          >
            <h4>Add More Details</h4>
            <p>for faster checkout</p>
          </div>
        )}

        <div className="save_proceed" onClick={formSubmitHandler}>
          <h4>SAVE AND PROCEED</h4>
        </div>
      </div>
    </>
  );
};

export default Map;
