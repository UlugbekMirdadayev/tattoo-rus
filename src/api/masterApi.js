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

export const masterApi = {
    // async getMaster({ id, first = 10, offset = 0, where = 'year = year' }) {
    //     const query = `
    //         query {
    //             masterAllWorks(master_id: ${id}) {
    //             total
    //             filters
    //             data {
    //                 firstname
    //                 lastname
    //                 city
    //                 location
    //                 logo
    //                 id
    //                 url
    //                 worksCount: works
    //                 works: worksData(first: ${first}, offset: ${offset}) {
    //                     total
    //                     years
    //                     data {
    //                         year
    //                         id
    //                         name
    //                         text
    //                         photo_s
    //                         photo
    //                         style
    //                         vk_date
    //                         master: masterData {
    //                             data {
    //                                 master_id
    //                                 id
    //                                 firstname
    //                                 lastname
    //                                 logo
    //                                 city
    //                                 url
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             }
    //         }
    //     `

    //     // let headers = {}
    //     // const subdomain = getSubdomainFromURL(window.location.hostname)

    //     // if (subdomain) {
    //     //     headers = {
    //     //         'x-rustattoo-city-code': subdomain,
    //     //     }
    //     // }

    //     const options = {
    //         method: 'POST',
    //         // headers,
    //         body: JSON.stringify({ query }),
    //         next: {
    //             revalidate: 50,
    //         },
    //     }

    //     const response = await fetch(graphqlApiUrl, options)
    //     const { data } = await response.json()
    //     if (data) {
    //         // return { data: data.salons.data, total: data.salons.total }
    //         return data
    //     }

    //     return {}
    // },

    async getMaster({ id, offset = 0, first = 20, year }) {
        const query = `
            query {
                masterAllWorks(master_id: ${id}) {
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
                        pricehour
                        service
                        code
                        workCount: works
                        worksData(first: ${first}, offset: ${offset}${
            year ? `, where : "year = '${year}'"` : ''
        }){
                            worksCount
                            years
                            data{
                                masterData {
                                    data {
                                        works
                                      lastname
                                      firstname
                                      id
                                      logo
                                      style
                                      url
                                      city
                                    }
                                  }
                                  getPlot {
                                    data {
                                      plot
                                      photo_s
                                      vk_date
                                      id
                                    }
                                  }
                             vk_date
                             photo_s
                             adults
                             id
                             photo
                             year
                             name
                             place
                             style
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
            return data.masterAllWorks.data[0]
        }

        return []
    },
    async getMasterWorksID({ id, offset = 0, first = 50 }) {
        const query = `
            query {
                masterAllWorks(master_id: ${id}) {
                    total
                    data {
                        workCount: works
                        worksData(first: ${first}, offset: ${offset}){
                            worksCount
                            data{
                                 id
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

        try {
            const response = await fetch(graphqlApiUrl, options);
            if (response.ok) {
                const { data } = await response.json();
                if (data) {
                    return data.masterAllWorks.data[0];
                }
            } else {
                throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle the error, such as showing an error message to the user.
            return [];
        }
    },
}
