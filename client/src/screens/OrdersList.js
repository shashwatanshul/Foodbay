import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/paybutton/getallorders"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const toggleDelivered = async (orderId) => {
    try {
      await axios.post(
        `http://localhost:5001/paybutton/toggle-delivered/${orderId}`
      );
      // Refresh orders after toggling delivered status
      const response = await axios.get(
        "http://localhost:5001/paybutton/getallorders"
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error toggling delivered status:", error);
    }
  };

  return (
    <>
      <hr></hr>
      <h1>Orders List</h1>
      <hr></hr>
      <div className="table-responsive">
        <table
          className="table table-bordered"
          style={{ borderColor: "#343a40" }}
        >
          <thead>
            <tr>
              <th className="bg-dark text-light" style={{ minWidth: "150px" }}>
                Order ID
              </th>
              <th className="bg-dark text-light">Name</th>
              <th className="bg-dark text-light">Email</th>
              <th className="bg-dark text-light">UserId</th>
              <th className="bg-dark text-light" style={{ minWidth: "150px" }}>
                Order Items
              </th>
              <th className="bg-dark text-light">Order Amount</th>
              <th className="bg-dark text-light">Deliver Status</th>
              <th className="bg-dark text-light">Transaction ID</th>
              <th className="bg-dark text-light">Table Number</th>
              <th className="bg-dark text-light">Mobile Number</th>
              <th className="bg-dark text-light" style={{ minWidth: "150px" }}>
                Date & Time of Order Placement
              </th>
              <th className="bg-dark text-light" style={{ minWidth: "150px" }}>
                Date & Time of Delivery
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={{ minWidth: "150px" }}>{order._id}</td>
                <td style={{ minWidth: "150px" }}>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.userid}</td>
                <td style={{ minWidth: "150px" }}>
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
                <td>
                  <i class="fa fa-inr"></i> {order.orderAmount}
                </td>
                <td style={{ minWidth: "100px" }}>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={order.isDelivered}
                      onChange={() => toggleDelivered(order._id)}
                    />

                    <span className="slider"></span>
                  </label>{" "}
                  {order.isDelivered ? "Delivered" : "Not Delivered"}
                </td>
                <td>{order.transactionId}</td>
                <td>{order.tableNumber}</td>
                <td>{order.mobileNumber}</td>
                <td style={{ minWidth: "200px" }}>
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td style={{ minWidth: "200px" }}>
                  {order.isDelivered
                    ? new Date(order.updatedAt).toLocaleString()
                    : "Not Delivered"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersList;
