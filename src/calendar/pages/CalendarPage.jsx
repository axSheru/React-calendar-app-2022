import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar, CalendarEvent, CalendarModal, FABAddNew, FABDelete } from "../";
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';
import { useAuthStore, useCalendarStore, useUIStore } from '../../hooks';
import { useEffect } from 'react';


export const CalendarPage = () => {

    const { user } = useAuthStore();

    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const { openDateModal } = useUIStore();

    const [ lastView, setLastView ] = useState( localStorage.getItem( 'lastView' ) || 'week' );

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const myEvent = ( ( user.uid === event.user._id ) || ( user.uid === event.user.uid ) );

        const style = {
            backgroundColor: myEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        };

        return {
            style
        };

    };

    const onDoubleClick = ( event ) => {

        openDateModal();
        
    };

    const onSelect = ( event ) => {

        setActiveEvent( event );
        
    };

    const onViewChanged = ( event ) => {

        localStorage.setItem( 'lastView', event );
        setLastView( event );
        
    };

    useEffect(() => {
        startLoadingEvents();
    }, []);
    

    return (
        <>
            <Navbar />
            <Calendar
                components={{
                    event: CalendarEvent
                }}
                culture='es'
                defaultView={ lastView }
                endAccessor="end"
                eventPropGetter={ eventStyleGetter }
                events={ events }
                localizer={ localizer }
                messages={ getMessagesES() }
                startAccessor="start"
                style={{ height: 'calc( 100vh - 80px )' }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />
            <CalendarModal />
            <FABAddNew />
            <FABDelete />
        </>
    );
};
