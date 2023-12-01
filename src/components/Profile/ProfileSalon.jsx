'use client'
import { mastersApi } from '@/api/mastersApi'
import { CATEGORIES } from '@/app/salons/SalonsPage'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import WorkMaster from '../TabsProfile/WorkMaster'
import RewiwClient from '../TabsProfile/RewiwClient'
import EquipmentMaster from '../TabsProfile/EquipmentMaster'
import { ModalMaster } from '../ModalMaster/Modal'
import { useSalonQuery } from '@/hooks/useSalonQuery'
import { cities } from '@/data/cities'
import MapSalon from '../TabsProfile/MapSalon'
import WorkSalon from '../TabsProfile/WorkMaster'

export default function ProfileSalon(props) {
    const { salon, searchParams, params } = props
    const [filters, setFilters] = useState([])
    const newWorks = useSelector((state) => state.root.newWorks)
    const appliedFilters = useSelector((state) => state.root.salonsFilters)
    const [selected, setSelected] = useState(searchParams.year)
    const [worksCount, setWorksCount] = useState(salon?.worksCount)
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [partsCity, setPartsCity] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [birthYear, setBirthYear] = useState(null)

    const years = salon.works?.years
    const metro = salon.metro[0]?.name
    const workMasters = salon.master?.data
    const stili = salon.style
    const unixTimestamp = salon.birthday

    useEffect(() => {
        // Преобразуем UNIX-время в объект Date
        const birthDate = new Date(unixTimestamp * 1000) // Умножаем на 1000, так как UNIX-время обычно в секундах

        // Извлекаем год рождения
        const year = birthDate.getFullYear()

        // Устанавливаем год рождения в состояние компонента
        setBirthYear(year)
    }, [])

    useEffect(() => {
        const host =
            typeof window !== 'undefined' ? window.location.hostname : ''
        const pathSalon =
            typeof window !== 'undefined' ? window.location.pathname : ''

        const partsWord = host.split('.')[0]
        const parts = cities.find((item) => item.url === partsWord)?.name2
        const partsCity = cities.find((item) => item.url === partsWord)?.name3
        setPartsCity(partsCity)

        let title = `Rus.Tattoo в ${parts ? parts : 'Россия'}  / Rus.Tattoo`

        if (pathSalon.split('/')[1] === 'salon') {
            title = `${salon.name} в ${parts ? parts : 'Россия'}  / Rus.Tattoo`
        }

        document.title = title
    }, [])
    const getWhere = (salon, appliedFilters) => {
        let where = ''

        if (salon) {
            where += `service like '%${CATEGORIES.find(
                (i) => i.route == salon
            )}%'`
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

            if (salon) {
                where += ' and '
            }
            where += `${conditions}`
        }

        return where
    }
    const worksQuery = useSalonQuery({
        options: {
            id: salon.salon_id,
            ...(selected !== 'За все время' && { year: selected }),
            where: getWhere(salon, appliedFilters),
            sortBy: newWorks ? 'vk_date' : 'rating',
            first: searchParams.first,
        },
        filters: appliedFilters.reduce((accumulator, obj) => {
            return accumulator + ('_' + obj.code)
        }, ''),
        total: worksCount || 0,
    })

    const handleChange = (event) => {
        setSelected(event.target.value)
        setWorksCount(worksQuery?.data?.pages?.[0]?.worksData?.worksCount)
    }
    useEffect(() => {
        if (selected) {
            worksQuery.refetch()
        }
    }, [selected, worksCount])
    useEffect(() => {
        mastersApi.getMasters({}).then((res) => {
            setFilters(res.filters)
        })
    }, [])

    const tabsData = [
        {
            label: `Работы (${
                worksQuery?.data?.pages?.[0]?.worksData?.worksCount || 0
            })`,
            content: (
                <WorkSalon
                    salonId={salon.salon_id}
                    worksQuery={worksQuery}
                    filters={filters}
                    years={years}
                    selected={selected}
                    handleChange={handleChange}
                />
            ),
        },
        {
            label: 'Отзывы',
            content: <RewiwClient />,
        },
        {
            label: 'Оборудование',
            content: <EquipmentMaster />,
        },
        {
            label: 'Карта',
            content: <MapSalon salon={salon} />,
        },
    ]
    return (
        <section className="master">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4 col-xl-3 mb">
                        <div className="profile pl pr pt pb">
                            <div className="profile__info">
                                <div
                                    className="profile__photo ibg"
                                    style={{
                                        backgroundImage: `url(${salon.logo})`,
                                    }}
                                >
                                    {/* <img src="upload/users/001.jpg" alt="" /> */}
                                </div>
                                <div className="profile__name">
                                    {salon.name}
                                </div>
                                {salon.text && (
                                    <div className="profile__desc">
                                        {salon.text}
                                    </div>
                                )}

                                <div className="profile__rating rating">
                                    <div className="rating__points">4,5</div>
                                    <div className="rating__votes">(18)</div>
                                </div>
                                <div>
                                    <a
                                        onClick={() => setOpenModal(true)}
                                        className="btn btn--red btn--w100"
                                        data-fancybox
                                        data-src="#login_form"
                                        data-options='{"baseClass": "fancybox-auto", "touch": false}'
                                    >
                                        Связаться
                                    </a>
                                </div>
                                <div className="profile__phone">
                                    <a
                                        onClick={() => setOpenModal(true)}
                                        className="btn btn--w100"
                                        data-fancybox
                                        data-src="#login_form"
                                        data-options='{"baseClass": "fancybox-auto", "touch": false}'
                                    >
                                        Показать телефон
                                    </a>
                                </div>

                                <ModalMaster
                                    openModal={openModal}
                                    setOpenModal={setOpenModal}
                                />
                                {/* <div className="profile__phone">
                                    <a
                                        href="tel:+79109331221"
                                        className="btn btn--w100 btn--white"
                                    >
                                        {master.phone}
                                    </a>
                                </div> */}
                                <div className="profile__show">
                                    Показать информацию
                                </div>
                            </div>
                            <div className="profile__detail">
                                <div className="profile__title mt">
                                    Основное
                                </div>
                                <div>
                                    <p>Из {partsCity}</p>
                                    <p>Основан в {birthYear && birthYear} г.</p>
                                </div>
                                <div className="profile__title mt">Адрес</div>
                                <div>
                                    <p>{salon.address}</p>
                                    {{ metro } && <p>Метро: {metro}</p>}
                                    <a
                                        href="#"
                                        data-click='a.tabs__link[data-id="4"]'
                                        className="profile__map"
                                        onClick={() => setActiveTabIndex(3)}
                                    >
                                        Посмотреть на карте
                                    </a>
                                </div>

                                <div className="profile__title mt">Стили</div>
                                <div className="profile__tags">
                                    {stili.map((item, index) => {
                                        return (
                                            <a key={index} href="#">
                                                {item.name}
                                            </a>
                                        )
                                    })}
                                </div>
                                {workMasters && (
                                    <>
                                        <div className="profile__title mt">
                                            Место работы
                                        </div>
                                        <div className="profile__users">
                                            {workMasters.map((item, index) => {
                                                return (
                                                    <a
                                                        key={index}
                                                        href={item.url}
                                                        className="profile__user"
                                                    >
                                                        <div className="profile__user-photo ibg">
                                                            <img
                                                                src={item.logo}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="profile__user-name">
                                                            {item.name}
                                                        </div>
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    </>
                                )}
                                {salon.text && (
                                    <>
                                        <div className="profile__title mt">
                                            Обо мне
                                        </div>
                                        <div>
                                            <p>{salon.text}</p>
                                        </div>
                                    </>
                                )}

                                <div className="profile__title mt">Награды</div>
                                <div className="profile__prizi">
                                    <div className="profile__priz">
                                        <div className="profile__priz-title">
                                            Best of Day
                                        </div>
                                        <div className="profile__priz-desc">
                                            Московская Тату Конвенция
                                        </div>
                                    </div>
                                </div>
                                <div className="profile__title mt">
                                    Подписчики
                                </div>
                                <div className="profile__subscribe">
                                    <a
                                        href="#"
                                        className="profile__subscribe-user ibg"
                                    >
                                        <img
                                            src="upload/users/002.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        className="profile__subscribe-user ibg"
                                    >
                                        <img
                                            src="upload/users/004.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        className="profile__subscribe-user ibg"
                                    >
                                        <img
                                            src="upload/users/006.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        className="profile__subscribe-user ibg"
                                    >
                                        <img
                                            src="upload/users/007.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        className="profile__subscribe-user ibg"
                                    >
                                        <img
                                            src="upload/users/009.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        className="profile__subscribe-new"
                                    ></a>
                                </div>
                                <div className="profile__unsubscribe">
                                    <a
                                        href="#"
                                        className="btn btn--transparent btn--w100"
                                    >
                                        Отписаться
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-8 col-xl-9 ">
                        <div className="tabs_block">
                            {tabsData.map((tab, idx) => {
                                return (
                                    <button
                                        key={idx}
                                        className={`tabs__link`}
                                        style={{
                                            backgroundColor:
                                                idx === activeTabIndex &&
                                                '#241E0C',
                                            color:
                                                idx === activeTabIndex &&
                                                '#fff',
                                        }}
                                        onClick={() => setActiveTabIndex(idx)}
                                    >
                                        {tab.label}
                                    </button>
                                )
                            })}
                        </div>
                        {/* Show active tab content. */}
                        <div className="py-4">
                            {tabsData[activeTabIndex].content}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
