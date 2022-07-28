import { calendarSlice, onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } from "../../../src/store/calendar/calendarSlice";
import { calendarLogout, calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice.', () => {

    test('Debe de retornar el estado por defect.', () => {

        const state = calendarSlice.getInitialState();

        expect( state ).toEqual( initialState );

    });

    test('La acción onSetActiveEvent debe de establecer el evento activo.', () => {

        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );

        expect( state.activeEvent ).toEqual( events[0] );

    });

    test('La acción onAddNewEvent debe de agregar un nuevo evento.', () => {

        const newEvent = {
            id: '3',
            start: new Date( '2022-10-21 13:00:00' ),
            end: new Date( '2022-10-21 15:00:00' ),
            title: 'Ver The mandalorian.',
            notes: 'Esa serie es genial.',
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );

        expect( state.events ).toEqual( [ ...events, newEvent ] );

    });

    test('La acción onUpdateEvent debe de actualizar el evento especificado.', () => {

        const updatedEvent = {
            id: '1',
            start: new Date( '2022-10-21 13:00:00' ),
            end: new Date( '2022-10-21 16:40:00' ),
            title: 'Ver Clone Wars.',
            notes: 'La animación es preciosa.',
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );

        expect( state.events ).toContain( updatedEvent );

    });

    test('La acción onDeleteEvent debe de borrar el evento activo.', () => {

        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );

        expect( state.activeEvent ).toBeNull();
        expect( state.events ).not.toContain( events[0] );

    });

    test('La acción onLoadEvents debe de establecer los eventos.', () => {

        const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );
        
        expect( state ).toEqual( calendarWithEventsState );

        const newState = calendarSlice.reducer( state, onLoadEvents( events ) );
        
        expect( newState ).toEqual( state );

    });

    test('La acción onLogoutCalendar debe de limpiar el estado.', () => {

        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar );

        expect( state ).toEqual( initialState );

    });

});