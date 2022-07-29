import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useUIStore } from "../../src/hooks";
import { store, uiSlice } from "../../src/store";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    });
};

describe('Pruebas en el hook useUIStore.', () => {

    test('Debe de retornar los valores por defecto.', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });

        const { result } = renderHook( () => useUIStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });
        
        expect( result.current ).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any( Function ),
            closeDateModal: expect.any( Function ),
            toggleDateModal: expect.any( Function )
        });

    });

});