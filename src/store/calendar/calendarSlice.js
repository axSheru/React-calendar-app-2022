import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// NOTE Event structure reference.
/* const tempEvent = {
    id: new Date().getTime(),
    title: 'Ver Kenobi',
    notes: 'Es el final de temporada.',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#DEA1F9',
    user: {
        id: 123,
        name: 'Alex'
    }
}; */

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            // tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload } ) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                return ( event.id === payload.id )
                    ? payload
                    : event;
            });
        },
        onDeleteEvent: ( state ) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                state.activeEvent = null;
            }
        },
        onLoadEvents: ( state, { payload = [] } ) => {
            state.isLoadingEvents = false;
            // state.events = payload;// Carga todos los eventos, no toma en cuenta que puede que solo venga uno nuevo.
            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if ( ! exists ) {
                    state.events.push( event );
                }
            });
        },
        onLogoutCalendar: ( state ) => {
            state.isLoadingEvents = true,
            state.events = [],
            state.activeEvent = null
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions;