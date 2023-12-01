'use client'

import WorkSkeleton from '@/components/WorkSkeleton'
import Masonry from 'react-masonry-css'
import styled from 'styled-components'
import Work from './Work'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export const Grid = styled(Masonry)`
    display: flex;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
    max-width: 1170px;

    & > .grid-column {
        width: 22%!important;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    @media (max-width: 1000px) {
        gap: 20px;

        & > .grid-column {
            gap: 20px;
        }
    }
`

export default function WorksGrid({ worksQuery }) {
    const { ref: endRef, inView } = useInView()
    useEffect(() => {
        if (inView && worksQuery.hasNextPage) {
            worksQuery.fetchNextPage()
        }
    }, [inView])

    return (
        <div className="mt">
            <Grid
                className="grid"
                columnClassName="grid-column"
                breakpointCols={{
                    default: 4,
                    800: 3,
                    500: 2,
                }}
            >
                {worksQuery.isSuccess
                    ? worksQuery.data.pages.map((page) => {
                          const works = page.data
                          return works.map((work) => {
                              return <Work key={work.id} count = {page} data={work} id={work.id} />
                          })
                      })
                    : null}
                <div ref={endRef}></div>
                {worksQuery.isFetching
                    ? [...Array(16)].map((_, index) => (
                          <WorkSkeleton key={index} />
                      ))
                    : null}
            </Grid>
        </div>
    )
}
