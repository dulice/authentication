import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const token = Cookies.get('token');
const currentUser = token && jwtDecode(token);
const userSlice = createSlice({
    name: 'User',
    initialState: {
        user: currentUser ? currentUser : null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = null
            Cookies.remove('token');
        }
    },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;