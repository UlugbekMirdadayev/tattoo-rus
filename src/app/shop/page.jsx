'use client'
import { useEffect } from 'react'
import Item from './Item'
import Menu from './Menu'

export default function Shop() {
    useEffect(() => {
        let title = `Магазин  / Rus.Tattoo`
        document.title = title
    }, [])
    return (
        <section>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-md-9">
                        <h1 className="h2">Магазин</h1>
                    </div>
                </div>
                <div className="filter mt">
                    <div className="row">
                        <div className="col-12 col-lg-7 col-xl-6">
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
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4 col-xl-3 mt">
                        <h2 className="h5 mb">Каталог</h2>
                        <Menu />
                    </div>
                    <div className="col-12 col-lg-8 col-xl-9 mt">
                        <h2 className="h5 mb">Популярные товары</h2>
                        <div className="divider"></div>
                        <div className="catalog__items">
                            <Item />
                        </div>
                        <div className="row align-items-center">
                            <div className="col-12 mt">
                                <a
                                    href="#"
                                    className="btn btn--w100 works-more"
                                >
                                    Показать ещё
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
