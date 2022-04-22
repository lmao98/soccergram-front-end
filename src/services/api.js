import Axios from 'axios'


export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://soccergram-back.herokuapp.com/api' : 'http://localhost:3001/api'

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error) 
)

export default Client