import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import roleteReducer from "../features/slices/RoleteSlice/roleteSlice";
import fixR50Reducer from "../features/slices/FIxR50Slice/FixR50Slice";
import fixStandardReducer from "../features/slices/FixStandardSlice/FixStandardSlice";
import kupacReducer from "../features/slices/KupacSlice/KupacSlice";
import roloRmReducer from "../features/slices/RoloRM/RoloRMSlice";

export const store = configureStore({
  reducer: {
    rolete: roleteReducer,
    fixR50: fixR50Reducer,
    fixStandard: fixStandardReducer,
    kupac: kupacReducer,
    roloRM: roloRmReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
