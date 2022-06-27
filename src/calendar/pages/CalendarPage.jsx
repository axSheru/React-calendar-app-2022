import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns/esm';
import { Navbar, CalendarEvent, CalendarModal } from "../";
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';
import { useCalendarStore, useUIStore } from '../../hooks';


export const CalendarPage = () => {

    const { events } = useCalendarStore();

    const { openDateModal } = useUIStore();

    const [ lastView, setLastView ] = useState( localStorage.getItem( 'lastView' ) || 'week' );

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#347CF7',
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

        console.log( 'onSelect' )
        
    };

    const onViewChanged = ( event ) => {

        localStorage.setItem( 'lastView', event );
        setLastView( event );
        
    };

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
        </>
    );
};
