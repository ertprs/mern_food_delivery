import React, { useState } from "react";
import "./Address.css";
import CloseIcon from "@material-ui/icons/Close";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import Map from "../Map/Map";
import { setAddressAction } from "../../../Redux/action/user.action";
import { useDispatch } from "react-redux";

const Address = ({ addressOpen, setAddressOpen, userData }) => {
  const dispatch = useDispatch();

  const AddressChangeHandler = () => {
    setAddressOpen(!addressOpen);
  };
  const [mapConainerOpen, setmapConainerOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    setmapConainerOpen(true);
  };

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

  const homeAddressChangeHandler = () => {
    dispatch(setAddressAction(homeAddress));
    setAddressOpen(false);
  };

  const workAddressChangeHandler = () => {
    dispatch(setAddressAction(workAddress));
    setAddressOpen(false);
  };

  return (
    <>
      <div
        className={
          addressOpen
            ? "transparent_layer_bg active"
            : "transparent_layer_bg diable"
        }
      >
        <div
          className={
            addressOpen
              ? "address_container active"
              : "address_container disable"
          }
        >
          <div className="close_container">
            <CloseIcon className="closeIcon" onClick={AddressChangeHandler} />
          </div>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div className="input_box">
                <input
                  {...getInputProps({
                    placeholder: "Search for area, street name...",
                  })}
                />
                <div className="suggestion_box">
                  {loading ? <div>Loading...</div> : null}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    const style = suggestion.active
                      ? {
                          backgroundColor: "#fafafa",
                          cursor: "pointer",
                          width: "100%",
                        }
                      : {
                          backgroundColor: "#ffffff",
                          cursor: "pointer",
                          width: "100%",
                        };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <div className="single_suggestion">
                          <LocationOnOutlinedIcon
                            className="locationIcon"
                            style={{ color: "#a3a6b4" }}
                          />
                          <div className="result_names">
                            <h5>{suggestion.formattedSuggestion.mainText}</h5>
                            <p>
                              {suggestion.formattedSuggestion.secondaryText}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <div className="gps_location">
            <div className="location_icon">
              <LocationSearchingIcon className="muiIcon_address" />
            </div>
            <div className="location_options">
              <h5>Get current location</h5>
              <p>Using GPS</p>
            </div>
          </div>
          <div
            className="home_address_container"
            onClick={homeAddressChangeHandler}
          >
            <div className="left_container">
              <HomeIcon className="muiIcon_address" />
            </div>
            <div className="right_container">
              <h5>Home Address</h5>
              <p>{userData?.homeAddress?.address}</p>
              <h5 className="address_title">
                Landmark <span>{userData?.homeAddress?.landmark}</span>
              </h5>
            </div>
          </div>
          <div
            className="work_address_container"
            onClick={workAddressChangeHandler}
          >
            <div className="left_container">
              <WorkIcon className="muiIcon_address" />
            </div>
            <div className="right_container">
              <h5>Work Address</h5>
              <p>{userData?.workAddress?.address}</p>
              <h5 className="address_title">
                Landmark <span>{userData?.workAddress?.landmark}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
      {mapConainerOpen && (
        <Map
          searchlat={coordinates.lat}
          searchlng={coordinates.lng}
          setmapConainerOpen={setmapConainerOpen}
        />
      )}
    </>
  );
};

export default Address;
