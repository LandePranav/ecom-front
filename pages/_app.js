import styled, { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding: 0px;
    margin: 0px;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
