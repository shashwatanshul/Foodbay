import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Link, Outlet } from "react-router-dom";

export default function AdminScreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 style={{ fontSize: "35px" }}>Admin Panel</h2>
          <nav>
            <ul className="adminfunctions">
              <li>
                <Link to="/admin/userlist">Users List</Link>
              </li>
              <li>
                <Link to="/admin/pizzaslist">Item List</Link>
              </li>
              <li>
                <Link to="/admin/addpizza">Add New Item</Link>
              </li>
              <li>
                <Link to="/admin/orderslist">Orders List</Link>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
