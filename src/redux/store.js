import { configureStore } from "@reduxjs/toolkit";
import { cryptoCoinsApi } from "../api/cryptoCoinsApi";


export default configureStore({
    reducer: {
        [cryptoCoinsApi.reducerPath]: cryptoCoinsApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoCoinsApi.middleware),
})