import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    access_token: '',
    avatar: '',
    isAdmin: '',
    phone: '',
    isLogin: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            if (!action.payload) return;
            const { name, email, avatar, isAdmin, phone } = action.payload;

            //chua co accesstoken
            state.name = name;
            state.isAdmin = isAdmin;
            state.phone = phone;
            state.email = email;
            state.avatar = avatar;
        },
        updateAccessToken: (state, action) => {
            const { access_token } = action.payload;
            if (access_token) state.isLogin = true;
            state.access_token = access_token;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, updateAccessToken } = userSlice.actions;

export default userSlice.reducer;
