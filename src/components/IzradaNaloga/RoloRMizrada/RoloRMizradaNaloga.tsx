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
            value={roloRM.sirina}
            onChange={(e) =>
              setRoloRMnalog({
                ...roloRM,
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
            value={roloRM.visina}
            onChange={(e) =>
              setRoloRMnalog({
                ...roloRM,
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
            value={roloRM.komada}
            onChange={(e) =>
              setRoloRMnalog({
                ...roloRM,
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

export default RoloRMizradaNaloga;
