import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns/esm';
import { Navbar, CalendarEvent } from "../";
import { getMessagesES, localizer } from '../../helpers';

const events =[
    {
        title: 'Ver Kenobi',
        notes: 'Es el final de temporada.',
        start: new Date(),
        end: addHours( new Date(), 2 ),
        bgColor: '#DEA1F9',
        user: {
            _id: 123,
            name: 'Alex'
        }
    }
];


export const CalendarPage = () => {

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

    return (
        <>
            <Navbar />
            <Calendar
                components={{
                    event: CalendarEvent
                }}
                culture='es'
                endAccessor="end"
                eventPropGetter={ eventStyleGetter }
                events={ events }
                localizer={ localizer }
                messages={ getMessagesES() }
                startAccessor="start"
                style={{ height: 'calc( 100vh - 80px )' }}
            />
        </>
    );
};
