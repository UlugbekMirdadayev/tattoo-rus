'use client'

import Title from '@/components/Title'
import Salon from './Salon'
import { useSalonsQuery } from '@/hooks/useSalonsQuery'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import LineSkeleton from '@/components/LineSkeleton'
import { setModal } from '@/redux/slices/rootSlice'
import { useDispatch, useSelector } from 'react-redux'
import Map from '@/components/Map'
import { Tab, Tabs } from '../works/WorksPage'
import Link from 'next/link'
import { salonsApi } from '@/api/salonsApi'

export const CATEGORIES = [
    { name: 'Все', route: null },
    { name: 'Тату', name2: 'тату', route: 'tattoo', service: 1233 },
    { name: 'Пирсинг', name2: 'пирсинга', route: 'piercing', service: 1234 },
    { name: 'Татуаж', name2: 'татуажа', route: 'pm', service: 1232 },
    {
        name: 'Удаление тату',
        name2: 'по удалению тату',
        route: 'remove',
        service: 3378,
    },
]

export default function SalonsPage({ category }) {
    const dispatch = useDispatch()
    const { ref: endRef, inView } = useInView()
    const [mapView, setMapView] = useState(false)
    const [filters, setFilters] = useState([])
    const city = useSelector((state) => state.root.city)
    const appliedFilters = useSelector((state) => state.root.salonsFilters)

    const getWhere = () => {
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

    const salonsQuery = useSalonsQuery({
        category,
        options: {
            where: getWhere(),
            service: CATEGORIES.find((i) => i.route == category)?.service,
        },
        filters: appliedFilters.reduce((accumulator, obj) => {
            return accumulator + ('_' + obj.code)
        }, ''),
    })

    useEffect(() => {
        if (inView && salonsQuery.hasNextPage) {
            salonsQuery.fetchNextPage()
        }
    }, [inView])

    useEffect(() => {
        salonsApi.getSalons({}).then((res) => {
            setFilters(res.filters)
        })
    }, [category])
    useEffect(() => {
        document.title = `Cалоны ${
            CATEGORIES.find((i) => category == i.route)?.name2 ?? ''
        } в ${city ? city.name2 : 'России'} / Rus.Tattoo`
    }, [])
    return (
        <section className="works">
            <div className="container">
                <Title
                    title={`Cалоны ${
                        CATEGORIES.find((i) => category == i.route)?.name2 ?? ''
                    } в ${city ? city.name2 : 'России'}`}
                />
                <div className="filter mt">
                    <div className="mb">
                        <Tabs>
                            {CATEGORIES.map((i, index) => (
                                <Link
                                    key={index}
                                    href={
                                        '/salons/' +
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
                        <div className="col-6 col-md-8 col-lg-6">
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
                        <div className="col-3 col-md-2 col-lg-3 offset-lg-1">
                            <span
                                onClick={() => setMapView(!mapView)}
                                className="btn btn--w100 btn--transparent filter__map"
                            >
                                {mapView
                                    ? 'Показать списком'
                                    : 'Выбрать на карте'}
                            </span>
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
                {mapView ? (
                    <Map
                        points={salonsQuery.data?.pages?.[0].data.filter(
                            (i) => i.location && i.location != '0'
                        )}
                        city={city}
                    />
                ) : (
                    <div className="card-lines mt">
                        {salonsQuery.isSuccess
                            ? salonsQuery.data.pages.map((page) => {
                                  const salons = page.data
                                  return salons.map((salon) => {
                                      return (
                                          <Salon
                                              data={salon}
                                              key={salon.id}
                                          />
                                      )
                                  })
                              })
                            : null}
                        {salonsQuery.isFetching
                            ? [...Array(10)].map((_, index) => (
                                  <LineSkeleton key={index} />
                              ))
                            : null}
                        <div ref={endRef}></div>
                    </div>
                )}
            </div>
        </section>
    )
}
