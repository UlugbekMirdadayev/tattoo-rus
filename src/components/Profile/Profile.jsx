'use client'
import { mastersApi } from '@/api/mastersApi'
import { CATEGORIES } from '@/app/salons/SalonsPage'
import { cities } from '@/data/cities'
import { useMasterQuery } from '@/hooks/useMasterQuery'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import WorkMaster from '../TabsProfile/WorkMaster'
import RewiwClient from '../TabsProfile/RewiwClient'
import EquipmentMaster from '../TabsProfile/EquipmentMaster'
import MapMaster from '../TabsProfile/MapMaster'
import { ModalMaster } from '../ModalMaster/Modal'

export default function Profile(props) {
    const { master, searchParams, params } = props
    const [filters, setFilters] = useState([])
    const newWorks = useSelector((state) => state.root.newWorks)
    const appliedFilters = useSelector((state) => state.root.salonsFilters)
    const [selected, setSelected] = useState(searchParams.year)
    const [worksCount, setWorksCount] = useState(master?.workCount)
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [partsCity, setPartsCity] = useState('')
    const [openModal, setOpenModal] = useState(false)
    // const [birthYear, setBirthYear] = useState(null);

    const years = master?.worksData?.years
    const metro = master?.metro[0]?.name
    const proteam = master.proteam
    const workSalon = master?.salon?.data
    const stili = master.style
    const unixTimestamp = master.birthday
    const unixTimeststazh = master.stazh
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const ageInSecondsStazh = currentTimestamp - unixTimeststazh
    const ageInYearsStazh = Math.floor(
        ageInSecondsStazh / (60 * 60 * 24 * 365.25)
    )

    const ageInSeconds = currentTimestamp - unixTimestamp
    const ageInYears = Math.floor(ageInSeconds / (60 * 60 * 24 * 365.25))

    useEffect(() => {
        const host =
            typeof window !== 'undefined' ? window.location.hostname : ''
        const pathMaster =
            typeof window !== 'undefined' ? window.location.pathname : ''
        const pathSalon =
            typeof window !== 'undefined' ? window.location.pathname : ''

        const partsWord = host.split('.')[0]
        const parts = cities.find((item) => item.url === partsWord)?.name2
        const partsCity = cities.find((item) => item.url === partsWord)?.name3
        setPartsCity(partsCity)

        let title = `Rus.Tattoo в ${parts ? parts : 'Россия'}  / Rus.Tattoo`

        if (pathMaster.split('/')[1] === 'master') {
            title = `${master.firstname} ${master.lastname} в ${
                parts ? parts : 'Россия'
            }  / Rus.Tattoo`
        } else if (pathSalon.split('/')[1] === 'salon') {
            title = `${master.firstname} ${master.lastname} в ${
                parts ? parts : 'Россия'
            }  / Rus.Tattoo`
        }

        document.title = title
    }, [])

    const getWhere = (master, appliedFilters) => {
        let where = ''

        if (master) {
            where += `service like '%${
                CATEGORIES.find((i) => i.route == master)?.service
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

            if (master) {
                where += ' and '
            }
            where += `${conditions}`
        }

        return where
    }

    const worksQuery = useMasterQuery({
        master,
        options: {
            id: master.master_id,
            ...(selected !== 'За все время' && { year: selected }),
            where: getWhere(master, appliedFilters),
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
        // if(worksQuery.isSuccess){
        // }
    }
    useEffect(() => {
        if (selected) {
            worksQuery.refetch()
        }
    }, [selected, worksCount, worksQuery.isSuccess])

    useEffect(() => {
        mastersApi.getMasters({}).then((res) => {
            setFilters(res.filters)
        })
    }, [master])

    const tabsData = [
        {
            label: `Работы (${
                worksQuery?.data?.pages?.[0]?.worksData?.worksCount || 0
            })`,
            content: (
                <WorkMaster
                    masterId={master.master_id}
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
            content: <MapMaster master={master} />,
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
                                        backgroundImage: `url(${master.logo})`,
                                    }}
                                >
                                    {/* <img src="upload/users/001.jpg" alt="" /> */}
                                </div>
                                <div className="profile__name">
                                    {master.firstname} {master.lastname}
                                </div>
                                {master.text && (
                                    <div className="profile__desc">
                                        {master.text}
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
                                    <p>
                                        Возраст {ageInYears && ageInYears} лет
                                    </p>
                                    <p>
                                        Стаж{' '}
                                        {ageInYearsStazh && ageInYearsStazh} лет
                                    </p>
                                </div>
                                <div className="profile__title mt">Адрес</div>
                                <div>
                                    <p>{master.address}</p>
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

                                {stili && (
                                    <>
                                        <div className="profile__title mt">
                                            Стили
                                        </div>
                                        <div className="profile__tags">
                                            {stili.map((item, index) => {
                                                return (
                                                    <a key={index} href="#">
                                                        {item.name}
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    </>
                                )}
                                {workSalon && (
                                    <>
                                        <div className="profile__title mt">
                                            Место работы
                                        </div>
                                        <div className="profile__users">
                                            {workSalon.map((item, index) => {
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
                                {proteam && (
                                    <>
                                        <div className="profile__title mt">
                                            ProTeam
                                        </div>
                                        <div className="profile__users">
                                            {proteam.map((item, index) => {
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

                                {master.text && (
                                    <>
                                        <div className="profile__title mt">
                                            Обо мне
                                        </div>
                                        <div>
                                            <p>{master.text}</p>
                                        </div>
                                    </>
                                )}

                                {/* <div className="profile__title mt">Награды</div> */}
                                <div className="profile__title mt"></div>
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
