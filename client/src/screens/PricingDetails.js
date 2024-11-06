import React from "react";

const PricingDetails = () => {
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
        Pricing Details :
      </h1>
      <br></br>

      <h2>Subscription Plan</h2>
      <p>
        Our monthly subscription for using the FoodyBay platform is{" "}
        <strong>800 INR per month</strong>. This gives you access to all
        features, helping you manage orders seamlessly and efficiently.
      </p>

      <h2>Transaction Fees</h2>
      <p>
        FoodyBay uses <strong>Razorpay</strong> as a secure payment gateway for
        processing online transactions. Razorpay will charge{" "}
        <strong>2% of the total transaction amount</strong>. This 2% fee is
        deducted from the transaction amount, so{" "}
        <strong>
          98% of the total payment will be credited to your account
        </strong>
        , with Razorpay retaining 2% as the processing fee. Please note, this
        fee is not an additional charge.
      </p>

      <h2>Example Calculation</h2>
      <p>For example, if a customer places an order for 1000 INR, then:</p>
      <ul>
        <li>The restaurant owner will receive 980 INR.</li>
        <li>Razorpay will retain 20 INR as the processing fee.</li>
      </ul>

      <p>
        We believe in transparent pricing with no hidden charges, ensuring you
        can focus on growing your business without unexpected costs.
      </p>
    </div>
  );
};

export default PricingDetails;
