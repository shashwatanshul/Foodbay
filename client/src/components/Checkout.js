import React from "react";
import axios from "axios";

export default function Checkout({ subtotal, cartItems, currentUser }) {
  const redirectToServerSideRender = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/paybutton/renderView",
        {
          params: {
            subtotal: subtotal,
            cartItems: cartItems,
            currentUser: currentUser,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        window.location.href = response.request.responseURL;
      } else {
        console.error("Error sending data to backend:", response.statusText);
      }
    } catch (error) {
      console.error("Error during data sending:", error.message);
    }
  };
  return (
    <div>
      {currentUser ? (
        <button className="btn" onClick={redirectToServerSideRender}>
          Pay Button
        </button>
      ) : (
        <button className="btn" onClick={(window.location.href = "/login")}>
          Login before Order
        </button>
      )}
    </div>
  );
}
