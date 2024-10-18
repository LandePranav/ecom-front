import styled from "styled-components";
import Center from "./Center";
import Image from "next/image";
import Button from "./Button";
import { Product } from "@/models/Product";
import ButtonLink from "./ButtonLink";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
    min-width: 100%;
    background-color: #222;
    color: #fff;
    padding: 25px 0;
    @media screen and (min-width: 550px) {
        padding: 50px 0;
    }
`
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 1.5rem;
    color: white;
    @media screen and (min-width: 550px){
        font-size: 3rem;
    }
`
const Desc = styled.p`
    color: #aaa;
    font-size: .9rem;
    text-align: justify;
`
const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    height: fit-content;
    gap: 25px;
    
    img{
        max-width: 80%;
        max-height: 150px;
        display: block;
        margin: 0 auto;
        border-radius: 1rem;
        @media screen and (min-width: 550px) {
            max-width: 100%;
            max-height: 200px;
        }
    }
    div:nth-child(1){
            order:2;
    }
    @media screen and (min-width: 550px) {
        grid-template-columns: 0.9fr 1.1fr;
        div:nth-child(1){
            order:0;
        }
        gap:40px;
    }
`
const Column = styled.div`
    display: flex;
    align-items: center;
    justify-self: center;
    height: auto;
`

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 15px;
`
const StyledImage = styled(Image)`
    object-fit: cover;
    width: 100%;
    border: .05rem solid gray;
`

export default function Featured ({product}) {
    const {cartProducts, setCartProducts} = useContext(CartContext);
    const turncatedText = product.description.split(' ').slice(0, 17).join(' ') + (product.description.split(' ').length > 30 ? " . . ." : "")

    function addFeaturedToCart(product){
        setCartProducts(prev => {
            const newlist = [...prev, product._id];
            return newlist ;
        })
    }

    return(
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product.title}</Title>
                            <Desc>{turncatedText}</Desc>
                            <ButtonsWrapper>
                                <ButtonLink
                                    href={'/product/'+product._id} 
                                    outline={1}
                                    $white={1}
                                >
                                    Read more
                                </ButtonLink>
                                <Button
                                    onClick={()=>addFeaturedToCart(product)}
                                    $white={true}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    Add to Cart
                                </Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                            <StyledImage
                                src={product?.images?.[0]} 
                                width={250}
                                height={200}
                                alt="featured"
                            />
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    );
}