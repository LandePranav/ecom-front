import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled, {css} from "styled-components";

const PageWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #e9e3e3de;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    padding-top: 2rem;
`

const StyledButton = styled.button`
    border-radius: 10px;
    padding: 0.6rem 1rem;
    font-size: 1.2rem  ;
    background-color: black;
    color: white;
    cursor: pointer;
    z-index: 10;
    ${props => props.$red && css`
        background-color: #f06060;
        border-color: #423939;
        color: black;
        font-weight: 600;
    `}
`

const StyledBox = styled.div`
    display: block;
    position: relative;
    text-align: center;
    max-width: 90%;
    height: auto;
    padding: 1.5rem;
    border: .2rem solid black;
    border-radius: 1.5rem;
    ${props => props.$static && css`
        display: static;
    `}
`

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center ;
    word-wrap: break-word;
    text-align: left;
    align-items: start;
    gap: 1px;
    padding: 0 0 1rem 0;
`

const ImageBox = styled.div`
    height: 100px ;
    width: 100px ;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    .img{
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
    }
`

const StyledOrderList = styled.div`
    display: flex;
    width: 90%;
    position: relative;
    flex-direction: column;
    text-align: left;
    /* overflow-y: auto; */
    overflow-x: hidden;
    padding: 1rem 3rem;
    margin-left: 2rem;
    margin-top: 1rem;
`

const StyledHeader = styled.h2`
    border-bottom: 2px solid black;
    color: #464545;
    font-style: italic;
    font-family: monospace;
    width: fit-content;
    display: absolute;
    position: sticky;
`

const StyledOrderLog = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3px 0;
    width: 100%;
    font-weight: 500;
`
const StyledTemp = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    width: 100vw;
    gap: 40px;
    flex-grow: 1;
    position: absolute;
    
    @media screen and (min-width: 550px) {
        flex-direction: row;
        justify-content: space-evenly;
    }
`

export default function Account() {

    const {data: session} = useSession();
    const [orderList, setOrderList] = useState([]);

    useEffect(()=>{
        if(session){
            axios.post('/api/orders', {email:session.user.email})
                .then(res => {
                    setOrderList(res.data);
                }
            ).catch(err => {
                console.error("error fetching orders: ", err);
            });
        }
    },[session]);

    if(session){
        return(
            <div>
                <div style={{position:"relative",zIndex:"10"}}>
                    <Header/>
                </div>
                <Center>
                    <PageWrapper>
                        <StyledBox>
                            <ImageBox>
                                <Image src={session.user.image} alt="userimg" fill />
                            </ImageBox>
                            <InfoBox>
                                <p>Name : {session.user.name}</p>
                                Email : {session.user.email}
                            </InfoBox>
                            <StyledButton $red={true} onClick={()=>signOut()}>
                                Logout
                            </StyledButton>
                        </StyledBox>

                        <StyledOrderList>
                            <StyledHeader>Orders List</StyledHeader>

                            {orderList.length > 0 ? (orderList.map( (order,index) => {
                                const orderSubArr = [...order] ;
                                return orderSubArr.map((o) => (
                                    <StyledOrderLog>
                                        <div style={{width:"100%",}}>
                                            ${o.quantity * o.price_data.unit_amount/100}
                                        </div>
                                        <div style={{width:"100%"}}>
                                            {o.quantity} x &nbsp;
                                            {o.price_data?.product_data?.name}
                                        </div>
                                    </StyledOrderLog>
                                ))
                            } ))  : "NO Products Yet!"
                            }
                        </StyledOrderList>

                    </PageWrapper>
                </Center>
            </div>
        );
    }

    return(
        <div>
            <Header/>
                <StyledTemp>
                    <div>
                        <StyledHeader>USER SIGN-IN</StyledHeader>
                        <StyledButton onClick={()=>signIn('google')}>
                            Google
                        </StyledButton>
                    </div>
                    
                    <div>
                        <StyledHeader>ADMIN SIGN-IN</StyledHeader>
                        <StyledButton onClick={()=>window.location.href = 'https://zenith-ecomadmin.vercel.app/'}>
                            Admin Page
                        </StyledButton>
                    </div>
                    
                    
                </StyledTemp>
        </div>
    )
}