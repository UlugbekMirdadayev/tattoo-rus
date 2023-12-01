import axios from 'axios'

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
        withCredentials: true,
    },
})

export default api
