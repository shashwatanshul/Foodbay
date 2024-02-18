// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../actions/userActions";

// function Navbar() {
//   const cartstate = useSelector((state) => state.cartReducer);
//   const userstate = useSelector((state) => state.loginUserReducer);
//   const { currentUser } = userstate;
//   const dispatch = useDispatch();
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
//         <a className="navbar-brand" href="/">
//           MENU
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             {currentUser ? (
//               <div class="dropdown">
//                 <a
//                   class="dropdown-toggle nav-link"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   {currentUser.name}
//                 </a>

//                 <ul class="dropdown-menu">
//                   <li>
//                     <a class="dropdown-item" href="/orders">
//                       Orders
//                     </a>
//                   </li>
//                   {currentUser.isAdmin ? (
//                     <li>
//                       <a class="dropdown-item" href="/admin">
//                         Admin
//                       </a>
//                     </li>
//                   ) : (
//                     <li></li>
//                   )}
//                   <li>
//                     <a
//                       class="dropdown-item"
//                       href="#"
//                       onClick={() => {
//                         dispatch(logoutUser());
//                       }}
//                     >
//                       Logout
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             ) : (
//               <li className="nav-item">
//                 <a className="nav-link" href="/login">
//                   Login
//                 </a>
//               </li>
//             )}

//             <li className="nav-item">
//               <a className="nav-link" href="/cart">
//                 Cart {cartstate.cartItems.length}
//               </a>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;
//------------------------------------------------------------------------------------------
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";

function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
        <a className="navbar-brand" href="/">
          MENU
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <div className="dropdown">
                <a
                  className="dropdown-toggle nav-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentUser.name}
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/orders">
                      Orders
                    </a>
                  </li>
                  {currentUser.isAdmin ? (
                    <li>
                      <a className="dropdown-item" href="/admin">
                        Admin
                      </a>
                    </li>
                  ) : (
                    <li></li>
                  )}
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            )}
            {currentUser ? (
              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  Cart {cartstate.cartItems.length}
                </a>
              </li>
            ) : (
              <li></li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
