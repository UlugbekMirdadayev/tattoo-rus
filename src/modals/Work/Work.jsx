import SalonLink from '@/app/salons/SalonLink'
import Image from 'next/image'
import { formatDate } from '@/lib/functions'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { setModal } from '@/redux/slices/rootSlice'
import { worksApi } from '@/api/worksApi'
import { Slide } from 'react-slideshow-image'
import styled from 'styled-components'

const WorkPhoto = styled(Image)`
    width: 100%;
    height: 100%;
    min-height: 88px;
    background: #faf7f7;
`
export const Arrows = styled.div`
    position: absolute;
    left: 100px;
    top: 50%;
    opacity: 1;
    z-index: 100;
    transform: translateY(-50%);
    color: #000;
  background: #fff;

    font-weight: 600;
    font-size: 20px;

    &.right {
        left: auto;
        right: 100px;
    }
    @media only screen and (max-width: 768px) {
        // display: none
    }
`
export default function Work({ closeOnOverlayClick }) {
    const data = useSelector((state) => state.root.modalData.WORK?.data?.[0]);
  const getPlot = data?.getPlot?.data;
  const dispatch = useDispatch();
  const slider = useRef();
  const slidedataIds = useSelector((state) => state.root.slidedataIds);
  const selectModalId = slidedataIds ? slidedataIds.indexOf(data?.id) : -1;

  const [selectId, setSelectId] = useState(selectModalId);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const switchPhoto = (e, next) => {
    e.stopPropagation();
    next ? slider.current.goNext() : slider.current.goBack();
  };

  const getWorks = async (id) => {
    const res = await worksApi.getWork({ id });
    return res;
  };

  const handleArrowClick = async (isNext) => {
    if (selectId !== -1) {
      setLoading(true);
      const res = await getWorks(
        slidedataIds[!isNext && selectId !== 0 ? selectId - 1 : selectId + 1]
      );
      if (res) {
        setSelectId((prev) =>
          !isNext && selectId !== 0 ? prev - 1 : prev + 1
        );
        dispatch(setModal({ id: 'WORK', data: res }));
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.add('hideScroll');

    return () => {
      document.body.classList.remove('hideScroll');
    };
  }, [selectModalId, selectId, getPlot]);

  if (!data) {
    return null; // Return null or some other component for rendering
  }
    const properties = {
        duration: 50,
        autoplay: false,
        transitionDuration: 500,
        arrows: false,
        infinite: false,
        easing: 'ease',
        indicators: false,

    }
    return (
        <>
            <div ref={sliderRef} className="keen-slider relative">
                <div className="keen-slider__slide number-slide1"></div>
            </div>
            <div className="popup work-modal" style={{ display: 'block' }}>
                <button
                    className="work-modal_close"
                    onClick={(e) => {
                        closeOnOverlayClick(e)
                        dispatch(setModal(null))
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1"
                        viewBox="0 0 24 24"
                    >
                        <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>
                    </svg>
                </button>
                <div className="popup__inner work">
                    <div className="work__header">
                        <div className="row align-items-end">
                            <div className="col-12 col-xl-6">
                                <div className="author author--80">
                                    <div className="author__image">
                                        <a
                                            // href={
                                            //     data.masterData.data[0]
                                            //         .url
                                            // }
                                            className="author__photo ibg"
                                            style={{
                                                backgroundImage: `url(${data?.masterData?.data?.[0]?.logo})`,
                                            }}
                                        ></a>
                                    </div>
                                    <div className="author__data">
                                        <a href="#" className="author__title">
                                            {data.name}
                                        </a>
                                        <div>
                                            <SalonLink
                                                salonLink={
                                                    data.masterData?.data[0].url
                                                }
                                                salonCity={
                                                    data.masterData?.data[0]
                                                        .city
                                                }
                                                className="author__name"
                                            >
                                                <Fragment>
                                                    {
                                                        data.masterData?.data[0]
                                                            ?.firstname
                                                    }{' '}
                                                    {
                                                        data.masterData?.data[0]
                                                            ?.lastname
                                                    }
                                                </Fragment>
                                            </SalonLink>
                                            <span className="author__date">
                                                {formatDate(data.vk_date)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-6 work__tags">
                                <div className="mt">
                                    {data?.style?.map((item, index) => {
                                        return (
                                            <a
                                                key={index}
                                                href="#"
                                                className="work__tag"
                                            >
                                                {item.name}
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="work__image mt" data-id="work-001">
                        {/* <div className="work__bg ibg">
                            <img src={data.photo} alt="" />
                        </div> */}
                        {getPlot.length  ? (
                            <Slide ref={slider} {...properties}>
                                <WorkPhoto
                                    src={data.photo_s}
                                    alt="Фотография работы"
                                    unoptimized
                                    width={289}
                                    height={400}
                                    priority
                                />
                                {getPlot.map((i) => (
                                    <WorkPhoto
                                        src={i.photo_s}
                                        alt="Фотография работы"
                                        unoptimized
                                        width={289}
                                        height={400}
                                        priority
                                    />
                                ))}
                            </Slide>
                        ) : (
                            <img src={data.photo_s} alt="" />
                        )}

                        {getPlot.length && (
                            <>
                                <Arrows
                                    className="works__button"
                                    onClick={(e) => switchPhoto(e)}
                                >
                                    &lt;
                                </Arrows>
                                <Arrows
                                    className="works__button right"
                                    onClick={(e) => switchPhoto(e, true)}
                                >
                                    &gt;
                                </Arrows>
                            </>
                        )}
                        <div className="work__buttons">
                            <div
                                className="work__button work__heart"
                                data-id="work-001"
                            >
                                <svg
                                    width="22"
                                    height="20"
                                    viewBox="0 0 22 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M19.4384 9.80756L10.9999 18.5594L2.41007 9.65395C2.40927 9.6531 2.40846 9.65226 2.40766 9.65141C1.53588 8.73296 1 7.48715 1 6.11111C1 3.27882 3.27041 1 6.05 1C7.75278 1 9.26219 1.85244 10.1797 3.16848L11 4.34515L11.8203 3.16848C12.7378 1.85244 14.2472 1 15.95 1C18.7296 1 21 3.27882 21 6.11111C21 7.55579 20.4092 8.85734 19.459 9.78679L19.4485 9.79702L19.4384 9.80756Z"></path>
                                </svg>
                            </div>
                            <div className="work__button work__share">
                                <svg
                                    width="17"
                                    height="18"
                                    viewBox="0 0 17 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M14 6C15.6569 6 17 4.65685 17 3C17 1.34315 15.6569 0 14 0C12.3431 0 11 1.34315 11 3C11 3.13708 11.0092 3.27202 11.027 3.40423L5.05661 6.81588C4.51958 6.31001 3.79599 6 3 6C1.34315 6 0 7.34315 0 9C0 10.6569 1.34315 12 3 12C3.77051 12 4.47318 11.7095 5.00447 11.2321L11.0504 15.5506C11.309 16.9445 12.5312 18 14 18C15.6569 18 17 16.6569 17 15C17 13.3431 15.6569 12 14 12C12.9353 12 12.0001 12.5547 11.4676 13.3908L5.96491 9.46031C5.98801 9.31025 6 9.15653 6 9C6 8.8629 5.9908 8.72795 5.97299 8.59574L11.9434 5.1841C12.4804 5.68998 13.204 6 14 6ZM13 15.0085C13.0001 15.0031 13.0001 14.9977 13 14.9924C13.0041 14.4436 13.4503 14 14 14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16C13.4505 16 13.0046 15.5569 13 15.0085ZM14 4C14.5523 4 15 3.55228 15 3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3C13 3.55228 13.4477 4 14 4ZM4 9C4 9.55228 3.55228 10 3 10C2.44772 10 2 9.55228 2 9C2 8.44772 2.44772 8 3 8C3.55228 8 4 8.44772 4 9Z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="work__button works__edit">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12.8497225,0.706970001 L0.813684852,12.7383526 L0.813684852,12.7383526 L0,18 L5.27561455,17.1985566 L17.2945791,5.14855795 C17.6842973,4.75783344 17.6838283,4.12526615 17.2935312,3.73511995 L14.2642096,0.706970001 C13.8734431,0.316901687 13.240489,0.316901687 12.8497225,0.706970001 Z"></path>
                                </svg>
                            </div>
                            <div className="work__button works__delete">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1.98105113,0 L15.9989393,0 L18,0 L18,2.99973079 L15.9989393,2.99973079 L15.9989393,14 C15.9989393,16.209139 14.2080783,18 11.9989393,18 L5.98105113,18 C3.77191213,18 1.98105113,16.209139 1.98105113,14 L1.98105113,2.99973079 L1.98105113,2.99973079 L0,2.99973079 L0,0 L1.98105113,0 Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loaded && instanceRef.current && (
                <>
                    <Arrow
                        left
                        disabled={selectId === 0}
                        onClick={async () => {
                            if (selectId === 0) {
                            } else {
                                await handleArrowClick(false)
                            }
                        }}
                    />

                    <Arrow onClick={async () => await handleArrowClick(true)} />
                </>
            )}
        </>
    )
}
function Arrow(props) {
    const disabeld = props.disabled ? ' arrow--disabled' : ''
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${
                props.left ? 'arrow--left' : 'arrow--right'
            } ${disabeld}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}