export const events = [
    {
        id: '1',
        start: new Date( '2022-10-21 13:00:00' ),
        end: new Date( '2022-10-21 15:00:00' ),
        title: 'Ver Kenobi',
        notes: 'Es el final de temporada.',
    },
    {
        id: '2',
        start: new Date( '2022-11-12 13:00:00' ),
        end: new Date( '2022-11-12 15:00:00' ),
        title: 'Ver Andor',
        notes: 'Es el inicio de temporada.',
    }
];


export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
};

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null,
};

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] },
};