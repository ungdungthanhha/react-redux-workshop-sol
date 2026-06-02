import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UiState {
    modalOpen: boolean
}

const initialState: UiState = {
    modalOpen: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setModalOpen(state, action: PayloadAction<boolean>) {
            state.modalOpen = action.payload
        }
    }
})

export const setModalOpen = uiSlice.actions
export default uiSlice.reducer