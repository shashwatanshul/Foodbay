// import React from "react";
// import axios from "axios";

// export default function Checkout({ subtotal, cartItems, currentUser }) {
//   const redirectToServerSideRender = async () => {
//     try {
//       const response = await axios.get("/paybutton/renderView", {
//         params: {
//           subtotal: subtotal,
//           cartItems: cartItems,
//           currentUser: currentUser,
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 200) {
//         console.log(response);
//         window.location.href = response.request.responseURL;
//       } else {
//         console.error("Error sending data to backend:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error during data sending:", error.message);
//     }
//   };
//   return (
//     <div>
//       {currentUser ? (
//         <button className="btn" onClick={redirectToServerSideRender}>
//           Pay Button
//         </button>
//       ) : (
//         <button className="btn" onClick={(window.location.href = "/login")}>
//           Login before Order
//         </button>
//       )}
//     </div>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import axios from "axios";

export default function Checkout({ subtotal }) {
  const handlePayment = async () => {
    try {
      // Step 1: Create an order
      const orderResponse = await axios.post("/paybutton/createorder", {
        subtotal,
      });
      const { id: orderId, amount } = orderResponse.data.order;

      // Step 2: Razorpay payment options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "foodybay",
        description: "Test Transaction",
        order_id: orderId,
        handler: async (response) => {
          // Step 3: Transfer funds after successful payment
          const transferResponse = await axios.post(
            "/paybutton/transferfunds",
            {
              amount: subtotal,
              accountId: "acc_PQnTMZUbG1yL78", // Replace with actual linked account ID
            }
          );
          if (transferResponse.data.success) {
            alert("Payment and fund transfer successful!");
          } else {
            alert("Payment successful, but fund transfer failed!");
          }
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during payment:", error.message);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}
