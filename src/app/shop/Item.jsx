import ItemInfo from './ItemInfo'

export default function Item() {
    return (
        <div className="row catalog__item">
            <div className="col-5 col-md-4 catalog__item-1">
                <img
                    className="catalog__image"
                    src="https://mustang-tattoo.ru/upload/iblock/d41/d41b005d7ecd7640443a1bf82bbb0571.jpg"
                    alt=""
                />
            </div>
            <ItemInfo />
            <div className="col-12 col-md-3 catalog__item-3">
                <div className="row">
                    <div className="col-5 d-md-none">
                        <div className="catalog__desc">
                            <a href="#" className="catalog__desc-rating">
                                50 к рейтингу
                            </a>
                            <a href="#" className="catalog__desc-cert">
                                Сертифицирован
                            </a>
                        </div>
                    </div>
                    <div className="col-7 col-md-12">
                        <div className="catalog__cost">11 000 ₽</div>
                        <div className="catalog__discont">
                            <span>-20%</span> 18 000 ₽
                        </div>
                        <div className="d-none d-md-block catalog__desc">
                            <a href="#" className="catalog__desc-rating">
                                50 к рейтингу
                            </a>
                            <a href="#" className="catalog__desc-cert">
                                Сертифицирован
                            </a>
                        </div>
                        <div className="catalog__button">
                            <a
                                href="#"
                                className="btn btn--red btn--w100 catalog__button-link"
                            >
                                В корзину
                            </a>
                            {/* <a
                                href="#"
                                className="btn btn--gray btn--w100 catalog__button-link hide"
                                data-params="radio_color_001:2,radio_diametr_001:2,"
                            >
                                Уведомить
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
