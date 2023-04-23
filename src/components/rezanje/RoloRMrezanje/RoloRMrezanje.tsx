import { useAppSelector } from "../../../app/hooks";
import { selectRoloRM } from "../../../features/slices/RoloRM/RoloRMSlice";
import styles from "../RoleteRezanje/css/roleteRezanje.module.css";

const RoloRMrezanje = () => {
  const { roloRMrezanje } = useAppSelector(selectRoloRM);

  if (roloRMrezanje.length < 1) {
    return null;
  }

  return (
    <div className={styles.printPar}>
      <h4>Rolo RM Rezanje</h4>
      <div className={styles.roleteRezanjeGrid}>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Komada</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Tip</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Kutija</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Vodilica</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Popr.Profil</p>
        </div>
        <div className={styles.roleteRezanjeGridChild}>
          <p>Mre/Zavr</p>
        </div>
      </div>
      {roloRMrezanje.map((mreza) => {
        const {
          id,
          kutija,
          tip,
          komada,
          poprecniProfil,
          mrezaIzavrsna,
          vodilica,
        } = mreza;
        return (
          <div key={id} className={styles.roleteRezanjeGrid}>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{komada}</p>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{tip}</p>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{kutija}</p>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{vodilica}</p>
            </div>
            <div className={`${styles.roleteRezanjeGridChild}`}>
              <p>{poprecniProfil}</p>
            </div>
            <div className={styles.roleteRezanjeGridChild}>
              <p>{mrezaIzavrsna}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoloRMrezanje;
