import Center from "@/components/Center";
import Header from "@/components/Header";
import MongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
`
const ColWrapper = styled.div`
    display: grid;
    gap: 40px;
    grid-template-columns: .8fr 1.2fr ;
    margin-top: 40px;
`
const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    max-height: fit-content;
`

export default function ProductPage({product}) {
    return(
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <Box>
                        Image
                    </Box>
                    <div>
                        <Title>
                            {product.title}
                        </Title>
                        <p>
                            {product.description}
                        </p>

                    </div>
                </ColWrapper>
            </Center>
        </>
    );
}

export async function getServerSideProps(context){
    await MongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id) ;
    return{
        props: {
            product:JSON.parse(JSON.stringify(product)),
        }
    };
}