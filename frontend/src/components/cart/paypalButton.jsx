import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const PaypalButton = ({ amount, onSuccess, onError }) => {
  console.log("PayPal Client ID:", import.meta.env.VITE_PAYPAL_CLIENT_ID);

  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "USD" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: parseFloat(amount).toFixed(2) ,  // make sure it's a string
                       
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            console.log("Transaction completed:", details);
            onSuccess(details);
          });
        }}
        onError={(err) => {
          console.error("Detailed PayPal Error:", JSON.stringify(err, null, 2));
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};
