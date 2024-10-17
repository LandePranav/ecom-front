import MongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req,res) {
    await MongooseConnect()
    const {email} = req.body;
    if(!email){
        return res.status(400).json({error: "Email is required!"});
    }
    try {
        const orders = await Order.find({email:email}).sort({createdAt:-1}) ;
        const lineItems = orders.map(order => order.line_items);
        res.json(lineItems);
    } catch (error) {
        console.log("Error fetching Orders: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}