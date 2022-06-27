import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    title: 'Ver Kenobi',
    notes: 'Es el final de temporada.',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#DEA1F9',
    user: {
        _id: 123,
        name: 'Alex'
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;