import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice(
    {
        name: "User",
        initialState: {
            data: null,
            token: null
        },
        reducers: {
            signin(currentState, { payload }) {
                currentState.data = payload.user
                currentState.token = payload.token
                localStorage.setItem("user", JSON.stringify(payload.user));
                localStorage.setItem("token", payload.token);
            },
            logout(currentState) {
                currentState.data = null;
                currentState.token = null;
                localStorage.removeItem('user');
                localStorage.removeItem('token');

            }
        }
    }
)
export const { signin, logout } = UserSlice.actions;
export default UserSlice.reducer;
