import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en el authSlice.', () => {

    test('Debe de retornar el estado inicial.', () => {

        expect( authSlice.getInitialState() ).toEqual( initialState );

    });

    test('Debe de realizar un login correctamente.', () => {

        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );

        expect( state ).toEqual( authenticatedState );

    });

    test('Debe de realizar un logout correctamente.', () => {

        const state = authSlice.reducer( authenticatedState, onLogout() );

        expect( state ).toEqual( notAuthenticatedState );

    });

    test('Debe de realizar un logout correctamente con un mensaje de error.', () => {

        const errorMessage = 'Credenciales no válidas.';

        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );

        expect( state ).toEqual({
            ...notAuthenticatedState,
            errorMessage
        });

    });

    test('Debe de limpiar correctamente un mensaje de error.', () => {

        const errorMessage = 'Credenciales no válidas.';

        let state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );
        
        state = authSlice.reducer( state, clearErrorMessage() );

        expect( state.errorMessage ).toBe( undefined );

    });

});