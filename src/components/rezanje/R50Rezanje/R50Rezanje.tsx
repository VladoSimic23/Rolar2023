import { useAppSelector } from "../../../app/hooks";
import { selectR50 } from "../../../features/slices/FIxR50Slice/FixR50Slice";
import styles from "../RoleteRezanje/css/roleteRezanje.module.css";

const R50Rezanje = () => {
  const {
    fixR50: { mrezeR50Rezanje },
  } = useAppSelector(selectR50);

  if (mrezeR50Rezanje.length < 1) {
    return null;
  }

  return (
    <div className={styles.printPar}>
      <h4>Fix R50 Nalog</h4>
      <div className={styles.roleteRezanjeGrid}>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Komada</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Tip</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Šir x Vis</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p className={styles.mjeraPadding}>Mjera</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Kukice</p>
        </div>
      </div>
      {mrezeR50Rezanje.map((mreza) => {
        const {
          id,
          visina,
          sirina,
          tip,
          komada,
          ukupnaSirina,
          ukupnaVisina,
          mjera,
          kukice,
        } = mreza;
        return (
          <div key={id} className={styles.roleteRezanjeGrid}>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{komada}</p>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{tip}</p>
            </div>
            <div className={`${styles.roleteRezanjeGridChild}`}>
              <div className={styles.rezanjeParent}>
                <span>{sirina}</span>{" "}
                <p>
                  {ukupnaSirina} x {ukupnaVisina}
                </p>
                <span>{visina} </span>
              </div>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p className={styles.mjeraPadding}>{mjera}</p>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{kukice}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default R50Rezanje;
