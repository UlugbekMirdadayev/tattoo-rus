'use client'

import { Skeleton } from '@mui/material'
import Link from 'next/link'
import styled from 'styled-components'

export const CardLineAuthorStyled = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 16px;
`

export const CardLineAuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const CardLinePhotoList = styled.div`
    display: flex;
    gap: 20px;
    overflow-x: auto;
    width: 100%;
`

export const CardLineStyled = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e9e9e7;
    width: 100%;
    padding: 30px 0px;
    align-items: center;
    &:first-child {
        border-top: 1px solid #e9e9e7;
    }
    &:last-child {
        border-bottom: none;
    }
    @media (max-width: 1040px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        row-gap: 30px;
    }
    
    &:hover {
    }
`

export const CardLineRight = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 40px;
    @media (max-width: 1040px) {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        row-gap: 30px;
    }
`

export const CardLineSkeletonAuthorAvatar = styled(Skeleton)`
    display: inline-flex;
    width: 100px !important;
    height: 100px !important;
`

export const CardLineSkeletonAuthorInfoName = styled(Skeleton)`
    display: inline-flex;
    width: 200px !important;
    height: 32px !important;
`

export const CardLineSkeletonAuthorInfoDesc = styled(Skeleton)`
    display: inline-flex;
    width: 150px !important;
    height: 26px !important;
`

export const CardLineSkeletonPhoto = styled(Skeleton)`
    display: inline-flex;
    width: 100px !important;
    height: 100px !important;
    transform: none !important;
    border-radius: 8px !important;
    flex-shrink: 0;
`

export const CardLineSkeletonNextLink = styled(Skeleton)`
    display: inline-flex;
    width: 70px !important;
    height: 36px !important;
`

export default function LineSkeleton() {
    return (
        <CardLineStyled>
            <CardLineAuthorStyled as="div">
                <CardLineSkeletonAuthorAvatar variant="circular" />
                <CardLineAuthorInfo>
                    <CardLineSkeletonAuthorInfoName />
                    <CardLineSkeletonAuthorInfoDesc />
                </CardLineAuthorInfo>
            </CardLineAuthorStyled>
            <CardLineRight>
                <CardLinePhotoList>
                    {[...Array(5)].map((_, index) => (
                        <CardLineSkeletonPhoto key={index} />
                    ))}
                </CardLinePhotoList>
                <CardLineSkeletonNextLink />
            </CardLineRight>
        </CardLineStyled>
    )
}
