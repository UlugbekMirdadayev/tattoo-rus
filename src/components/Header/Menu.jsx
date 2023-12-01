'use client'

import { setMobileMenu, setModal } from '@/redux/slices/rootSlice'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Location from './Location'

export default function Menu() {
    const path = usePathname()
    const dispatch = useDispatch()
    const mobileMenu = useSelector((state) => state.root.mobileMenu)

    const ROUTES = [
        { name: 'Мастера', url: 'masters' },
        { name: 'Салоны', url: 'salons' },
        { name: 'Работы', url: 'works' },
        { name: 'Заказы', url: 'orders' },
        { name: 'Магазин', url: 'shop', class: 'nav__link--basket' },
    ]

    const openLocations = () => {
        dispatch(setMobileMenu(false))
        dispatch(
            setModal({
                id: 'LOCATION',
            })
        )
    }

    return (
        <div className={`d-lg-none nav-mobile ${mobileMenu ? 'active' : ''}`}>
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-10 col-xs-8 col-md-6">
                        <div className="nav-mobile__inner">
                            <ul className="nav__list">
                                <Location mobile={true} />
                                {ROUTES.map((i) => (
                                    <li className="nav__item" key={i}>
                                        <Link
                                            prefetch={false}
                                            href={'/' + i.url}
                                            onClick={() =>
                                                dispatch(setMobileMenu(false))
                                            }
                                            className={`nav__link ${
                                                i.class ?? ''
                                            } ${
                                                path.includes(i.url)
                                                    ? 'nav__link--active'
                                                    : ''
                                            }`}
                                        >
                                            {i.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
