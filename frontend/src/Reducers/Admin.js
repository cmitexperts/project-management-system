import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice(
    {
        name: "Admin",
        initialState: {
            data: null,
            token: null,
           
        },
        reducers: {
            signin(currentState, { payload }) {
              
                currentState.data = payload.admin;
                currentState.token = payload.token;
                localStorage.setItem("admin", JSON.stringify(payload.admin));
                localStorage.setItem("token", payload.token);
           
            },
            logout(currentState) {
                currentState.data = null;
                currentState.token = null;
           
                localStorage.removeItem("admin");
                localStorage.removeItem("token");

            }
        }
    }
)
export const { signin, logout } = AdminSlice.actions;
export default AdminSlice.reducer;
                                                                                                                                                                                         