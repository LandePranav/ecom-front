import MongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req,res) {
    //const data = req?.body;
    await MongooseConnect();
    const productData = [];
    const data = req?.body ;
    for(const p of data){
        productData.push(await Product.findOne({_id:p}) )
    }
    res.json(JSON.stringify(productData));
}