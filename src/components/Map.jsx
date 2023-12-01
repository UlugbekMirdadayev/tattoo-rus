'use client'

import React, { useRef, useState } from 'react'
import { YMaps, Map, ObjectManager, Placemark } from '@pbe/react-yandex-maps'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Wrapper = styled.div``

export default function MapWrapper({ points = [], city }) {
    const container = useRef()
    const [mapState, setMapState] = useState({
        center: [61.698657, 99.505405],
        zoom: 3,
        behaviors: ['default', 'scrollZoom'],
    })

    const getUrl = (salonLink, salonCity) => {
        return (
            window.location.protocol +
            `//${salonCity}.` +
            window.location.host +
            salonLink
        )
    }

    const collection = {
        type: 'FeatureCollection',
        features: points.map((point, id) => {
            return {
                id: id,
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: point.location
                        .split(', ')
                        .map((i) => Number(i)),
                },
                properties: {
                    balloonContent: `
              <div>csfcdcjnnj</div>
            `,
                    clusterCaption: `Метка №${id + 1}`,
                },
            }
        }),
    }

    const geocode = () => {
        if (city) {
            fetch(
                `https://geocode-maps.yandex.ru/1.x/?apikey=96ad53dc-00a5-4a43-8c9a-8c18b66376f7&geocode=город+${city.name}&format=json`
            )
                .then((response) => response.json())
                .then((data) => {
                    setMapState((prev) => ({
                        ...prev,
                        center: data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                            .split(' ')
                            .map((i) => Number(i))
                            .reverse(),
                        zoom: 10,
                    }))
                })
        } else {
            setMapState({
                center: [61.698657, 99.505405],
                zoom: 3,
                behaviors: ['default', 'scrollZoom'],
            })
        }
    }

    return (
        <Wrapper className="mt" ref={container}>
            <YMaps>
                <Map
                    width={`${container.current?.clientWidth}px`}
                    height="500px"
                    state={mapState}
                    onLoad={(ymaps) => geocode(ymaps)}
                    modules={[
                        'geoObject.addon.balloon',
                        'geoObject.addon.hint',
                        'geocode',
                    ]}
                >
                    {points.map((i) => (
                        <Placemark
                            options={{
                                preset: 'islands#circleDotIcon',
                                iconColor: '#DE2104',
                                balloonMinWidth: 300,
                            }}
                            properties={{
                                balloonContent: `<a target="_blank" href='${getUrl(
                                    i.url,
                                    i.city
                                )}' class='author'><div class='author__image'><div class='author__photo ibg' style='background-image: url(${
                                    i.logo
                                });'></div></div><div class='author__data'><div class='author__name'>${
                                    i.name
                                }</div><div class='author__desc'>${
                                    i.pagetitle
                                }</div></div></a>`,
                                // <div class='author__rating rating'><div class='rating__points'>4,2</div><div class='rating__votes'>(25)</div></div>
                            }}
                            geometry={i.location
                                .split(', ')
                                .map((i) => Number(i))}
                        />
                    ))}

                    {/* <ObjectManager
                        objects={{
                            openBalloonOnClick: true,
                        }}
                        clusters={{}}
                        options={{
                            clusterize: true,
                            gridSize: 32,
                        }}
                        defaultFeatures={collection}
                        modules={[
                            'objectManager.addon.objectsBalloon',
                            'objectManager.addon.clustersBalloon',
                        ]}
                    /> */}
                </Map>
            </YMaps>
        </Wrapper>
    )
}
