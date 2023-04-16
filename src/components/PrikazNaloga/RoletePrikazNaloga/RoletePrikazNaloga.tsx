import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectRolete,
  ukloniRoletuSaNaloga,
} from "../../../features/slices/RoleteSlice/roleteSlice";
import styles from "./css/roletePrikazNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";

const RoletePrikazNaloga = () => {
  const {
    rolete: { roleteNalog, roleteM2, isPrint },
  } = useAppSelector(selectRolete);
  const dispatch = useAppDispatch();

  if (roleteNalog.length < 1) {
    return null;
  }

  return (
    <div>
      <div className={styles.prikazRolete}>
        <h4>Rolete Nalog</h4>
        <div className={styles.roleteGrid}>
          <div className={styles.roleteGridChild}>
            <p>Komada</p>
          </div>
          <div className={styles.roleteGridChild}>
            <p>Tip</p>
          </div>
          <div className={styles.roleteGridChild}>
            <p>Šir x Vis</p>
          </div>
          <div className={styles.roleteGridChild}>
            <p>Komanda</p>
          </div>
          <div className={styles.roleteGridChild}>
            <p>Podizanje</p>
          </div>
          <div className={styles.roleteGridChild}>
            <p>Mreža</p>
          </div>
          {!isPrint && (
            <div className={styles.roleteGridChild}>
              <p></p>
            </div>
          )}
        </div>
        {roleteNalog.map((rol) => {
          const {
            tip,
            id,
            komada,
            sirina,
            visina,
            desnaKomanda,
            lijevaKomanda,
            mrezaZaRoletu,
            tipPodizanja,
          } = rol;

          return (
            <div key={id} className={styles.roleteGrid}>
              <div className={styles.roleteGridChild}>
                <p>{komada}</p>
              </div>
              <div className={styles.roleteGridChild}>
                <p>{tip}</p>
              </div>
              <div className={styles.roleteGridChild}>
                <p>
                  {sirina} x {visina}
                </p>
              </div>
              <div className={styles.roleteGridChild}>
                <p>{desnaKomanda === "" && lijevaKomanda !== "" && "L"}</p>
                <p>{desnaKomanda !== "" && lijevaKomanda === "" && "D"}</p>
                <p>
                  {desnaKomanda !== "" &&
                    lijevaKomanda !== "" &&
                    `${lijevaKomanda}L+${desnaKomanda}D`}
                </p>
              </div>
              <div className={styles.roleteGridChild}>
                <p>{tipPodizanja}</p>
              </div>
              <div className={styles.roleteGridChild}>
                <p>{mrezaZaRoletu === "Bez-Mreže" ? "" : mrezaZaRoletu}</p>
              </div>
              {!isPrint && (
                <div className={styles.roleteGridChild}>
                  <button
                    style={{
                      marginTop: "3px",
                      padding: "3px 8px",
                      fontSize: "16px",
                    }}
                    className={globalStyles.btnPrimary}
                    onClick={() => dispatch(ukloniRoletuSaNaloga(id))}
                  >
                    Ukloni
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {!isPrint && (
          <h4>
            Rolete: {String(roleteM2)}{" "}
            <span style={{ fontSize: "14px" }}>m2</span>
          </h4>
        )}
      </div>
    </div>
  );
};

export default RoletePrikazNaloga;
