import React from 'react';
import styled from 'styled-components';

const ImageBox = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;

    img {
    object-fit: cover;
    background-position: center center;
    max-width: 90px;
    position: relative;
    border-radius: 8px;
    cursor: pointer;
    transition: filter 0.3s;

    &:hover {
        filter: brightness(0.6);
    }
  }
`;

export default function ImagesList({ children }) {
    return (
        <ImageBox>
            {children}
        </ImageBox>
    )
}