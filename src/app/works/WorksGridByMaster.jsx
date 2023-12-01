// 'use client'

import WorkSkeleton from '@/components/WorkSkeleton'
import Masonry from 'react-masonry-css'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import WorkBymaster from './WorkBymaster'

export const Grid = styled(Masonry)`
    display: flex;
    gap: 30px;
    width: 100%;
    justify-content: space-between;
    max-width: 1170px;

    & > .grid-column {
        width: 30% !important;
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
    @media (max-width: 768px) {
        & > .grid-column {
            width: 47% !important;
        }
    }
    @media (max-width: 500px) {
        & > .grid-column {
            width: 100% !important;
        }
    }
`

export default function WorksGridByMaster({ worksQuery, masterId, salonId }) {
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
                    default: 3,
                    768: 2,
                    500: 2,
                }}
            >
                {worksQuery.isSuccess
                    ? worksQuery.data.pages.map((page) => {
                          const works = page?.worksData?.data

                          return works?.map((work, index) => {
                              return (
                                  <WorkBymaster
                                      salonId={salonId}
                                      masterId={masterId}
                                      key={work.vk_date}
                                      data={work}
                                      id={work.id}
                                      index={index}
                                      masters={worksQuery.data.pages}
                                  />
                              )
                          })
                      })
                    : null}
                <div ref={endRef}></div>
                {worksQuery.isFetching
                    ? [...Array(12)].map((_, index) => (
                          <WorkSkeleton key={index} />
                      ))
                    : null}
            </Grid>
        </div>
    )
}
