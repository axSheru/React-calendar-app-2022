import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'name',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        onOpenDateModal: ( state ) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: ( state ) => {
            state.isDateModalOpen = true;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;