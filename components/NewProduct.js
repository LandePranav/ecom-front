import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
    font-size: 1.7rem;
    margin: 25px 0 5px 0;
    font-weight: 400;
    @media screen and (min-width: 550px) {
        font-size: 2rem;
        margin: 30px 0 20px 0;
        font-weight: 400;
    }
`

export default function NewProduct({products}) {
    return(
        <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid products={products} />
        </Center>
    );
}