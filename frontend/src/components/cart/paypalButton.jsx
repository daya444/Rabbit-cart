import React from 'react'
import { PayPalScriptProvider,PayPalButtons  } from "@paypal/react-paypal-js";

export const PaypalButton = ({amount,onSuccess,onError}) => {
  return (
    <PayPalScriptProvider options={{ "client-id":import.meta.env.PAYPAL_CLENT_ID  }}>
      <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount, 
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then(onSuccess)
      }}

      onError={ onError}
    />
  </PayPalScriptProvider>
  )
}

