import { graphqlApiUrl } from './constants'

export function getSubdomainFromURL(url) {
    const matches = url.split('.')

    if (process.env.NODE_ENV === 'development') {
        if (matches.length > 1) {
            return matches[0]
        }
    }

    if (matches.length > 2) {
        return matches[0]
    }

    return null
}

export const mastersApi = {
    async getMasters({ first = 20, offset = 0, where = '', service = '1233' }) {
        const query = `
            query {
                masters(first: ${JSON.stringify(
                    first
                )}, offset: ${JSON.stringify(offset)}, where: ${JSON.stringify(
            where
        )}, sortBy: "-vk_date") {
                total
                filters
                data {
                    firstname
                    lastname
                    city
                    location
                    logo
                    id
                    url
                    code
                    master_id
                    worksCount: works
                    works: worksData(first: 5, offset: 0, sortBy: "vk_date", service: ${JSON.stringify(
                        service.toString()
                    )}) {
                        total
                        data {
                            id
                            name
                            text
                            photo_s
                            photo
                            style
                            vk_date
                            masterData {
                                data {
                                  id
                                  url
                                 logo
                                 firstname
                                    lastname
                                    
                                }
                               }
                            master: masterData {
                                data {
                                    id
                                    firstname
                                    lastname
                                    logo
                                    city
                                    url
                                }
                            }
                        }
                    }
                }
                }
            }
        `

        let headers = {}
        const subdomain = getSubdomainFromURL(window.location.hostname)

        if (subdomain) {
            headers = {
                'x-rustattoo-city-code': subdomain,
            }
        }

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify({ query }),
            next: {
                revalidate: 50,
            },
        }

        const response = await fetch(graphqlApiUrl, options)
        const { data } = await response.json()

        if (data) {
            // return { data: data.salons.data, total: data.salons.total }
            return data.masters
        }

        return {}
    },
    async getMaster(id, first = 12, year = 2023) {
        const query = `
            query {
                masters(first: 1, where: "code = '${id}'") {
                    filters
                    total
                    data {
                        id
                        master_id
                        firstname
                        lastname
                        logo
                        birthday
                        stazh
                        city
                        address
                        style
                        proteam
                        metro
                        salon {
                            data {
                              id
                              name
                              logo
                              url
                            }
                          }
                        phone
                        pricehour
                        service
                        location
                        code
                        workCount: works
                        worksData(first: ${first}, offset: 0, where : " year = '${year}'"){
                            worksCount
                            years
                            data{
                             vk_date
                             photo
                             year
                            }
                        }
                        
                    }
                  }
            }
        `

        const options = {
            method: 'POST',
            headers: {},
            body: JSON.stringify({ query }),
        }

        const response = await fetch(graphqlApiUrl, options)
        const { data } = await response.json()

        if (data) {
            // return { data: data.salons.data, total: data.salons.total }
            return data.masters.data[0]
        }

        return []
    },
}
