import { useMemo } from 'react'
import random from 'random'
import styled from 'styled-components'
import { Skeleton } from '@/components/Skeleton'

export const WorkSkeletonStyled = styled(Skeleton)`
    display: flex;
    width: 100% !important;
    height: ${({ $height }) => $height}px !important;
    transform: none !important;
    border-radius: 8px !important;
`

export const WorkSkeleton = () => {
    const height = useMemo(() => random.int(100, 360), [])

    return <WorkSkeletonStyled $height={height} />
}
