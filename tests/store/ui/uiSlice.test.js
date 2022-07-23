import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";

describe('Pruebas en uiSlice.', () => {

    test('Debe de retornar el estado por defecto.', () => {

        expect( uiSlice.getInitialState().isDateModalOpen ).toBeFalsy();

    });

    test('Debe de cambiar isDateModalOpen correctamente en el store.', () => {

        let state = uiSlice.getInitialState();
        state = uiSlice.reducer( state, onOpenDateModal() );

        expect( state.isDateModalOpen ).toBeTruthy();

        state = uiSlice.reducer( state, onCloseDateModal() );

        expect( state.isDateModalOpen ).toBeFalsy();

    });

});