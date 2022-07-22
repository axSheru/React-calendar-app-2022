import calendarApi from "../../src/api/calendarApi";

describe('Pruebas en calendarApi.', () => {

    test('Debe de tener la configuración por defecto.', () => {

        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_APP_URL );

    });

    test('Debe de tener el x-token en el header de todas las posiciones.', async () => {

        const token = 'ABC-123-XYZ';

        localStorage.setItem( 'token', token );
        const res = await calendarApi.get( '/auth' );

        console.log(res)

        expect( res.config.headers['x-token'] ).toBe( token );

    });

});