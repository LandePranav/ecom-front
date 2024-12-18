import CartContextProvider from "@/components/CartContext";
import styled, { createGlobalStyle } from "styled-components"
import {Poppins} from 'next/font/google';
import {SessionProvider} from "next-auth/react"

const poppins = Poppins({
  weights: [300,400,500,600,700],
  weight: '400',
  subsets: ["latin"],
  display: "swap",
})

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding: 0px;
    margin: 0px;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps: {session, ...pageProps}, }) {
  return (
    <SessionProvider session={session}>
        <div className={poppins.className}>
        <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
      </div>
    </SessionProvider>
  )
}
