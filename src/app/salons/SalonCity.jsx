'use client'

import { getSubdomainFromURL } from '@/api/mastersApi'
import { cities } from '@/data/cities'
import { Fragment, useState } from 'react'

export default function SalonCity({ city }) {
    const [subdomain] = useState(getSubdomainFromURL(window.location.hostname))
    const cityObject = cities.find(i => i.url === city)

    if (subdomain || !cityObject) {
        return
    }

    return (
        <div className="author__desc" style={{ margin: '0 0 5px 0' }}>
            г. {cities.find(i => i.url === city).name}
        </div>
    )
}
