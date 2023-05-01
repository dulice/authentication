import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import userApi from "./userApi";
import thunk from "redux-thunk";

const Store = configureStore({
    reducer: {
        user: userSlice,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (defaultMiddleware) => (
        defaultMiddleware().concat(thunk, userApi.middleware)
    )
});

export default Store;