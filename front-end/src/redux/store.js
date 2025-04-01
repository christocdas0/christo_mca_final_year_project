import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./slices/mainSlice";

const store = configureStore({
  reducer: {
    onlineAttendanceMangement: mainReducer,
  },
});

export default store;
