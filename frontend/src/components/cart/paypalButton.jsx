import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const PaypalButton = ({ amount, onSuccess, onError }) => {
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
          console.error("PayPal Checkout onError:", err);
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};
