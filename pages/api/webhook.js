import MongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";

export default async function handler(req,res) {
    await MongooseConnect();
    // const event =  await buffer(req) //req.body;
    const key = process.env.STRIPE_WSS;
    let event ;

    try {
      const rawBody = await buffer(req);
      const signature = req.headers['stripe-signature'];
      event = stripe.webhooks.constructEvent(rawBody, signature, key);
    } catch (error) {
      console.error("WebHook signature verification failed: ",error.message);
      return res.status(400).send(`webhook error: ${err.message}`);
    }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'checkout.session.completed':
      const data = event.data.object;
      //console.log("checkout session completed: ", data);
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if(orderId && paid){
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        })
      }
      break;
    case 'charge.updated' :
      const chargeUpdate = event.data.object;
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send('Webhook Okay.');
}

export const config = {
    api: {
        bodyParser: false,
    },
}