import styled from "styled-components";
import ProductBox from "./ProductBox";
const StyledProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding-top: 30px;

    @media screen and (min-width: 426px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media screen and (min-width: 769px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`
export default function ProductsGrid({products}) {
    return(
        <StyledProductGrid>
            {products?.length > 0 && products.map(product => (
                    <ProductBox  key={product._id} {...product} />
                ))}
        </StyledProductGrid>
    );
}