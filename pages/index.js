import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "@/models/Product";
import MongooseConnect from "@/lib/mongoose";
import NewProduct from "@/components/NewProduct";
import { Setting } from "@/models/Settings";
import { SpeedInsights } from "@vercel/speed-insights/next"


export default function Home({featuredProduct,newProducts}) {
  return (
    <div style={{paddingBottom:"20px"}}>
      <SpeedInsights />
      <Header />
      <Featured product={featuredProduct} />
      <NewProduct products={newProducts} />
    </div>
  )
}

// export async function getServerSideProps(){
//   await MongooseConnect();
//   const data = await Setting.find({});
//   // const featuredProductId = '670d55ba4d93901617e08570';
//   const featuredProductId = data?.[0].featured;
//   const featuredProduct = await Product.findById(featuredProductId);
//   const newProducts = await Product.find({},null,{sort: {'_id':-1}, limit:10});
//   return {
//     props: {
//       featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
//       newProducts: JSON.parse(JSON.stringify(newProducts))
//     },
//   }
// }

//optimisation attempt
export async function getStaticProps() {
  await MongooseConnect();
  const data = await Setting.find({});
  const featuredProductId = data?.[0]?.featured;
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
