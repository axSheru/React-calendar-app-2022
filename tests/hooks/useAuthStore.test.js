import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAuthStore } from "../../src/hooks";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";

describe('Pruebas en el hook useAuthStore.', () => {

    const getMockStore = ( initialState ) => {
        return configureStore({
            reducer: {
                auth: authSlice.reducer
            },
            preloadedState: {
                auth: { ...initialState }
            }
        });
    };

    test('Debe de retornar los valores por defecto.', () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        expect( result.current ).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            checkAuthToken: expect.any( Function ),
            startLogin: expect.any( Function ),
            startLogout: expect.any( Function ),
            startRegister: expect.any( Function )
        });

    });

    test('La acción startLogin debe de realizar el login correctamente.', async () => {

        localStorage.clear();

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act( async () => {
            await result.current.startLogin( testUserCredentials );
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '62d62013dd1328234609e862' }
        });

        expect( localStorage.getItem( 'token' ) ).toEqual( expect.any( String ) );
        expect( localStorage.getItem( 'token-init-date' ) ).toEqual( expect.any( String ) );

    });

    test('La acción startLogin debe de fallar al realizar el login.', async () => {

        localStorage.clear();

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act( async () => {
            await result.current.startLogin({ email: 'error@google.com', 'password': '12345678' });
        });

        expect( localStorage.getItem( 'token' ) ).toBeNull();
        expect( localStorage.getItem( 'token-init-date' ) ).toBeNull();

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas.',
            status: 'not-authenticated',
            user: {}
        });

        await waitFor(
            () => expect( result.current.errorMessage ).toBeUndefined()
        );

    });

});