import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Cartscreen from "./screens/Cartscreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Success from "./components/Success";
import OrderScreen from "./screens/OrderScreen";
import AdminScreen from "./screens/AdminScreen";
import UsersList from "./screens/UsersList";
import OrdersList from "./screens/OrdersList";
import PizzasList from "./screens/PizzasList";
import AddPizza from "./screens/AddPizza";
import Editpizza from "./screens/Editpizza";
import Footer from "./components/Footer";
import TermsAndConditions from "./screens/TermsAndConditions";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import CancellationAndRefund from "./screens/CancellationAndRefund";
import AboutUs from "./screens/AboutUs";
import ContactUs from "./screens/ContactUs";
import PricingDetails from "./screens/PricingDetails";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/cart" element={<Cartscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route
            path="/payment-success"
            element={<Success success="Payment Successful" />}
          />
          <Route path="/orders" element={<OrderScreen />} />
          <Route path="/tandc" element={<TermsAndConditions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/refundpolicy" element={<CancellationAndRefund />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/pricingdetails" element={<PricingDetails />} />

          <Route path="/admin" element={<AdminScreen />}>
            <Route index element={<UsersList />} />
            <Route path="/admin/userlist" element={<UsersList />} />
            <Route path="/admin/orderslist" element={<OrdersList />} />
            <Route path="/admin/pizzaslist" element={<PizzasList />} />
            <Route path="/admin/addpizza" element={<AddPizza />} />
            <Route path="/admin/editpizza/:pizzaid" element={<Editpizza />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
