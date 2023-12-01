'use client'

import { setMobileMenu } from '@/redux/slices/rootSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Burger() {
    const dispatch = useDispatch()
    const mobileMenu = useSelector((state) => state.root.mobileMenu)

    return (
        <div
            className="col-3 col-sm-2 header__burger"
            onClick={() => dispatch(setMobileMenu(!mobileMenu))}
        >
            <div className={`burger ${mobileMenu ? 'active' : ''}`}>
                <span></span>
            </div>
        </div>
    )
}
