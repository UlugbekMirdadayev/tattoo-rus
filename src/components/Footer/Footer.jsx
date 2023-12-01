export default function Footer() {
    return (
        <footer className="footer mt">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 footer__left">
                        <div className="row nav-footer">
                            <div className="col-6 col-sm-4">
                                <a href="#" className="nav-footer__link">
                                    Мастера
                                </a>
                            </div>
                            <div className="col-6 col-sm-4">
                                <a href="#" className="nav-footer__link">
                                    Салоны
                                </a>
                            </div>
                            <div className="col-6 col-sm-4">
                                <a href="#" className="nav-footer__link">
                                    Работы
                                </a>
                            </div>
                            <div className="col-6 col-sm-4">
                                <a href="#" className="nav-footer__link">
                                    Заказы
                                </a>
                            </div>
                            <div className="col-6 col-sm-4">
                                <a href="#" className="nav-footer__link">
                                    Магазин
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 footer__right">
                        {/* <div className="social">
                            <a
                                href="#"
                                target="_blank"
                                className="social__item social__item--instagram"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="social__item social__item--youtube"
                            >
                                <i className="fab fa-youtube"></i>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="social__item social__item--telegram"
                            >
                                <i className="fab fa-telegram-plane"></i>
                            </a>
                        </div> */}
                        <div className="copy">© RusTattoo, 2023</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
