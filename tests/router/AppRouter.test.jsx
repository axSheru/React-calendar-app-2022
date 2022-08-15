import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock( '../../src/hooks/useAuthStore' );

// Hacemos un mock del componente a renderizar para no tener que mockear todo lo que originalmente usa dicho componente.
jest.mock( '../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}));

describe('Pruebas en el componente <AppRouter />', () => {

    const mockCheckAuthToken = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de llamar la pantalla de carga y llamar checkAuthToken.', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render( <AppRouter/> );
        expect( screen.getByText('Cargando...') ).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();

    });

    test('Debe de mostrar el login en caso de no estar autenticado.', () => {

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        const { container } = render(
            <MemoryRouter initialEntries={[ '/auth2/algo' ]}>
                <AppRouter/>
            </MemoryRouter>
        );

        expect( screen.getByText( 'Ingreso' ) ).toBeTruthy();
        expect( container ).toMatchSnapshot();

    });

    test('Debe de mostrar el calendario en caso de estar autenticado.', () => {

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter>
        );

        expect( screen.getByText( 'CalendarPage' ) ).toBeTruthy();

    });

});