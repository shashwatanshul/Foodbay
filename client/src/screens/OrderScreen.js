import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const loginstate = useSelector((state) => state.loginUserReducer);
  const userid = loginstate.currentUser._id;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/paybutton/getuserorders/${userid}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userid]);

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>
      <hr></hr>
      <div className="table-responsive">
        <table
          className="table table-bordered"
          style={{ borderColor: "#343a40" }}
        >
          <thead>
            <tr>
              <th className="bg-dark text-light">Order ID</th>
              <th className="bg-dark text-light" style={{ minWidth: "150px" }}>
                Order Date & Time
              </th>
              <th className="bg-dark text-light">Order Amount</th>
              <th className="bg-dark text-light">Transaction ID</th>
              <th className="bg-dark text-light">Table Number</th>
              <th className="bg-dark text-light">Mobile Number</th>
              <th className="bg-dark text-light">Pizza Details</th>
              <th className="bg-dark text-light" colSpan="2">
                Delivered
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <i class="fa fa-inr"></i> {order.orderAmount}
                </td>
                <td>{order.transactionId}</td>
                <td>{order.tableNumber}</td>
                <td>{order.mobileNumber}</td>
                <td colSpan="2">
                  <table
                    className="table table-bordered"
                    style={{ borderColor: "#343a40" }}
                  >
                    <thead>
                      <tr>
                        <th className="bg-secondary text-light">Name</th>
                        <th className="bg-secondary text-light">Variant</th>
                        <th className="bg-secondary text-light">Quantity</th>
                        <th className="bg-secondary text-light">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item) => (
                        <tr key={item._id}>
                          <td style={{ minWidth: "100px" }}>{item.name}</td>
                          <td>{item.varient}</td>
                          <td>{item.quantity}</td>
                          <td style={{ minWidth: "100px" }}>
                            <i class="fa fa-inr"></i> {item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>{order.isDelivered ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderScreen;
