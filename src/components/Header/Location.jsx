'use client'

import { getSubdomainFromURL } from '@/api/mastersApi'
import { setModal, setSubdomain } from '@/redux/slices/rootSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cities } from '@/data/cities'
import { useEffect, useState } from 'react'

export default function Location({mobile}) {
    const subdomain = useSelector((state) => state.root.subdomain)
    const cityObject = cities.find((i) => i.url == subdomain)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSubdomain(getSubdomainFromURL(window.location.hostname)))
    }, [])

    if (mobile) {
        return (
            <li className="nav__item">
                <div
                    onClick={() =>
                        dispatch(
                            setModal({
                                id: 'LOCATION',
                            })
                        )
                    }
                    className="nav__link nav__link--city"
                    data-fancybox
                    data-type="ajax"
                    data-src="_source/ajax-citys.html"
                >
                    {cityObject ? cityObject.name : 'Россия'}
                </div>
            </li>
        )
    }

    return (
        <div className="col-2 d-none d-lg-block city header__city">
            <span
                className="city__link"
                onClick={() =>
                    dispatch(
                        setModal({
                            id: 'LOCATION',
                        })
                    )
                }
            >
                {cityObject ? cityObject.name : 'Россия'}
            </span>
        </div>
    )
}
