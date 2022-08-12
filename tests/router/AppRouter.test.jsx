import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock( '../../src/hooks/useAuthStore' );

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

});