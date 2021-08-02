import React, { useEffect, useState } from "react";
import "./Header.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import PersonIcon from "@material-ui/icons/Person";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../helper";
import Address from "../Address/Address/Address";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../helper";
import { getCartAction } from "../../Redux/action/cart.action";
import {
  getUserDataAction,
  setAddressAction,
} from "../../Redux/action/user.action";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = getCookie("token");
  const [addressOpen, setAddressOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedAddressLoading, setSelectedAddressLoading] = useState(false);
  const [userCartData, setuserCartData] = useState([]);
  const [userData, setUserData] = useState({});

  const { addCartLoading } = useSelector((state) => state.addToCart);
  const { decreaseItemLoading } = useSelector(
    (state) => state.decreaseCartItem
  );

  useEffect(() => {
    const loadSpots = async () => {
      await dispatch(getCartAction(token));
    };
    loadSpots();
  }, [dispatch, addCartLoading, decreaseItemLoading]);

  const { userCart } = useSelector((state) => state.getCart);

  useEffect(() => {
    if (userCart) {
      setuserCartData(userCart);
    }
  }, [userCart]);

  const AddressChangeHandler = () => {
    setAddressOpen(!addressOpen);
  };

  useEffect(() => {
    setSelectedAddressLoading(true);
    async function getUserData() {
      await await axios
        .get(`http://localhost:5000/user/get_user_data`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(
          (response) => {
            setUserData(response.data.user);

            const selectedAddress = {
              address: response.data.user.homeAddress.address,
              latitude: response.data.user.homeAddress.latitude,
              longitude: response.data.user.homeAddress.longitude,
            };

            dispatch(setAddressAction(selectedAddress));
            setSelectedAddressLoading(false);
          },
          (err) => {
            console.log(err);
          }
        );
    }

    getUserData();
  }, []);

  const { seleAddress } = useSelector((state) => state.setAddress);

  useEffect(() => {
    if (seleAddress) {
      setSelectedAddress(seleAddress);
    }
  }, [seleAddress]);

  const truncate = (str, max, suffix) =>
    str?.length < max
      ? str
      : `${str?.substr(
          0,
          str?.substr(0, max - suffix.length).lastIndexOf(" ")
        )}`;

  const navOptions = [
    {
      icon: <SearchIcon className="navIcon" style={{ fontSize: "18px" }} />,
      name: "Search",
    },
    {
      icon: <HeadsetMicIcon className="navIcon" style={{ fontSize: "18px" }} />,
      name: "Help & Support",
    },
    {
      icon: <PersonIcon className="navIcon" style={{ fontSize: "18px" }} />,
      name: userData?.name,
      to: "/profile",
    },
    {
      icon: <LocalMallIcon className="navIcon" style={{ fontSize: "18px" }} />,
      name: "Cart",
      span: true,
      to: "/cart",
    },
  ];

  return (
    <>
      <div className="header_container">
        <div className="header_left_container">
          <img src="/images/logo.png" alt="Logo" />
          <div className="header_address" onClick={AddressChangeHandler}>
            <h3>Home</h3>
            {selectedAddressLoading ? (
              ""
            ) : (
              <p>
                {truncate(
                  selectedAddress?.address !== ""
                    ? selectedAddress.address
                    : "address",
                  50,
                  "..."
                )}
              </p>
            )}
            <ExpandMoreIcon className="downIcon" />
          </div>
        </div>
        <div className="header_right_container">
          {navOptions.map((option) => (
            <>
              <Link to={option.to} className="navoption">
                <h3>{option.icon}</h3>
                <h3>{option.name}</h3>
                {option.span && <h5>{userCartData?.length}</h5>}
              </Link>
            </>
          ))}
          <Link
            to="#"
            className="navoption"
            onClick={() => {
              logout(() => {
                history.push("/login");
              });
            }}
          >
            <h3>
              <ExitToAppIcon />
            </h3>
            <h3>Logout</h3>
          </Link>
        </div>
      </div>

      <Address
        addressOpen={addressOpen}
        setAddressOpen={setAddressOpen}
        userData={userData}
      />
    </>
  );
};

export default Header;
