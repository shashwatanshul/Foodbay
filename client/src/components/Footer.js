import React from "react";
//import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <nav>
            <ul className="adminfunctions">
              <li>
                <Link to="/tandc">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/privacypolicy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refundpolicy">Cancellation/Refund Policy</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
              <li>
                <Link to="/pricingdetails">Pricing Details</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Footer;
