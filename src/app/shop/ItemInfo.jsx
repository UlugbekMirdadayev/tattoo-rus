export default function ItemInfo() {
    return (
        <div className="col-7 col-md-5 catalog__item-2">
            <div className="catalog__shop">
                <a href="#" className="catalog__shop-link">
                    MT Mustang Tattoo
                </a>
            </div>
            <div className="catalog__name">
                <a
                    href="#"
                    className="catalog__name-link"
                    data-name="Тату машинка Element"
                >
                    Тату машинка Element
                </a>
            </div>
            <div className="catalog__stars stars">
                <div className="stars__items stars__items--transparent stars__items--1">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className="catalog__params">
                <div className="catalog__params-group">
                    <p>Цвет:</p>
                    <div>
                        <input
                            type="radio"
                            name="radio_color_001"
                            className="catalog__radio"
                            data-name="красный Неон"
                            id="radio_color_001-1"
                            value="1"
                            checked
                        />
                        <label
                            htmlFor="radio_color_001-1"
                            className="catalog__radio-label catalog__radio-label--color"
                        >
                            <span
                                style={{
                                    backgroundColor: '#DE2104',
                                }}
                            ></span>
                        </label>
                        <input
                            type="radio"
                            name="radio_color_001"
                            className="catalog__radio"
                            data-name="черный Неон"
                            id="radio_color_001-2"
                            value="2"
                        />
                        <label
                            htmlFor="radio_color_001-2"
                            className="catalog__radio-label catalog__radio-label--color"
                            style={{
                                backgroundColor: 'gold',
                            }}
                        >
                            <span
                                style={{
                                    backgroundColor: '#000000',
                                }}
                            ></span>
                        </label>
                    </div>
                </div>
                <div className="catalog__params-group">
                    <p>Диаметр:</p>
                    <div>
                        <input
                            type="radio"
                            name="radio_diametr_001"
                            className="catalog__radio"
                            data-name="21 мм"
                            id="radio_diametr_001-1"
                            value="1"
                            checked
                        />
                        <label
                            htmlFor="radio_diametr_001-1"
                            className="catalog__radio-label"
                        >
                            21 мм
                        </label>
                        <input
                            type="radio"
                            name="radio_diametr_001"
                            className="catalog__radio"
                            data-name="25 мм"
                            id="radio_diametr_001-2"
                            value="2"
                        />
                        <label
                            htmlFor="radio_diametr_001-2"
                            className="catalog__radio-label"
                        >
                            25 мм
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
