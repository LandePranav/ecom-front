export default function handler(req,res) {
    if(req.method !== 'POST'){
        res.json('Shoud be a post req.!');
        return;
    }
    const {name,email,city,postal,addr,country,productsId} = req.body;
    const productIds = productsId.split
}