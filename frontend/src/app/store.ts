import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { newsApi } from "./services/newsApi";
import { partnerApi } from "./services/partnerApi";
import { offerTypeApi } from "./services/offer/offerTypeApi";
import { targetActionApi } from "./services/offer/targetActionApi";
import { offerCategoryApi } from "./services/offer/offerCategoryApi";
import { offerMediaApi } from "./services/offer/offerMediaApi";
import { offerApi } from "./services/offer/offerApi";
import { payoutApi } from "./services/payoutsApi";
import { clickApi } from "./services/clickApi";
import { conversionApi } from "./services/conversionApi";
import userReducer from "./futures/user/userSlice";
import authReducer from "./futures/user/authSlice";

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
        [partnerApi.reducerPath]: partnerApi.reducer,
        [offerTypeApi.reducerPath]: offerTypeApi.reducer,
        [targetActionApi.reducerPath]: targetActionApi.reducer,
        [offerCategoryApi.reducerPath]: offerCategoryApi.reducer,
        [offerMediaApi.reducerPath]: offerMediaApi.reducer,
        [offerApi.reducerPath]: offerApi.reducer,
        [payoutApi.reducerPath]: payoutApi.reducer,
        [clickApi.reducerPath]: clickApi.reducer,
        [conversionApi.reducerPath]: conversionApi.reducer,
        user: userReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).
        concat(newsApi.middleware).concat(partnerApi.middleware).concat(offerTypeApi.middleware).
        concat(targetActionApi.middleware).concat(offerCategoryApi.middleware).concat(offerMediaApi.middleware).
        concat(offerApi.middleware).concat(payoutApi.middleware).concat(clickApi.middleware).concat(conversionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
