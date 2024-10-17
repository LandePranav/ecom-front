import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "@/models/Product";
import MongooseConnect from "@/lib/mongoose";
import NewProduct from "@/components/NewProduct";

export default function Home({featuredProduct,newProducts}) {
  return (
    <div style={{paddingBottom:"20px"}}>
      <Header />
      <Featured product={featuredProduct} />
      <NewProduct products={newProducts} />
    </div>
  )
}

export async function getServerSideProps(){
  const featuredProductId = '670d55ba4d93901617e08570';
  await MongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({},null,{sort: {'_id':-1}, limit:10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))
    },
  }
}