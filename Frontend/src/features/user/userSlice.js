import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchLoggedInUserOrders,
    updateUser,
    fetchLoggedInUser,
} from './userAPI';

const initialState = {
    status: 'idle',
    userInfo: null,
    userOrders: [],
     // this info will be used in case of detailed user info, while auth will
    // only be used for loggedInUser id etc checks
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrders',
    async (userId) => {
        const response = await fetchLoggedInUserOrders(userId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
    'user/fetchLoggedInUser',
    async (userId) => {
        const response = await fetchLoggedInUser(userId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (update) => {
        // this is name mistake
        const response = await updateUser(update);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userOrders = action.payload;

            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                // earlier there was loggedInUser variable in other slice
                state.userInfo = action.payload;
            })
            .addCase(fetchLoggedInUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                // this info can be different or more from logged-in User info
                console.log(action.payload);
                state.userInfo = action.payload;
            });
    },
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;

export default userSlice.reducer;