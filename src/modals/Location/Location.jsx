import { cities } from '@/data/cities'
import { useEffect } from 'react'
import styled from 'styled-components'
import { setModal } from '@/redux/slices/rootSlice'
import { useDispatch } from 'react-redux'

const HeaderSelectCityList = styled.div`
    column-count: 5;
    gap: 5px;
    column-gap: 20px;
    overflow: auto;

    a {
        display: block;
        cursor: pointer;
    }

    @media (max-width: 1000px) {
        column-count: 4;
    }

    @media (max-width: 800px) {
        column-count: 3;
    }

    @media (max-width: 650px) {
        column-count: 2;
    }

    @media (max-width: 500px) {
        padding: 0px 40px;
    }

    @media (max-width: 450px) {
        padding: 0px 30px;
    }
`

const Wrapper = styled.div`
    position: relative;

    & > svg {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 24px;
        z-index: 2;
        cursor: pointer;
    }
`

const HeaderSelectCityItem = styled.a``

export default function Location() {
    const dispatch = useDispatch()

    const changeLocation = (url) => {
        const host = window.location.hostname
        const parts = host.split('.')
        let domainWithoutSubdomain =
            parts.length > 2 ? parts.slice(1).join('.') : host

        if (process.env.NODE_ENV === 'development') {
            domainWithoutSubdomain = 'localhost:3000/'
        }

        return (
            window.location.protocol +
            (url ? `//${url}.` : '//') +
            domainWithoutSubdomain
        )
    }

    useEffect(() => {
        document.body.classList.add('fixed')
    }, [])

    return (
        <Wrapper className="popup" style={{ display: 'block' }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1"
                viewBox="0 0 24 24"
                onClick={() => dispatch(setModal(null))}
            >
                <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>
            </svg>
            <HeaderSelectCityList>
                {cities.map((i) => (
                    <HeaderSelectCityItem
                        key={i}
                        href={changeLocation(i.url)}
                        target="_blank"
                    >
                        {i.name}
                    </HeaderSelectCityItem>
                ))}
            </HeaderSelectCityList>
        </Wrapper>
    )
}
