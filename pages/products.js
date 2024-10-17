import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import MongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
`

export default function ProductsPage({products}) {
    return(
        <div style={{paddingBottom:'20px'}}>
            <Header />
            <Center>
                <Title>
                    All Products
                </Title>
                <ProductsGrid products={products} />
            </Center>
        </div>
    )
}

export async function getServerSideProps(){
    await MongooseConnect();
    const products = await Product.find({},null, {sort:{'_id': -1}});
    return {
        props: {
            products:JSON.parse(JSON.stringify(products)),
        }
    }
};