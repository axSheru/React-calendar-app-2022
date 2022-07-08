import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_APP_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_APP_URL
});

// TODO Configurar interceptores.

export default calendarApi;