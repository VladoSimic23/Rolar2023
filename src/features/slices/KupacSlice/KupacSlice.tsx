// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../../../app/store";
// import { KupacI, KupacInitState } from "./interface";

// const initialState: KupacInitState = {
//   kupacInfo: {
//     ime: "",
//     mjesto: "",
//     napomena: "",
//   },
//   isSettings: false,
// };

// export const kupacSlice = createSlice({
//   name: "kupac",
//   initialState,
//   reducers: {
//     kupacAct: (state, action: PayloadAction<KupacI>) => {
//       const { ime, napomena, mjesto } = action.payload;

//       return {
//         ...state,
//         kupacInfo: { ime: ime, napomena: napomena, mjesto: mjesto },
//       };
//     },
//     isSettings: (state, action: PayloadAction<"">) => {
//       return { ...state, isSettings: !state.isSettings };
//     },
//     settingsToFalse: (state, action: PayloadAction<"">) => {
//       return { ...state, isSettings: false };
//     },
//   },
// });

// export const { kupacAct, isSettings, settingsToFalse } = kupacSlice.actions;
// export const selectKupac = (state: RootState) => state;
// export default kupacSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { KupacI, KupacInitState } from "./interface";

// Define a key to use for storing the state in local storage
const LOCAL_STORAGE_KEY = "kupacState";

// Retrieve the state from local storage, if it exists
const persistedState = localStorage.getItem(LOCAL_STORAGE_KEY);
const initialState: KupacInitState = persistedState
  ? JSON.parse(persistedState)
  : {
      kupacInfo: {
        ime: "",
        mjesto: "",
        napomena: "",
      },
      isSettings: false,
    };

export const kupacSlice = createSlice({
  name: "kupac",
  initialState,
  reducers: {
    kupacAct: (state, action: PayloadAction<KupacI>) => {
      const { ime, napomena, mjesto } = action.payload;

      const newState = {
        ...state,
        kupacInfo: { ime: ime, napomena: napomena, mjesto: mjesto },
      };

      // Save the new state to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));

      return newState;
    },
    isSettings: (state, action: PayloadAction<"">) => {
      const newState = { ...state, isSettings: !state.isSettings };

      // Save the new state to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));

      return newState;
    },
    settingsToFalse: (state, action: PayloadAction<"">) => {
      const newState = { ...state, isSettings: false };

      // Save the new state to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));

      return newState;
    },
  },
});

export const { kupacAct, isSettings, settingsToFalse } = kupacSlice.actions;
export const selectKupac = (state: RootState) => state;
export default kupacSlice.reducer;
