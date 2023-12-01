import { graphqlApiUrl } from './constants'
import { getSubdomainFromURL } from './mastersApi'

export const worksApi = {
    async getWorks({
        first = 24,
        offset = 0,
        type = '',
        sortBy = 'rating',
        where = 'service = 1233',
    }) {
        const query = `
            query {
                uniqueMastersWorks(first: ${first}, offset: ${offset}, sortBy: ${JSON.stringify(
            sortBy
        )}, type: "", where: ${JSON.stringify(where)}) {
                total
                data {
                name
                text
                vk_date
                place
                style
                filters
                photo
                adults
                photo_s
                photo_m
                plot
                id
                salonData {
                    data {
                      salon_id
                    }
                  }
                masterData {
                    data {
                        master_id
                        firstname
                        lastname
                        city
                        url
                        logo
                        
                    }
                    }
                getPlot{
                    total
                    data{
                        plot
                        photo_s
                        vk_date
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
            return data.uniqueMastersWorks
        }

        return {}
    },
    async getWork({ id }) {
        const query = `
            query { 
                works(first:1, where: "id=${id}"){
                    total
                    data{
                        getPlot {
                            data {
                              id
                              photo_s
                              vk_date
                              plot
                            }
                          }
                     style
                      place
                        vk_date
                        name
                        photo_s
                        id
                     
                      masterData
                      {
                       data
                        {
                            worksAllData {
                                data {
                                  name
                                  vk_date
                                  id
                                  photo_s
                                  style
                                  place
                                }
                              }
                         lastname
                          firstname
                          logo
                          url
                          city
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

        try {
            const response = await fetch(graphqlApiUrl, options);
            if (response.ok) {
                const { data } = await response.json();
                if (data) {
                    return data.works;
                }
            } else {
                throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle the error, such as showing an error message to the user.
            return {};
        }
    },
}
