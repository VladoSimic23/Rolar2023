import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import {
  MrezeNalogR50I,
  MrezeR50RezanjeI,
  R50InitStateI,
} from "../../../interface/fixMreze";
import { KomaricaR50I } from "../../../interface/fixMreze";

const initialState: R50InitStateI = {
  tipoviMrezeR50: [],
  fixR50Nalog: [],
  mrezeR50Rezanje: [],
  trenutnaMrezaR50: {
    id: "",
    tip: "",
    ukupnaSirina: "",
    visina: "",
    ukupnaVisina: "",
    sirina: "",
    komada: "",
    mjera: "",
    kukice: "",
  },
  r50M2: 0,
};

const savedState: R50InitStateI =
  JSON.parse(localStorage.getItem("fixR50Slice")!) || initialState;

export const fixR50Slice = createSlice({
  name: "r50",
  initialState: savedState,
  reducers: {
    tipoviMrezeR50A: (state, action: PayloadAction<KomaricaR50I[]>) => {
      const tipoviMreze: string[] = action.payload?.map(
        (tipMreze: KomaricaR50I) => {
          return tipMreze.ImeFixMreze;
        }
      );

      state.tipoviMrezeR50 = tipoviMreze;

      // Save the updated state to localStorage
      localStorage.setItem("fixR50Slice", JSON.stringify(state));
    },
    dodajMrezuR50Nalog: (state, action) => {
      action.payload.id = "_" + Math.random().toString(36).substr(2, 9);
      const fixR50Nalog: MrezeNalogR50I[] = [
        ...state.fixR50Nalog,
        action.payload,
      ];

      state.fixR50Nalog = fixR50Nalog;
      state.trenutnaMrezaR50 = action.payload;

      // Save the updated state to localStorage
      localStorage.setItem("fixR50Slice", JSON.stringify(state));

      return state;
    },
    ukloniMrezuR50SaNaloga: (state, action: PayloadAction<String>) => {
      const filterMrezeTip1 = state.fixR50Nalog.filter(
        (mreza) => mreza.id !== action.payload
      );
      const filterMrezeTip1Pilanje = state.mrezeR50Rezanje.filter(
        (mre) => mre.id !== action.payload
      );
      state.fixR50Nalog = filterMrezeTip1;
      state.mrezeR50Rezanje = filterMrezeTip1Pilanje;

      // Save the updated state to localStorage
      localStorage.setItem("fixR50Slice", JSON.stringify(state));

      return state;
    },
    rezanjeR50: (state, action: PayloadAction<KomaricaR50I[]>) => {
      let mjeraType: any;
      const rezanjeR50: KomaricaR50I | undefined = action.payload?.find(
        (mreza: KomaricaR50I) => {
          if (mreza.ImeFixMreze === state.trenutnaMrezaR50.tip) {
            mreza.mjere.mjere.find((mjer) => {
              if (mjer.tipMjere === state.trenutnaMrezaR50.mjera) {
                return (mjeraType = mjer);
              }
              return null;
            });
            return mreza;
          }
          return null;
        }
      );

      if (rezanjeR50) {
        const res: MrezeR50RezanjeI = {
          id: String(state.trenutnaMrezaR50.id),
          tip: String(state.trenutnaMrezaR50.tip),
          ukupnaSirina: state.trenutnaMrezaR50.sirina,
          sirina:
            mjeraType &&
            Math.round(
              (Number(state.trenutnaMrezaR50.sirina) -
                Number(mjeraType.sirina)) *
                100
            ) / 100,
          ukupnaVisina: state.trenutnaMrezaR50.visina,
          visina:
            mjeraType &&
            Math.round(
              (Number(state.trenutnaMrezaR50.visina) -
                Number(mjeraType.visina)) *
                100
            ) / 100,
          komada: state.trenutnaMrezaR50.komada,
          mjera: state.trenutnaMrezaR50.mjera,
          kukice: state.trenutnaMrezaR50.kukice,
        };
        const trEs = [...state.mrezeR50Rezanje, res];
        const filterByIdMrezeTip1 = trEs.filter((it) => it.id !== "");
        return {
          ...state,
          mrezeR50Rezanje: filterByIdMrezeTip1,
          trenutnaMrezaR50: {
            ...state.trenutnaMrezaR50,
            id: "",
            sirina: "",
            visina: "",
            komada: "",
          },
        };
      }

      return {
        ...state,
      };
    },
    fixR50M2: (state, action: PayloadAction<"">) => {
      const getMrezeR50 = state.fixR50Nalog.map((mreze) => {
        const m2 = ((Number(mreze.sirina) / 100) * Number(mreze.visina)) / 100;
        return m2 * Number(mreze.komada);
      });

      const sumMrezeR50 = Number(
        getMrezeR50.reduce((a, b) => a + b, 0).toFixed(3)
      );
      return { ...state, r50M2: sumMrezeR50 };
    },
  },
});

export const {
  dodajMrezuR50Nalog,
  tipoviMrezeR50A,
  ukloniMrezuR50SaNaloga,
  rezanjeR50,
  fixR50M2,
} = fixR50Slice.actions;
export const selectR50 = (state: RootState) => state;
export default fixR50Slice.reducer;
