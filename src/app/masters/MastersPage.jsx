'use client'

import Title from '@/components/Title'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import LineSkeleton from '@/components/LineSkeleton'
import { setModal } from '@/redux/slices/rootSlice'
import { useDispatch, useSelector } from 'react-redux'
import Map from '@/components/Map'
import { Tab, Tabs } from '../works/WorksPage'
import Link from 'next/link'
import { useMastersQuery } from '@/hooks/useMastersQuery'
import { mastersApi } from '@/api/mastersApi'
import Salon from '../salons/Salon'
import { CATEGORIES } from '../salons/SalonsPage'
import { cities } from '@/data/cities'

export default function MastersPage({ category }) {
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

    const mastersQuery = useMastersQuery({
        category,
        options: {
            where: getWhere(),
            service: CATEGORIES.find((i) => i.route == category)?.service
        },
        filters: appliedFilters.reduce((accumulator, obj) => {
            return accumulator + ('_' + obj.code)
        }, ''),
    })
    useEffect(() => {
        if (inView && mastersQuery.hasNextPage) {
            mastersQuery.fetchNextPage()
        }
    }, [inView])

    useEffect(() => {
        mastersApi.getMasters({}).then((res) => {
            setFilters(res.filters)
        })
    }, [category])
    useEffect(() => {
        document.title = `Мастера ${
            CATEGORIES.find((i) => category == i.route)?.name2 ?? ''
        } в ${city ? city.name2  : 'России'} / Rus.Tattoo`
    }, [])
    return (
        <section className="works">
            <div className="container">
                <Title
                    title={`Мастера ${
                        CATEGORIES.find((i) => category == i.route)?.name2 ?? ''
                    } в ${city ? city.name2 : 'России'}`}
                />
                <div className="filter mt">
                    <div className="mb">
                        <Tabs>
                            {CATEGORIES.map((i, index) => (
                                <Link
                                    href={
                                        '/masters/' +
                                        (i.route ? i.route + '/' : '')
                                    }
                                >
                                    <Tab
                                        key={index}
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
                        points={mastersQuery.data?.pages?.[0].data.filter(
                            (i) => i.location && i.location != '0'
                        )}
                        city={city}
                    />
                ) : (
                    <div className="card-lines mt">
                        {mastersQuery.isSuccess
                            ? mastersQuery.data.pages.map((page) => {
                                  const masters = page.data

                                  return masters.map((master) => {
                                      return (
                                          <Salon
                                              data={{
                                                  ...master,
                                                  name: `${master.firstname} ${master.lastname}`,
                                              }}
                                              key={master.id}
                                          />
                                      )
                                  })
                              })
                            : null}
                        {mastersQuery.isFetching
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
