import { useSelector, useDispatch } from "react-redux";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    };

    const startSavingEvent = async ( calendarEvent ) => {

        if ( calendarEvent._id ) {
            // Update
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            // Create

            const { data } = await calendarApi.post( '/events', calendarEvent );

            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
        }

    };

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() );
    };

    const startLoadingEvents = async () => {

        try {

            const { data } = await calendarApi.get( '/events' );
            const events = convertEventsToDateEvents( data.eventos );
            console.log(events)
            
        } catch (error) {
            console.error( 'Error cargando eventos.' );
            console.error( error );
        }

    };

    return {
        //* Propiedades.
        events,
        activeEvent,

        //*Métodos.
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    };
    
};
