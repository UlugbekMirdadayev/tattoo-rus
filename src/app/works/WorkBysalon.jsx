'use client'

import styled from 'styled-components'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { setModal, setPlot, setSlidedataIds } from '@/redux/slices/rootSlice'
import { formatDate } from '@/lib/functions'
import SalonLink from '../salons/SalonLink'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { useEffect, useRef, useState } from 'react'
import { cities } from '@/data/cities'
import { worksApi } from '@/api/worksApi'
import Work from '@/modals/Work/Work'
import { masterApi } from '@/api/masterApi'
import { salonApi } from '@/api/salonApi'

const Text = styled.span`
    font-size: 14px;
    line-height: 20px;
    color: #000;
`

const Wrapper = styled.div`
    display: inline-flex;
    overflow: hidden;
    border-radius: 8px;
    width: 100%;
    position: relative;
`

const WorkPhoto = styled(Image)`
    width: 100%;
    height: 100%;
    min-height: 88px;
    background: #faf7f7;
`

const WorkInfo = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    background: rgba(36, 30, 12, 0.6);
    transition: opacity 0.2s;
    padding: 24px;
    padding-right: 60px;

    @media (max-width: 1000px) {
        visibility: hidden;
    }
`

const WorkInfoName = styled(Text)`
    color: white;
    font-size: 16px;
    font-weight: 500;
`

const WorkInfoDesc = styled(Text)`
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    line-height: 18px;
    padding-top: 2px;
`

const WorkInfoDate = styled(Text)`
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    line-height: 16px;
    padding-top: 5px;
`

const WorkInfoAuthor = styled.div`
    display: flex;
    position: absolute;
    bottom: 24px;
    gap: 10px;
    align-items: center;
`

const WorkInfoAuthorAvatar = styled(Image)`
    display: inline-flex;
    width: 32px;
    height: 32px;
    border-radius: 16px;
`

const WorkInfoAuthorInfo = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
`

const WorkInfoAuthorInfoName = styled(Text)`
    color: white;
    line-height: 1;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
`

const WorkInfoAuthorInfoDate = styled(Text)`
    color: rgba(255, 255, 255, 0.6);
    line-height: 1;
    font-size: 12px;
    line-height: 1.35;
`

const WorkAdultInfo = styled.div`
    display: flex;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
`

export const WorkAdultInfoIcon = styled(Image)``

export const Arrow = styled.div`
    position: absolute;
    left: 30px;
    top: 50%;
    opacity: 1;
    z-index: 9999;
    transform: translateY(-50%);
    color: #fff;
    font-weight: 600;
    font-size: 20px;

    &.right {
        left: auto;
        right: 30px;
    }
`

export const WorkAdultInfoText = styled(Text)`
    color: white;
    font-size: 16px;
    margin-top: 10px;
`

