import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Head from "next/head";
import { Product } from "@/models/Product";
import MongooseConnect from "@/lib/mongoose";
import NewProduct from "@/components/NewProduct";

export default function Home({featuredProduct,newProducts}) {
  return (
    <div style={{paddingBottom:"20px"}}>
      <Head>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap");      
      </Head>
      <Header />
      <Featured product={featuredProduct} />
      <NewProduct products={newProducts} />
    </div>
  )
}

export async function getServerSideProps(){
  const featuredProductId = '670b249a965ca8ea10b9e68d';
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