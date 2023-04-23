import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import {
  RoloRMI,
  RoloRmInitialState,
  RoloRMnalog,
} from "../../../interface/roloRMI";

const initialState: RoloRmInitialState = {
  roloRMnalog: [],
  roloRMrezanje: [],
  roloRMm2: 0,
  trenutnoRoloRM: {
    id: "",
    tip: "",
    sirina: "",
    visina: "",
    komada: "",
  },
};

export const roloRMSlice = createSlice({
  name: "roloRM",
  initialState,
  reducers: {
    dodajRoloRMnaNalog: (state, action) => {
      action.payload.id = "_" + Math.random().toString(36).substr(2, 9);
      action.payload.tip = "Rolo RM";
      const roloRMnalog: RoloRMnalog[] = [...state.roloRMnalog, action.payload];

      return {
        ...state,
        roloRMnalog,
        trenutnoRoloRM: action.payload,
      };
    },
    ukloniRoloRMSaNaloga: (state, action: PayloadAction<string>) => {
      const filterMrezeTip2 = state.roloRMnalog.filter(
        (mreza) => mreza.id !== action.payload
      );
      const filterMrezeTip2Pilanje = state.roloRMrezanje.filter(
        (mre) => mre.id !== action.payload
      );
      return {
        ...state,
        roloRMnalog: filterMrezeTip2,
        roloRMrezanje: filterMrezeTip2Pilanje,
      };
    },
    rezanjeRoloRM: (state, action: PayloadAction<RoloRMI[]>) => {
      const rez = action.payload;
      const rezanjeMrezetip2 = rez[0];

      const res = {
        id: String(state.trenutnoRoloRM.id),
        tip: String(rezanjeMrezetip2?.nazivRoloRm),
        kutija:
          state.trenutnoRoloRM.sirina &&
          Math.round(
            (Number(state.trenutnoRoloRM.sirina) -
              Number(rezanjeMrezetip2.kutija)) *
              100
          ) / 100,
        poprecniProfil:
          state.trenutnoRoloRM.sirina &&
          Math.round(
            (Number(state.trenutnoRoloRM.sirina) -
              Number(rezanjeMrezetip2.poprecniProfil)) *
              100
          ) / 100,
        vodilica:
          state.trenutnoRoloRM.sirina &&
          Math.round(
            (Number(state.trenutnoRoloRM.visina) -
              Number(rezanjeMrezetip2.vodilica)) *
              100
          ) / 100,
        mrezaIzavrsna:
          state.trenutnoRoloRM.visina &&
          Math.round(
            (Number(state.trenutnoRoloRM.sirina) -
              Number(rezanjeMrezetip2.mrezaIzavrsna)) *
              100
          ) / 100,
        komada: state.trenutnoRoloRM.komada,
      };
      const trEs = [...state.roloRMrezanje, res];

      const filterByIdMrezeTip2 = trEs.filter((it) => it.id !== "");

      return {
        ...state,
        roloRMrezanje: filterByIdMrezeTip2,
        trenutnoRoloRM: {
          ...state.trenutnoRoloRM,
          id: "",
          sirina: "",
          visina: "",
          komada: "",
        },
      };
    },
    RoloRmM2: (state, action: PayloadAction<any>) => {
      const getMrezeTip2M2 = state.roloRMnalog.map((mreze) => {
        const m2 = ((Number(mreze.sirina) / 100) * Number(mreze.visina)) / 100;
        return m2 * Number(mreze.komada);
      });

      const sumMrezeTip2M2 = Number(
        getMrezeTip2M2.reduce((a, b) => a + b, 0).toFixed(3)
      );
      return { ...state, roloRMm2: sumMrezeTip2M2 };
    },
  },
});

export const {
  dodajRoloRMnaNalog,
  rezanjeRoloRM,
  RoloRmM2,
  ukloniRoloRMSaNaloga,
} = roloRMSlice.actions;
export const selectRoloRM = (state: RootState) => state.roloRM;
export default roloRMSlice.reducer;
