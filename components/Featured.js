import styled from "styled-components";
import Center from "./Center";
import Image from "next/image";
import Button from "./Button";
import { Product } from "@/models/Product";
import ButtonLink from "./ButtonLink";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 3rem;
    color: white;
`
const Desc = styled.p`
    color: #aaa;
    font-size: .8rem;
`
const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    height: fit-content;
    gap: 40px;
    img{
        border-radius: 1rem;
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

export default function Featured ({product}) {
    console.log(product.title);
    return(
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product.title}</Title>
                            <Desc>{product.description}.</Desc>
                            <ButtonsWrapper>
                                <ButtonLink href={'/products/'+product._id} outline={1} white={1}>Read more</ButtonLink>
                                <Button white>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    Add to Cart
                                </Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column style={{position:"relative"}}>
                        <Image 
                            src={"https://plus.unsplash.com/premium_photo-1681666713728-9ed75e148617?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D"} 
                            width={250}
                            height={200}

                        />
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    );
}