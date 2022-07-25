import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authStates";

describe('Pruebas en el authSlice.', () => {

    test('Debe de retornar el estado inicial.', () => {

        expect( authSlice.getInitialState() ).toEqual( initialState );

    });

});