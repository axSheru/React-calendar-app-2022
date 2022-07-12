import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_APP_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_APP_URL
});

// TODO Configurar interceptores.
calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem( 'token' )
    };

    return config;

});

export default calendarApi;