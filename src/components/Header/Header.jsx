'use client'

import { setNewWorks } from '@/redux/slices/rootSlice'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ModalMaster } from '../ModalMaster/Modal'
import Burger from './Burger'
import Location from './Location'
import Menu from './Menu'

export default function Header() {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const ROUTES = [
        { id: 1, name: 'Мастера', url: 'masters' },
        { id: 2, name: 'Салоны', url: 'salons' },
        { id: 3, name: 'Работы', url: 'works' },
        { id: 4, name: 'Заказы', url: '' },
        { id: 5, name: 'Магазин', url: 'shop' },
    ]
    // const pathname = usePathname()

    return (
        <header className="header compensate-for-scrollbar">
            <div className="container">
                <div className="row align-items-center header__wrapper">
                    <Burger />
                    <div className="col-6 col-sm-8 col-lg-2 logo header__logo">
                        <Link href="/" prefetch={false} className="logo__link">
                            <img
                                src="/images/logo.svg"
                                className="logo__image"
                            />
                        </Link>
                    </div>
                    <Location />
                    <div className="col-6 d-none d-lg-block nav header__nav">
                        <ul className="nav__list">
                            {ROUTES.map((i) => (
                                <li
                                    className="nav__item"
                                    onClick={() => dispatch(setNewWorks(false))}
                                    key={i.id}
                                >
                                    <Link
                                        prefetch={false}
                                        href={'/' + i.url}
                                        className={`nav__link`}
                                    >
                                        {i.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-3 col-sm-2 col-lg-2 header__profile">
                        <Link
                            href="/cart"
                            prefetch={false}
                            className="header__shop"
                        >
                            {/* <span className="header__shop-notify">1</span> */}
                        </Link>
                        <button
                            className="header__profile-link"
                            data-src="#login_form"
                            data-options='{"baseClass": "fancybox-auto", "touch": false}'
                            onClick={() => setShowModal(true)}
                        >
                            Вход
                        </button>
                    </div>
                </div>
            </div>
            <Menu />
            <ModalMaster openModal={showModal} setOpenModal={setShowModal} />
        </header>
    )
}
