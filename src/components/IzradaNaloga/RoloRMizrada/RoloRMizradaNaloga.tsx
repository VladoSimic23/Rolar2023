import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import useFetchRoloRM from "../../../fetch/useFetchRoloRM";
import styles from "../FixStandardIzrada/css/fixStandardIzrada.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";
import { useEffect, useState } from "react";
import { RoloRMnalog } from "../../../interface/roloRMI";
import {
  RoloRmM2,
  dodajRoloRMnaNalog,
  rezanjeRoloRM,
  selectRoloRM,
} from "../../../features/slices/RoloRM/RoloRMSlice";
import { handleChange } from "../../../utils";

const RoloRMizradaNaloga = () => {
  const [roloRM, setRoloRMnalog] = useState<RoloRMnalog>({
    id: "",
    tip: "",
    sirina: "",
    visina: "",
    komada: "",
  });

  const dispatch = useAppDispatch();
  const { roloRMDb } = useFetchRoloRM();
  const { roloRMnalog } = useAppSelector(selectRoloRM);

  useEffect(() => {
    dispatch(rezanjeRoloRM(roloRMDb));
    dispatch(RoloRmM2(""));
  }, [roloRMDb, dispatch, roloRMnalog]);

  const dodajProizvod = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(dodajRoloRMnaNalog(roloRM));
    setRoloRMnalog({
      ...roloRM,
      id: "",
      sirina: "",
      visina: "",
      komada: "",
    });
  };

  return (
    <div className={styles.odabirUređivanje2}>
      <form className={styles.flexForm2} onSubmit={dodajProizvod}>
        <div className={styles.flexInput}>
          <label htmlFor="stSirina">Širina</label>
          <input
            required
            type="number"
            id="stSirina"
            name="sirina"
            value={roloRM.sirina}
            onChange={(e) => handleChange<any>(e, setRoloRMnalog)}
            onWheel={(e: any) => e.target.blur()}
          />
        </div>
        <div className={styles.flexInput}>
          <label htmlFor="stVisina">Visina</label>
          <input
            required
            type="number"
            id="stVisina"
            name="visina"
            value={roloRM.visina}
            onChange={(e) => handleChange<any>(e, setRoloRMnalog)}
            onWheel={(e: any) => e.target.blur()}
          />
        </div>

        <div className={styles.flexInput}>
          <label htmlFor="stKomada">Komada</label>
          <input
            type="number"
            id="stKomada"
            name="komada"
            value={roloRM.komada}
            onChange={(e) => handleChange<any>(e, setRoloRMnalog)}
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

export default RoloRMizradaNaloga;
