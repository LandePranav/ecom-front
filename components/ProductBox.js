import Image from "next/image";
import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`

`

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:10px;
    img{
        max-width: 100%;
        max-height: 80px;
        border-radius: 8px;
    }
`

const Title = styled(Link)`
    font-weight:normal;
    font-size:1rem;
    color: inherit;
    text-decoration: none;
    margin:0;
`
const ProductInfoBox = styled.div`
    margin-top: 2px;
`
const PriceRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3px;
`
const Price = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
`

export default function ProductBox({_id, title, description, price, images}) {
    const uri = '/product/'+_id ;
    const {setCartProducts} = useContext(CartContext);

    function addProductToCart(id){
        setCartProducts(prev => {
            const newList = [...prev, id];
            return newList;
        })
    }

    return(
        <ProductWrapper>
            <WhiteBox href={uri}>
                <div>
                    <Image src={images[0]} alt='products' height={200} width={150} />
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={uri}>
                    {title}
                </Title>
                <PriceRow>
                    <Price>${price}</Price>
                    <Button
                        onClick={()=>addProductToCart(_id)}
                        primary 
                        outline
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        Add
                    </Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
}