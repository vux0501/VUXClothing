import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    access_token: '',
    avatar: '',
    isAdmin: '',
    phone: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, avatar, isAdmin, phone, access_token } = action.payload;

            //chua co accesstoken
            state.name = name;
            state.isAdmin = isAdmin;
            state.phone = phone;
            state.email = email;
            state.avatar = avatar;
            state.access_token = access_token;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
