import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import {
  FixStandardInitStateI,
  MrezeNalogStandard,
  KomaricaStandardI,
} from "../../../interface/fixMrezeStandard";

const initialState: FixStandardInitStateI = {
  tipoviMrezeStandard: [],
  fixStandardNalog: [],
  standardRezanje: [],
  trenutnaStandardMreza: {
    id: "",
    tip: "",
    ukupnaVisina: "",
    visina: "",
    sirina: "",
    ukupnaSirina: "",
    komada: "",
  },
  mrezeStandardM2: 0,
};

// Load the state from local storage if it exists, otherwise use the initial state
const loadState = (): FixStandardInitStateI => {
  try {
    const serializedState = localStorage.getItem("fixStandardState");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return initialState;
  }
};

// Save the state to local storage
const saveState = (state: FixStandardInitStateI) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("fixStandardState", serializedState);
  } catch (err) {
    console.log(err);
  }
};

const fixStandardSlice = createSlice({
  name: "fixStandard",
  initialState: loadState(),
  reducers: {
    tipoviMrezeStand: (state, action: PayloadAction<KomaricaStandardI[]>) => {
      const tipoviMreze: string[] = action.payload?.map(
        (tipMreze: KomaricaStandardI) => {
          console.log(tipMreze);

          return tipMreze.ImeFixMreze;
        }
      );

      state.tipoviMrezeStandard = tipoviMreze;
      saveState(state); // Save the updated state to local storage
    },
    dodajMrezuStandNalog: (state, action) => {
      action.payload.id = "_" + Math.random().toString(36).substr(2, 9);
      const fixStandardNalog: MrezeNalogStandard[] = [
        ...state.fixStandardNalog,
        action.payload,
      ];

      const newState = {
        ...state,
        fixStandardNalog,
        trenutnaStandardMreza: action.payload,
      };
      saveState(newState); // Save the updated state to local storage
      return newState;
    },
    ukloniMrezuStandardSaNaloga: (state, action: PayloadAction<string>) => {
      const filterMrezeTip2 = state.fixStandardNalog.filter(
        (mreza) => mreza.id !== action.payload
      );
      const filterMrezeTip2Pilanje = state.standardRezanje.filter(
        (mre) => mre.id !== action.payload
      );
      const newState = {
        ...state,
        fixStandardNalog: filterMrezeTip2,
        standardRezanje: filterMrezeTip2Pilanje,
      };
      saveState(newState); // Save the updated state to local storage
      return newState;
    },
    rezanjeFixStandard: (state, action: PayloadAction<KomaricaStandardI[]>) => {
      const rezanjeMrezetip2: KomaricaStandardI | undefined =
        action.payload?.find((mreza: KomaricaStandardI) => {
          if (mreza.ImeFixMreze === state.trenutnaStandardMreza.tip) {
            return mreza;
          }
          return null;
        });

      if (rezanjeMrezetip2) {
        const res = {
          id: String(state.trenutnaStandardMreza.id),
          tip: String(state.trenutnaStandardMreza.tip),
          ukupnaSirina: state.trenutnaStandardMreza.sirina,
          sirina:
            state.trenutnaStandardMreza.sirina &&
            Math.round(
              (Number(state.trenutnaStandardMreza.sirina) -
                Number(rezanjeMrezetip2.sirina)) *
                100
            ) / 100,
          ukupnaVisina: state.trenutnaStandardMreza.visina,
          visina:
            state.trenutnaStandardMreza.visina &&
            Math.round(
              (Number(state.trenutnaStandardMreza.visina) -
                Number(rezanjeMrezetip2.visina)) *
                100
            ) / 100,
          komada: state.trenutnaStandardMreza.komada,
        };
        const trEs = [...state.standardRezanje, res];

        const filterByIdMrezeTip2 = trEs.filter((it) => it.id !== "");

        return {
          ...state,
          standardRezanje: filterByIdMrezeTip2,
          trenutnaStandardMreza: {
            ...state.trenutnaStandardMreza,
            id: "",
            sirina: "",
            visina: "",
            komada: "",
          },
        };
      }

      return state;
    },
    standardM2: (state, action: PayloadAction<"">) => {
      const getMrezeTip2M2 = state.fixStandardNalog.map((mreze) => {
        const m2 = ((Number(mreze.sirina) / 100) * Number(mreze.visina)) / 100;
        return m2 * Number(mreze.komada);
      });

      const sumMrezeTip2M2 = Number(
        getMrezeTip2M2.reduce((a, b) => a + b, 0).toFixed(3)
      );
      return { ...state, mrezeStandardM2: sumMrezeTip2M2 };
    },
  },
});

export const {
  dodajMrezuStandNalog,
  tipoviMrezeStand,
  ukloniMrezuStandardSaNaloga,
  rezanjeFixStandard,
  standardM2,
} = fixStandardSlice.actions;
export const selectStandard = (state: RootState) => state;
export default fixStandardSlice.reducer;
