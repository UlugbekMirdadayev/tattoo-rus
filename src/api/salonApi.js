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

export const salonApi = {
    async getSalon({ id, offset = 0, first = 12, year }) {
        const query = `
            query {
                salonAllWorks(salon_id: ${id}) {
                    total
                    data {
                        masters
                        id
                        salon_id
                        name
                        logo
                        birthday
                        phone
                        metro
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
                             vk_date
                             photo_s
                             adults
                             name
                             id
                             photo
                             year
                             place
                             style
                             master: masterData {
                                data {
                                    master_id   
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
            return data.salonAllWorks.data[0]
        }

        return []
    },
    async getSalonWorksId({ id, offset = 0, first = 100 }) {
        const query = `
            query {
                salonAllWorks(salon_id: ${id}) {
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
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { data } = await response.json();
        
            if (data) {
                return data.salonAllWorks.data[0];
            }
            return [];
        } catch (error) {
            console.error("An error occurred:", error);
            return []; // or handle the error as needed
        }
    },
}
