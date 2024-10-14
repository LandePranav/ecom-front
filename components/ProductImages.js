import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const BigImage= styled(Image)`
    max-width: 100%;
    max-height: 200px;
    border-radius: 20px;
`
const BigImageWrapper = styled.div`
    text-align: center;
`

const StyledImage = styled(Image)`
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
    `
    const ImageButtons = styled.div`
        display: flex;
        gap: 10px;
        margin-top: 10px;
    `
    const ImageButton = styled.div`
        border: 2px solid #ccc;
        height: 50px;
        padding: 5px;
        cursor: pointer;
        border-radius: 5px;
        ${props => props.active ? `
            border-color:#ccc;
            ` : `
            border-color: transparent
        `}
    `

export default function ProductImages({images}) {

    const [activeImg, setActiveImg] = useState(images?.[0]);

    return(
        <>
            <BigImageWrapper>
                <BigImage src={activeImg} width={150} height={120} alt="prodImg" />
            </BigImageWrapper>
            <ImageButtons>
                {images.map(image => (
                    <ImageButton key={image} active={image==activeImg} onClick={()=> setActiveImg(image)} >
                        <StyledImage src={image} width={150} height={120} alt="prodImg" />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    );
}