export default function WorkBysalon({ data, id, masterId, salonId, masters }) {
    const dispatch = useDispatch()
    const [partsCity, setPartsCity] = useState('')
    const [pathSalon, setPathSalon] = useState('')
    const [work, setWork] = useState(null)

    const plot = data.getPlot?.data?.length > 0
    const slider = useRef()
    const idData = masters.map((item) => item.masters)[0]
    const uniqueValues = [...new Set(idData)];
    const workCount = data.masterData?.data?.[0]?.works
    const switchPhoto = (e, next) => {
        e.stopPropagation()
        next ? slider.current.goNext() : slider.current.goBack()
    }
    const [photoId, setPhotoId] = useState('')

    const getMasterWorksID = async () => {
        const res = await masterApi.getMasterWorksID({
            id: masterId,
            first: workCount,
        })
        setPhotoId(res)
    }

    const getSalonWorksId = async () => {
        const res = await salonApi.getSalonWorksId({
            id: salonId,
            first: workCount,
        })
        setPhotoId(res)
    }

  
    const getWorks = async () => {
        const res = await worksApi.getWork({ id })
        
        setWork(res)
    }
    useEffect(() => {
        getSalonWorksId()
        getMasterWorksID()
        getWorks()
    }, [])
    useEffect(() => {
        const pathMaster =
            typeof window !== 'undefined' ? window.location.pathname : ''
        const pathSalon =
            typeof window !== 'undefined' ? window.location.pathname : ''

        const partsCity = pathMaster.split('/')[1] === 'master'
        setPartsCity(partsCity)
        setPathSalon(pathSalon.split('/')[1] === 'salon')
    }, [work])

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const properties = {
        duration: 5000,
        autoplay: false,
        transitionDuration: 500,
        arrows: false,
        infinite: true,
        easing: 'ease',
    }
    return (
        <Wrapper
            className={`works__item ${data.adults ? 'works__item--eye' : ''}`}
            onClick={() => {
                dispatch(
                    setModal({
                        id: 'WORKSALON',
                        data: work,
                    })
                )
                dispatch(
                    setSlidedataIds(
                        photoId.worksData?.data?.map((item) => item.id)
                    )
                )
            }}
        >
            {data.adults && (
                <img
                    src="upload/masonry/014.jpg"
                    alt=""
                    className="lazy lazy-loaded"
                />
            )}
            <Slide ref={slider} {...properties}>
            <WorkPhoto
                src={data.photo_s}
                alt="Фотография работы"
                unoptimized
                width={289}
                height={400}
                priority
            />
            {/* {data.getPlot.data.map((i) => (
                    <WorkPhoto
                        src={i.photo_s}
                        alt="Фотография работы"
                        unoptimized
                        width={289}
                        height={400}
                        priority
                    />
                ))} */}
            </Slide>

            <div className="works__data">
                {partsCity && (
                    <>
                        <a href="#" className="works__name">
                            {data.name}
                        </a>
                        {data.place[0] && (
                            <div className="works__desc">
                                {data.place[0].name}
                            </div>
                        )}
                        {data.style && (
                            <div className="works__desc">
                                {data.style.map((item, index) => {
                                    return (
                                        <a key={index} href="#">
                                            {item.name},{' '}
                                        </a>
                                    )
                                })}
                            </div>
                        )}
                        <div className="author__date">
                            {formatDate(data.vk_date, true)}
                        </div>
                    </>
                )}
                {pathSalon && (
                    <>
                        <div>
                            <a href="#" className="works__name">
                                {data.name}
                            </a>
                            {data.place[0] && (
                                <div className="works__desc">
                                    {data.place[0].name}
                                </div>
                            )}
                            {data.style && (
                                <div className="works__desc">
                                    {data.style.map((item, index) => {
                                        return (
                                            <a key={index} href="#">
                                                {item.name},{' '}
                                            </a>
                                        )
                                    })}
                                </div>
                            )}
                            <div className="author__date">
                                {formatDate(data.vk_date, true)}
                            </div>
                        </div>
                        <SalonLink
                            salonLink={data.master.data[0].url}
                            salonCity={data.master.data[0].city}
                            className="card-vert__author author author--32 author--light"
                        >
                            <div className="author__image">
                                <div
                                    className="author__photo ibg"
                                    style={{
                                        backgroundImage: `url(${data.master.data[0].logo})`,
                                    }}
                                ></div>
                            </div>
                            <div className="author__data">
                                <div className="author__name">
                                    {data.master.data[0].firstname}{' '}
                                    {data.master.data[0].lastname}
                                </div>
                                <div className="author__date">
                                    {formatDate(data.vk_date, true)}
                                </div>
                            </div>
                        </SalonLink>
                    </>
                )}
            </div>

            {/* {plot ? (
                <>
                    <Arrow
                        className="works__button"
                        onClick={(e) => switchPhoto(e)}
                    >
                        &lt;
                    </Arrow>
                    <Arrow
                        className="works__button right"
                        onClick={(e) => switchPhoto(e, true)}
                    >
                        &gt;
                    </Arrow>
                </>
            ) : (
                <>
                    <div className="works__buttons">
                        <div className="works__button works__heart">
                            <svg
                                width="18"
                                height="16"
                                viewBox="0 0 18 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M15.7811 7.69919L8.99987 14.5759L2.09346 7.57479C1.41383 6.87441 1 5.92933 1 4.88889C1 2.75279 2.75673 1 4.95 1C6.29044 1 7.47145 1.65596 8.18577 2.65781L9 3.79978L9.81423 2.65781C10.5285 1.65596 11.7096 1 13.05 1C15.2433 1 17 2.75279 17 4.88889C17 5.98135 16.5436 6.96933 15.8019 7.67865L15.7913 7.68876L15.7811 7.69919Z"></path>
                            </svg>
                        </div>
                        <div className="works__button works__edit">
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
                        <div className="works__button works__delete">
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
                </>
            )} */}

            {/* <WorkInfo>
                {data.name !== null ? (
                    <WorkInfoName>{data.name}</WorkInfoName>
                ) : null}
                {data.desc !== null ? (
                    <WorkInfoDesc>{data.desc}</WorkInfoDesc>
                ) : null}
                {data.date !== null ? (
                    <WorkInfoDate>{data.date}</WorkInfoDate>
                ) : null}
                {data.authorAvatar !== null && data.authorName !== null ? (
                    <WorkInfoAuthor>
                        <WorkInfoAuthorAvatar
                            src={data.authorAvatar}
                            width={32}
                            height={32}
                            alt={data.authorName ?? ''}
                        />
                        <WorkInfoAuthorInfo>
                            <WorkInfoAuthorInfoName>
                                {data.authorName}
                            </WorkInfoAuthorInfoName>
                            <WorkInfoAuthorInfoDate>
                                {data.authorDate}
                            </WorkInfoAuthorInfoDate>
                        </WorkInfoAuthorInfo>
                    </WorkInfoAuthor>
                ) : null}
            </WorkInfo> */}
        </Wrapper>
    )
}
