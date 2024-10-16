import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
    padding:0;
    background-color: #222;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`
const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    position: relative;
    display: flex;
    align-items: center;
    z-index: 3;
    font-size: 1.2rem;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    @media screen and (min-width: 550px) {
        padding: 30px 0;
    }
`
const StyleNav = styled.nav`
    ${props => props.mobileNavActive ? `display: block;`: `display: none;`}
    gap: 15px;
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right:0;
    padding:60px 20px 20px;
    background-color: #222;
    @media screen and (min-width: 550px) {
        display: flex;
        position: static;
        padding: 0;
    }
`
const NavLink = styled(Link)`
    display: block;
    color: #aaa;
    text-decoration: none;
    padding-top: 20px;
    @media screen  and (min-width: 550px){
        padding-top: 0;
    }
`
const CartLink = styled(Link)`
    display: flex;
    color: #aaa;
    height: 100%;
    align-items: center;
    text-decoration: none;
    background-color: transparent;
    position: relative;
    cursor: pointer;
    z-index: 3;
    @media screen  and (min-width: 550px){
        display: none;
    }
`

const NavButton = styled.button`
    background-color: transparent;
    width: 40px;
    height: 40px;
    border: 0;
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;

    @media screen and (min-width: 550px) {
        display: none;
    }
`

const StyledPadder = styled.div`
    padding: 30px 0;
    @media screen and (min-width: 426px) {
        padding: 40px 0 ;
    }
`
const MobNavRapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

export default function Header() {
    const {cartProducts} = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    return(
        <>
            <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Ecommerce</Logo>
                    <StyleNav mobileNavActive={mobileNavActive}>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All Products</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                    </StyleNav>
                        <MobNavRapper>
                        <CartLink href={'/cart'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24} className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            ({cartProducts.length})
                        </CartLink>
                        <NavButton onClick={()=> setMobileNavActive(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </NavButton>
                        </MobNavRapper>
                </Wrapper>
            </Center>
            </StyledHeader>
            <StyledPadder />
        </>
    );
}