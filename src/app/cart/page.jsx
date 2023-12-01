'use client'

import { useSelector } from "react-redux"

export default function Cart() {
    
    return (
        <section className="cart">
            <div className="container">
                <form action="#" method="post" className="form">
                    <div className="row mt">
                        <div className="col-12 col-lg-8 mb">
                            <h1 className="h2">Ваш заказ</h1>
                            <div className="cart__items mt mb">
                                <h3 className="h5">MT Mustang Tattoo</h3>
                                <div className="cart__item">
                                    <a href="#" className="cart__item-image">
                                        <img
                                            src="upload/catalog/001-1.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <div className="cart__item-data">
                                        <a href="#" className="cart__item-name">
                                            Cheyenne HAWK Thunder, красный
                                            Carbon, 21 мм
                                        </a>
                                        <div className="cart__item-count">
                                            <input
                                                type="number"
                                                value="1"
                                                min="1"
                                                max="99"
                                                className="input input--count"
                                            />
                                        </div>
                                        <div className="cart__item-cost">
                                            <span>11000</span> ₽
                                        </div>
                                        <div className="cart__item-del"></div>
                                    </div>
                                </div>
                                <div className="cart__item">
                                    <a href="#" className="cart__item-image">
                                        <img
                                            src="upload/catalog/002.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <div className="cart__item-data">
                                        <a href="#" className="cart__item-name">
                                            Тату иглы Blitz Magnum
                                        </a>
                                        <div className="cart__item-count">
                                            <input
                                                type="number"
                                                value="1"
                                                min="1"
                                                max="99"
                                                className="input input--count"
                                            />
                                        </div>
                                        <div className="cart__item-cost">
                                            <span>15700</span> ₽
                                        </div>
                                        <div className="cart__item-del"></div>
                                    </div>
                                </div>
                                <div className="cart__itogo mt">
                                    Итого: <span>26700</span> ₽
                                </div>
                            </div>
                            {/* <div className="cart__items cart__items--none mt mb">
                                <h3 className="h5">Нет в наличии</h3>
                                <div className="cart__item">
                                    <a href="#" className="cart__item-image">
                                        <img
                                            src="upload/catalog/004.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <div className="cart__item-data">
                                        <a href="#" className="cart__item-name">
                                            Тату иглы Blitz Magnum
                                        </a>
                                        <div className="cart__item-count"></div>
                                        <div className="cart__item-cost">
                                            <span>15700</span> ₽
                                        </div>
                                        <div className="cart__item-del"></div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="cart__form">
                                <div className="cart__sum">
                                    <span>15700</span> ₽
                                </div>
                                <div className="cart__count">
                                    Итого за 5 товаров
                                </div>
                                <div className="divider mt mb"></div>
                                <h3 className="h5">Оформление заказа</h3>
                                <div className="form__group">
                                    <label htmlFor="name">Имя и фамилия</label>
                                    <input
                                        type="text"
                                        className="input"
                                        id="name"
                                    />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="address">Адрес доставки</label>
                                    <textarea
                                        name=""
                                        className="textarea"
                                        id="address"
                                    ></textarea>
                                </div>
                                <div className="form__group">
                                    <label htmlFor="comment">Комментарий</label>
                                    <textarea
                                        name=""
                                        className="textarea"
                                        id="comment"
                                    ></textarea>
                                </div>
                                <div className="form__group">
                                    <input
                                        type="submit"
                                        className="btn btn--w100 btn--red"
                                        value="Оформить заказ"
                                    />
                                </div>
                                <div className="form__desc mt">
                                    Ваш заказ будет передан передан официальному
                                    представителю производителя.
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
