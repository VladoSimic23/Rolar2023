import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  dodajMrezuStandNalog,
  rezanjeFixStandard,
  selectStandard,
  standardM2,
  tipoviMrezeStand,
} from "../../../features/slices/FixStandardSlice/FixStandardSlice";
import { MrezeNalogStandard } from "../../../interface/fixMrezeStandard";
import styles from "./css/fixStandardIzrada.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";
import useFetchFixMrezeStandard from "../../../fetch/useFetchFixMrezeStandard";

const FixStandardIzrada = () => {
  const [mrezeStandard, setMrezeStandard] = useState<MrezeNalogStandard>({
    id: "",
    tip: "",
    sirina: "",
    visina: "",
    komada: "",
  });

  const dispatch = useAppDispatch();
  const {
    fixStandard: { tipoviMrezeStandard, fixStandardNalog },
  } = useAppSelector(selectStandard);
  const { fixMrezeStandardDb } = useFetchFixMrezeStandard();

  useEffect(() => {
    dispatch(tipoviMrezeStand(fixMrezeStandardDb));
  }, [fixMrezeStandardDb, dispatch]);

  useEffect(() => {
    dispatch(rezanjeFixStandard(fixMrezeStandardDb));
    dispatch(standardM2(""));
  }, [fixMrezeStandardDb, dispatch, fixStandardNalog]);

  const dodajProizvod = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(dodajMrezuStandNalog(mrezeStandard));
    setMrezeStandard({
      ...mrezeStandard,
      id: "",
      sirina: "",
      visina: "",
      komada: "",
    });
  };

  return (
    <div className={styles.odabirUređivanje2}>
      <form className={styles.flexForm2} onSubmit={dodajProizvod}>
        <select
          required
          onChange={(e) =>
            setMrezeStandard({ ...mrezeStandard, tip: e.target.value })
          }
        >
          <option value="">-- Odaberi Proizvod</option>
          {tipoviMrezeStandard.length > 0 &&
            tipoviMrezeStandard.map((tip: string, idx: number) => {
              return (
                <option value={tip} key={idx}>
                  {tip}
                </option>
              );
            })}
        </select>
        <div className={styles.flexInput}>
          <label htmlFor="stSirina">Širina</label>
          <input
            required
            type="number"
            id="stSirina"
            value={mrezeStandard.sirina}
            onChange={(e) =>
              setMrezeStandard({
                ...mrezeStandard,
                sirina: Number(e.target.value),
              })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>
        <div className={styles.flexInput}>
          <label htmlFor="stVisina">Visina</label>
          <input
            required
            type="number"
            id="stVisina"
            value={mrezeStandard.visina}
            onChange={(e) =>
              setMrezeStandard({
                ...mrezeStandard,
                visina: Number(e.target.value),
              })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>

        <div className={styles.flexInput}>
          <label htmlFor="stKomada">Komada</label>
          <input
            type="number"
            id="stKomada"
            value={mrezeStandard.komada}
            onChange={(e) =>
              setMrezeStandard({
                ...mrezeStandard,
                komada: Number(e.target.value),
              })
            }
            onWheel={(e: any) => e.target.blur()}
          />
        </div>

        <button className={globalStyles.btnPrimary} type="submit">
          Dodaj Proizvod
        </button>
      </form>
    </div>
  );
};

export default FixStandardIzrada;
