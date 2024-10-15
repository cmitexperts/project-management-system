import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "./Reducers/Admin.js";
import UserReducer from "./Reducers/User.js";
const Store = configureStore(
    {
        reducer:{
            "admin": AdminReducer,
            "user": UserReducer
           
        }
    }
)

export default Store;