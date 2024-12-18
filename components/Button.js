import { primary } from "@/lib/colors";
import styled , {css} from "styled-components";

export const ButtonStyle = css`
    border-radius: 5px;
    border: 0;
    padding: 5px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    svg{
        height: 20px;
        margin-right: 5px;
    }
    ${props => props.$block && css`
        display: flex;
        align-items: center;
        width: 100%;
        padding: 8px 0;
        @media screen and (min-width: 426 ) {
            padding : 8px 0;
        }
    `}
    ${props => props.$white && !props.outline && css`
        background-color: white;
        color: #000;
    `}
    ${props => props.$white && props.outline && css`
        background-color: transparent;
        color: #fff;
        border: 1px solid #fff;
    `}
    ${props => props.$black && !props.outline && css`
        background-color: #000;
        color: #fff;
        border: 1px solid #fff;
    `}
    ${props => props.$black && props.outline && css`
        background-color:transparent ;
        color: #000;
        border: 1px solid #000;
    `}
    ${props => props.$primary && !props.outline && css`
        background-color: ${primary};
        color: #fff;
        border: 1px solid ${primary};
    `}
    ${props => props.$primary && props.outline && css`
        background-color: transparent;
        color: ${primary};
        border: 1px solid ${primary};
    `}
    ${props => props.$size ==='l' && css`
        font-size: 1.2rem;
        padding: 10px 20px;
        svg{
            height: 20px;
        }
    `}
`

const StyledButton = styled.button`
    ${ButtonStyle}
    @media screen and (min-width: 660px){
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
export default function Button({children, ...rest}) {
    return(
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    );
}