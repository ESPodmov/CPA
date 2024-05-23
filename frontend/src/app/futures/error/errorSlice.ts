// src/store/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ErrorState {
    user: {
        pk: number;
        email: string;
        phone?: string;
        fio?: string;
        name?: string;
        link?: string;
        tgUsername?: string;
        balance: number;
        activity: string;
    } | null;
}

const initialState: ErrorState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state, action) => {
            state.user = null;
        }
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
