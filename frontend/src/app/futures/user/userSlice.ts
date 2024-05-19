// src/store/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    user: {
        pk: number;
        username: string;
        email: string;
        phone: string
    } | null;
}

const initialState: UserState = {
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

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
