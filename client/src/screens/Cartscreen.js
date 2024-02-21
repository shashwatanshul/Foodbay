import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";

export default function Cartscreen() {
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;
  var subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  const loginstate = useSelector((state) => state.loginUserReducer);
  const currentUser = loginstate.currentUser;
  const dispatch = useDispatch();
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 style={{ fontSize: "40px" }}>My Cart</h2>
          {cartItems.map((item) => {
            return (
              <div className="flex-container">
                <div className="text-start m-1 w-100">
                  <h1>
                    {item.name} [{item.varient}]
                  </h1>
                  <h3 style={{ fontSize: "15px" }}>
                    Price : {item.quantity} * {item.prices[0][item.varient]} ={" "}
                    <i class="fa fa-inr"></i> {item.price}
                  </h3>
                  <div style={{ display: "inline" }}>
                    <h1 style={{ display: "inline" }}>Quantity :</h1>
                    <i
                      className="fa-solid fa-plus"
                      onClick={() => {
                        dispatch(
                          addToCart(item, item.quantity + 1, item.varient)
                        );
                      }}
                    ></i>
                    <b>{item.quantity}</b>
                    <i
                      className="fa-solid fa-minus"
                      onClick={() => {
                        dispatch(
                          addToCart(item, item.quantity - 1, item.varient)
                        );
                      }}
                    ></i>
                  </div>
                  <hr></hr>
                </div>
                <div className="m-1 w-100">
                  <img
                    src={item.image}
                    style={{ height: "80px", width: "80px" }}
                    alt=""
                  ></img>
                </div>
                <div className="m-1 w-10">
                  <i
                    className="fa-solid fa-trash mt-5"
                    onClick={() => {
                      dispatch(deleteFromCart(item));
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4 text-end">
          <h2 style={{ fontSize: "45px" }}>
            SubTotal : <i class="fa fa-inr"></i>
            {subtotal}
          </h2>
          <Checkout
            cartItems={cartItems}
            subtotal={subtotal}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
