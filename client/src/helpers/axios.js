import axios from 'axios'

import config from '../config/config.json'

const instance = axios.create({
    baseURL: config.SERVER_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export default instance