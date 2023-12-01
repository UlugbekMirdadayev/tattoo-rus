import { useEffect } from 'react'

const MapMaster = ({ master }) => {
  const location = master.location.split(',').map(item => (Number(item)))
    useEffect(() => {
        // Load the Yandex Maps script
        const script = document.createElement('script')
        script.src =
            'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=08f17e74-7b2b-49c6-a9cd-efbd5f443100'
        script.async = true

        // Initialize the map when the script is loaded
        script.onload = () => {
            ymaps.ready(init)

            function init() {
                const myMap = new ymaps.Map(
                    'map',
                    {
                        center: [...location],
                        zoom: 10,
                    },
                    {
                        searchControlProvider: 'yandex#search',
                    }
                )

                const objectManager = new ymaps.ObjectManager({
                    clusterize: true,
                })

                objectManager.clusters.options.set(
                    'preset',
                    'islands#invertedBlueClusterIcons'
                )
                objectManager.clusters.options.set(
                    'clusterIconColor',
                    '#241E0C'
                )

                myMap.geoObjects.add(objectManager)

                const data = {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            id: 29,
                            geometry: {
                                type: 'Point',
                                coordinates: [...location],
                            },
                            properties: {
                                balloonContent:
                                    "<a href='#' class='author'><div class='author__image'><div class='author__photo ibg' style='background-image: url(upload/salon/001.jpg);'></div></div><div class='author__data'><div class='author__name'>Zznak 29</div><div class='author__desc'>Татуировки</div><div class='author__rating rating'><div class='rating__points'>4.2</div><div class='rating__votes'>(25)</div></div></div></a>",
                                clusterCaption: 'Zznak 29',
                                hintContent: 'Zznak 29',
                            },
                            options: {
                                preset: 'islands#circleDotIcon',
                                iconColor: '#DE2104',
                                balloonMinWidth: 300,
                            },
                        },
                    ],
                }

                objectManager.add(data)
            }
        }

        document.body.appendChild(script)

        return () => {
            // Clean up the script when the component unmounts
            document.body.removeChild(script)
        }
    }, [])

    return (
        <div className="tabs-data__content" data-id="4">
            <div className="mt">
                <div id="map"></div>
            </div>
        </div>
    )
}

export default MapMaster
