import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAuthStore } from "../../src/hooks";
import { authSlice } from "../../src/store";
import { initialState } from "../fixtures/authStates";

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

});