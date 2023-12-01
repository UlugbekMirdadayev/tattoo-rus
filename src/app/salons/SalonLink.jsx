'use client'

import { getSubdomainFromURL } from '@/api/mastersApi'
import Link from 'next/link'
import { Fragment, useState } from 'react'

export default function SalonLink({ children, salonLink, salonCity, className }) {
    const [subdomain] = useState(getSubdomainFromURL(window.location.hostname))

    const getUrl = () => {
        return (
            window.location.protocol +
            `//${salonCity}.` +
            window.location.host +
            salonLink
        )
    }

    return (
        <Fragment>
            {subdomain || !salonCity ? (
                <Link target="_blank" href={salonLink} className={className ?? "card-line__author author"}>
                    {children}
                </Link>
            ) : (
                <a
                    href={getUrl()}
                    target="_blank"
                    className={className ?? "card-line__author author"}
                >
                    {children}
                </a>
            )}
        </Fragment>
    )
}
