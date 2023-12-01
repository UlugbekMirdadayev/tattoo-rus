import { useMemo } from 'react'
import { Skeleton } from './Skeleton'
import random from 'random'
import styled from 'styled-components'

const Wrapper = styled(Skeleton)`
    display: flex;
    width: 100% !important;
    height: ${({ height }) => height}px !important;
    transform: none !important;
    border-radius: 8px !important;
`

export default function WorkSkeleton() {
    const height = useMemo(() => random.int(100, 360), [])

    return <Wrapper height={height}></Wrapper>
}
