import Image from "next/image";
import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`
  background-color: white; /* Adjust background color as needed */
  padding-bottom: 10px; //Adjust padding as needed
  border-radius: 10px; /* Optional: rounded corners for a softer look */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), /* Slight shadow below */
              0 -2px 4px rgba(0, 0, 0, 0.05); /* Faint shadow above */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  //max-width: 200px;

@media screen and (min-width: 426px) {
    &:hover {
  transform: translateY(-5px); /* Slightly lifts the element on hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 
              0 -2px 6px rgba(0, 0, 0, 0.1);
}
}
`

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 10px;
    height: 100px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:10px;
    overflow: hidden;
    img{
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
        object-fit: cover;
    }

    @media screen and (min-width: 660px) {
        height: 150px;
    }
    @media screen and (min-width: 1025px) {
        max-height: 250px;
        width: auto
    }
`

const Title = styled(Link)`
    font-weight:normal;
    font-size:1rem;
    color: inherit;
    text-decoration: none;
    margin:0;
    @media screen and (min-width: 426px) {
        font-size: 1.3rem;
    }
`
const ProductInfoBox = styled.div`
    margin-top: 4px;
    padding: 0 10px;
    @media screen and (min-width: 660px) {
        padding: 0 10px;
    }
`
const PriceRow = styled.div`
    display: block;
    justify-content: space-between;
    align-items: center;
    margin-top: 3px;
    @media screen and (min-width: 660px) {
        display: flex;
        gap: 10px
    }
`
const Price = styled.div`
    font-size: 1rem;
    font-weight: 600;
    @media screen and (min-width: 426px){
        font-size:1.3rem;
    }
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
            <>
            <WhiteBox href={uri}>
                    <Image src={images[0]} alt='products' height={150} width={200} />
            </WhiteBox>
            <ProductInfoBox>
                <Title href={uri}>
                    {title}
                </Title>
                <PriceRow>
                    <Price>${price}</Price>
                    <Button
                        onClick={()=>addProductToCart(_id)}
                        primary={true}
                        block={true}
                        outline={true}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <span>
                            Add
                        </span>
                    </Button>
                </PriceRow>
            </ProductInfoBox>
            </>
        </ProductWrapper>
    );
}