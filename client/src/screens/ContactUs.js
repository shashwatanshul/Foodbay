import React from "react";

const ContactUs = () => {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        textAlign: "left",
      }}
    >
      <h1 style={{ textAlign: "left", textDecoration: "underline" }}>
        Contact Us :
      </h1>
      <br></br>

      <p>You may contact us using the information below:</p>

      <h2>Merchant Information</h2>
      <p>
        <strong>Legal Entity Name:</strong> SHASHWAT SINGH
      </p>
      <p>
        <strong>Registered Address:</strong> House No. 531, New Adarsh Nagar,
        Roorkee, Haridwar, Uttarakhand, PIN: 247667
      </p>
      <p>
        <strong>Telephone No:</strong> 8177007099
      </p>
      <p>
        <strong>Email ID:</strong> <a href="#">shashwatanshul@gmail.com</a>
      </p>

      <h2>We’re Here to Help</h2>
      <p>
        Whether you have questions about our services, need assistance, or have
        feedback to share, we’re always happy to connect. Reach out to us via
        phone or email, and we’ll get back to you as soon as possible. Your
        satisfaction is our priority, and we’re committed to providing you with
        the best possible service.
      </p>
    </div>
  );
};

export default ContactUs;
