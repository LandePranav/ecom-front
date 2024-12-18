import styled from "styled-components"

const StyledDiv = styled.div`
    max-width: 800px;
    margin:0 auto;
    padding: 0 20px;

    @media screen and (min-width: 769px) {
        max-width: 70%;
        margin: 0 auto;
    }
`

export default function Center({children}) {
    return(
        <StyledDiv>
            {children}
        </StyledDiv>
    );
}