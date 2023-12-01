import { graphqlApiUrl } from './constants'
import { getSubdomainFromURL } from './mastersApi'

const makeRequest = async (query) => {
    let headers = {}
    let subdomain = null; // Initialize subdomain outside the if block

    if (typeof window !== 'undefined') {
        subdomain = getSubdomainFromURL(window.location.hostname);
        // Rest of your code that depends on the window object
    }

    if (subdomain) {
        headers = {
            'x-rustattoo-city-code': subdomain,
        };
    }


    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
        next: {
            revalidate: 50,
        },
    };

    const response = await fetch(graphqlApiUrl, options);
    const { data } = await response.json();

    if (data) {
        return data.salons;
    }

    return {}
}

export const salonsApi = {
    async getSalons({ first = 12, offset = 0, where = '', service = '1233' }) {
        return makeRequest(`
            query {
                salons(first: ${JSON.stringify(
                    first
                )}, offset: ${JSON.stringify(offset)}, where: ${JSON.stringify(
            where
        )}, sortBy: "-vk_date") {
                    total
                    filters
                    data {
                        code
                        salon_id
                        id
                        name
                        pagetitle
                        logo
                        url
                        city
                        code
                        location
                        worksCount: works
                        works: worksData(first: 5, offset: 0, sortBy: "vk_date", service: ${JSON.stringify(
                            service.toString()
                        )}) {
                            total
                            data {
                                id
                                name
                                text
                                style
                                photo_s
                                photo
                                vk_date
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
        `)
    },
    async getSalon(id,  first = 12, year = 2023) {
        const query = `
            query {
                salons(first: 1, where: "code = '${id}'") {
                    total
                    filters
                    data {
                        code
                        salon_id
                        id
                        name
                        metro
                        address
                        text
                        masters
                        birthday
                        pagetitle
                        style
                        logo
                        url
                        city
                        location
                        worksCount: works
                        works: worksData(first: ${first}, offset: 0, where : " year = '${year}'") {
                            total
                            years
                            data {
                                id
                                name
                                text
                                style
                                photo_s
                                photo
                                vk_date
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
        const options = {
            method: 'POST',
            headers: {},
            body: JSON.stringify({ query }),
        }

        const response = await fetch(graphqlApiUrl, options)
        const { data } = await response.json()

        if (data) {
            // return { data: data.salons.data, total: data.salons.total }
            return data.salons.data[0]
        }

        return []
    },
}
