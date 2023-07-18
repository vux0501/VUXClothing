import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    name: '',
    email: '',
    access_token: '',
    avatar: '',
    isAdmin: false,
    phone: '',
    isLogin: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            if (!action.payload) return;
            // const { _id } = action.payload;

            //chua co accesstoken

            // state.id = _id;
            // state.name = name ?? state.name;
            // state.isAdmin = isAdmin ?? state.isAdmin;
            // state.phone = phone ?? state.phone;
            // state.email = email ?? state.email;
            // state.avatar = avatar ?? state.avatar;
            return {
                ...state,
                ...action.payload,
            };
        },
        resetUser: (state) => {
            //chua co accesstoken
            state.name = '';
            state.isAdmin = false;
            state.phone = '';
            state.email = '';
            state.avatar = '';
            state.isLogin = false;
            state.access_token = '';
        },
        updateAccessToken: (state, action) => {
            const { access_token } = action.payload;
            if (access_token) state.isLogin = true;
            state.access_token = access_token;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, updateAccessToken, resetUser } = userSlice.actions;

export default userSlice.reducer;
