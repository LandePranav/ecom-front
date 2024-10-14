import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
    padding:0;
    background-color: #222;
`
const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    position: relative;
    z-index: 3;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
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
    padding-top: 10px;
    @media screen  and (min-width: 550px){
        padding-top: 0;
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
    /* right: 10px;
    top: 22px; */
    @media screen and (min-width: 550px) {
        display: none;
    }
`

export default function Header() {
    const {cartProducts} = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    return(
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
                    <NavButton onClick={()=> setMobileNavActive(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </NavButton>
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}