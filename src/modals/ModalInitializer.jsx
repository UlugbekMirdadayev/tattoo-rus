'use client'

import { useDispatch, useSelector } from 'react-redux'
import Location from './Location/Location'
import { setModal } from '@/redux/slices/rootSlice'
import Filters from './Filters/Filters'
import Work from './Work/Work'
import { useState } from 'react'
import WorkSalon from './WorkSalon/WorkSalon'

export default function ModalInitializer() {
    const dispatch = useDispatch()
    const modal = useSelector((state) => state.root.modal)
    const closeOnOverlayClick = (e) => {
        e.target.classList.contains('modal__overlay') &&
            dispatch(setModal(null))
    }
    const renderModal = (id) => {
        switch (id) {
            case 'LOCATION':
                return <Location />
            case 'FILTERS':
                return <Filters />
            case 'WORK':
                return <Work closeOnOverlayClick={closeOnOverlayClick} />
            case 'WORKSALON':
                return <WorkSalon closeOnOverlayClick={closeOnOverlayClick} />
            default:
                return <div></div>
        }
    }
    return (
        <div
            onClick={(e) => closeOnOverlayClick(e)}
            className={`modal__overlay modal__overlay_${
                modal ? 'on' : 'off'
            } ${modal}`}
        >
            {renderModal(modal)}
        </div>
    )
}
