import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req,res) {
    if(req.method !== 'POST'){
        res.json('Shoud be a post req.!');
        return;
    }
    const {name,email,city,postal,addr,country,products,count} = req.body;
    const productList = JSON.parse(products);
    const countKeeper = JSON.parse(count);
    let line_items = [];
    for(const product of productList){
        const quantity = countKeeper[product._id] || 0;
        if(quantity > 0){
            line_items.push({
                quantity:quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {name:product.title},
                    unit_amount: quantity * product.price * 100, //times 100 for stripe
                },
            });
        }
    }
    // res.json(line_items);
    const orderDoc = await Order.create({
        line_items,name,email,city,postal,addr,country,paid:false
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?cancel=1',
        metadata: {orderId: orderDoc._id.toString()}
    })

    res.json({url:session.url})
}