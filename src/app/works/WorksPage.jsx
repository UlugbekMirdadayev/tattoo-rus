'use client'

import Title from '@/components/Title'
import styled from 'styled-components'
import Link from 'next/link'
import WorksGrid from './WorksGrid'
import { useWorksQuery } from '@/hooks/useWorksQuery'
import { CATEGORIES } from '../salons/SalonsPage'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '@/redux/slices/rootSlice'
import { mastersApi } from '@/api/mastersApi'
import { cities } from '@/data/cities'

export const Tabs = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 10px;

    @media (max-width: 1000px) {
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow-x: scroll;
    }
`

export const Tab = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    background: rgb(233, 233, 231);
    color: rgb(36, 30, 12);
    font-size: 16px;

    &.active {
        background: rgb(36, 30, 12);
        color: rgb(255, 255, 255);
    }
`

export default function WorksPage({ category }) {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState([])
    const newWorks = useSelector((state) => state.root.newWorks)
    const appliedFilters = useSelector((state) => state.root.salonsFilters)
    const city = useSelector((state) => state.root.city)
    const getWhere = (category, appliedFilters) => {
        let where = ''

        if (category) {
            where += `service like '%${
                CATEGORIES.find((i) => i.route == category)?.service
            }%'`
        }

        if (appliedFilters.length > 0) {
            const groupedByFilter = {}

            appliedFilters.forEach((obj) => {
                const filter = obj.filter

                if (!groupedByFilter[filter]) {
                    groupedByFilter[filter] = []
                }

                groupedByFilter[filter].push(obj)
            })

            const conditions = Object.values(groupedByFilter)
                .map((array) =>
                    array
                        .map((object) => `${object.filter} like '${object.id}'`)
                        .join(' or ')
                )
                .map((condition) => `(${condition})`)
                .join(' and ')

            if (category) {
                where += ' and '
            }
            where += `${conditions}`
        }

        return where
    }

    const worksQuery = useWorksQuery({
        category,
        options: {
            where: getWhere(category, appliedFilters),
            sortBy: newWorks ? 'vk_date' : 'rating',
        },
        filters: appliedFilters.reduce((accumulator, obj) => {
            return accumulator + ('_' + obj.code)
        }, ''),
    })
    useEffect(() => {
        mastersApi.getMasters({}).then((res) => {
            setFilters(res.filters)
        })
    }, [category])
    
    useEffect(() => {
        document.title = `Работы ${
            CATEGORIES.find((i) => category == i.route)?.name2 ?? ''
        } в ${city ? city.name2 : 'России'} / Rus.Tattoo`
    }, [])

    return (
        <section className="works">
            <div className="container">
                <Title
                    title={`Работы ${
                        CATEGORIES.find((i) => category == i.route)?.name2 ?? ''
                    } в ${city ? city.name2 : 'России'}`}
                />
                <div className="filter">
                    <div className="mb">
                        <Tabs>
                            {CATEGORIES.map((i, index) => (
                                <Link
                                    key={index}
                                    href={
                                        '/works/' +
                                        (i.route ? i.route + '/' : '')
                                    }
                                >
                                    <Tab
                                        className={
                                            category == i.route && 'active'
                                        }
                                    >
                                        {i.name}
                                    </Tab>
                                </Link>
                            ))}
                        </Tabs>
                    </div>
                    <div className="row">
                        <div className="col-9 col-md-10 col-lg-7">
                            <form action="" method="post">
                                <input
                                    type="text"
                                    name=""
                                    className="input filter__search"
                                    value=""
                                    placeholder="Поиск"
                                />
                            </form>
                        </div>
                        {filters.length != 0 && (
                            <div className="col-3 col-md-2 col-lg-2 col-xl-2">
                                <span
                                    onClick={() =>
                                        dispatch(
                                            setModal({
                                                id: 'FILTERS',
                                                data: filters,
                                            })
                                        )
                                    }
                                    className="btn btn--w100 btn--transparent filter__filters"
                                >
                                    Фильтры
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="divider mt"></div>
                    </div>
                </div>
                <WorksGrid worksQuery={worksQuery} />
            </div>
        </section>
    )
}
