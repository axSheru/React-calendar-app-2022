import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import calendarApi from "../../src/api/calendarApi";
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

    beforeEach( () => localStorage.clear() );

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
            user: { name: 'Test User', uid: '62f328ff17229eefa0a650d9' }
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
            await result.current.startLogin({ email: 'error@google.com', 'password': '123456789' });
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

    test('La acción startRegister debe de crear un usuario correctamente.', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: '123456789',
                name: 'Test User',
                token: 'UN-TOKEN'
            }
        });

        await act( async () => {
            await result.current.startRegister({ email: 'error@google.com', 'password': '12345678', 'name': 'Test user 2' });
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '123456789' }
        });

        // Reestablece el mock para que podamos reutilizarlo en otro test.
        spy.mockRestore();

    });

    test('La acción startRegister debe de fallar al crear un usuario.', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act( async () => {
            await result.current.startRegister( testUserCredentials );
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            "errorMessage": "El email ingresado ya está en uso.",
            "status": "not-authenticated",
            "user": {},
        });
    });

    test('La acción checkAuthToken debe de fallar si no hay token.', async () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act( async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            "errorMessage": undefined,
            "status": "not-authenticated",
            "user": {},
        });

    });

    test('La acción checkAuthToken debe de autenticar al usuario si hay un token.', async () => {

        const { data } = await calendarApi.post( '/auth', testUserCredentials );

        localStorage.setItem( 'token', data.token );

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act( async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '62f328ff17229eefa0a650d9' }
        });

    });

});