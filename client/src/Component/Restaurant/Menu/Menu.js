import React, { useState } from "react";
import Nonvegicon from "../../Icon/Nonvegicon";
import Vegicon from "../../Icon/Vegicon";
import "./Menu.css";
import { Link } from "react-scroll";
import Cart from "../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAction } from "../../../Redux/action/cart.action";
import { getCookie } from "../../../helper";
import MenuSkeleton from "../../Skeleton/MenuSkeleton/MenuSkeleton";

const Menu = ({ menuData, singleRestaurant, sinRestLoading }) => {
  const dispatch = useDispatch();
  const categorys = [...new Set(menuData?.map((menu) => menu.category))];
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = getCookie("token");

  return (
    <div className="menu_container">
      <div className="categories_container">
        {categorys.map((category, index) => (
          <Link
            activeClass="active"
            className={selectedCategory}
            to={category}
            spy={true}
            smooth={true}
            duration={500}
            onClick={() => {
              setSelectedCategory(category);
            }}
            key={index}
          >
            {category}
          </Link>
        ))}
      </div>
      <div className="menu_list_container">
        {sinRestLoading
          ? [1, 2, 3, 4, 5].map((r) => <MenuSkeleton />)
          : categorys?.map((cate) => {
              return menuData
                ?.filter((menus) => menus.category.includes(cate))
                .map((menu, index) => (
                  <>
                    <div className="menu_box" key={index} id={menu.category}>
                      <div className="menu_box_details">
                        {menu.isVeg ? <Vegicon /> : <Nonvegicon />}
                        <h3>{menu.name}</h3>
                        <h5>&#x20b9;{menu.price}</h5>
                        <p>{menu.description}</p>
                      </div>
                      <div className="menu_box_image">
                        <img src={menu.image} alt="Menu Image" />
                        <button
                          onClick={() => {
                            const cartItem = {
                              product: menu._id,
                              quantity: 1,
                              price: menu.price,
                            };
                            const restaurantId = singleRestaurant._id;
                            console.log(restaurantId);
                            dispatch(
                              addToCartAction(cartItem, restaurantId, token)
                            );
                          }}
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  </>
                ));
            })}
      </div>
      <div className="cart_container">
        <Cart />
      </div>
    </div>
  );
};

export default Menu;
