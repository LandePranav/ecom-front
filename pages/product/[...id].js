import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import MongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Image from "next/image";
import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const Title = styled.h1`
    font-size: 1.5em;
`
const Desc = styled.p`
    text-align: justify;
    color: #545252;
`

const ColWrapper = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr ;
    margin: 30px 0;
    max-width: 100%;
    @media screen and (min-width: 550px) {
        grid-template-columns: .9fr 1.1fr ;
        margin: 40px 0;
        gap: 40px;
    }
`
const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px 20px;
    max-height: fit-content;
    max-width: 100%;
`
const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
`
const Price = styled.span`
    font-size: 1.5rem;
`

export default function ProductPage({product}) {
    const {setCartProducts} = useContext(CartContext);

    function addProductToCart(id){
        setCartProducts(prev => {
            const newList = [...prev, id];
            return newList;
        })
    }
    return(
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <Box>
                        <ProductImages images={product?.images} />
                    </Box>
                    <div>
                        <Title>
                            {product.title}
                        </Title>
                        <Desc>
                            {product.description}
                        </Desc>

                        <PriceRow>
                            <Price>
                                ${product.price}
                            </Price>
                            <div>
                                <Button $primary onClick={()=>addProductToCart(product._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    Add To Cart
                                </Button>
                            </div>
                        </PriceRow>

                    </div>
                </ColWrapper>
            </Center>
        </>
    );
}

//switch to this for instant updates of data.
// export async function getServerSideProps(context){
//     await MongooseConnect();
//     const {id} = context.query;
//     const product = await Product.findById(id) ;
//     return{
//         props: {
//             product:JSON.parse(JSON.stringify(product)),
//         }
//     };
// }


// generate static pages
//using this for instand page loading / rendering 
export async function getStaticPaths(){
    await MongooseConnect();
    const products = await Product.find({},null, {sort:{'_id': -1}});
    const paths = products.map((product) => ({
        params: {
            id: [product._id.toString()] //pass product id as route param arr
        }
    }));
    return {
        paths,
        fallback: 'blocking', // means if new product page that isnt in static cache, first is build then served
    }
  }

  //fetch data for product of static pages.
//   implies ISR i.e,. icremental site regenration using revalidate
export async function getStaticProps({params}){
    const {id} = params;
    await MongooseConnect();
    const product = await Product.findById(id);
    if(!product) return {notFound: true};

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
        revalidate: 30,
    }
}