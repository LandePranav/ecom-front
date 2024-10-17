import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const BigImage = styled(Image)`
    max-width: 100%;
    max-height: 200px;
    border-radius: 20px;
    object-fit: cover;
`;

const BigImageWrapper = styled.div`
    text-align: center;
`;

const StyledImage = styled(Image)`
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    object-fit: cover;
`;

const ImageButtons = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 20px;
    overflow-x: auto;
    width: 100%;
    /* padding-bottom: 10px; To add some spacing for scrolling */
    scroll-behavior: smooth; /* For a smoother scrolling experience */
    white-space: nowrap; /* Prevents content from wrapping and forces horizontal scroll */
`;

const ImageButton = styled.div`
    flex: 0 0 auto; /* Prevents the image buttons from shrinking */
    border: 2px solid ${props => (props.active ? '#ccc' : 'transparent')};
    max-width: 70px;
    max-height: 40px;
    padding: 5px;
    cursor: pointer;
    border-radius: 15px;
`;

export default function ProductImages({ images }) {
    const [activeImg, setActiveImg] = useState(images?.[0]);

    return (
        <div>
            <BigImageWrapper>
                <BigImage src={activeImg} width={220} height={120} alt="prodImg" />
            </BigImageWrapper>
            <ImageButtons>
                {images.map(image => (
                    <ImageButton
                        key={image}
                        active={image === activeImg}
                        onClick={() => setActiveImg(image)}
                    >
                        <StyledImage src={image} width={280} height={150} alt="prodImg" />
                    </ImageButton>
                ))}
            </ImageButtons>
        </div>
    );
}
