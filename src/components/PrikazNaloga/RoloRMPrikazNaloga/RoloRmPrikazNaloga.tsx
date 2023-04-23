import styles from "../R50PrikazNaloga/css/R50PrikazNaloga.module.css";
import globalStyles from "../../../globalStyles/globalCss.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectRoloRM,
  ukloniRoloRMSaNaloga,
} from "../../../features/slices/RoloRM/RoloRMSlice";
import { selectRolete } from "../../../features/slices/RoleteSlice/roleteSlice";

const RoloRmPrikazNaloga = () => {
  const { roloRMnalog, roloRMm2 } = useAppSelector(selectRoloRM);
  const {
    rolete: { isPrint },
  } = useAppSelector(selectRolete);

  const dispatch = useAppDispatch();

  if (roloRMnalog.length < 1) {
    return null;
  }
  return (
    <div>
      <div className={styles.prikazKomariceR50}>
        <h4>Rolo RM Nalog</h4>
        <div className={styles.komariceR50Grid}>
          <div className={styles.komariceR50Child}>
            <p>Komada</p>
          </div>
          <div className={styles.komariceR50Child}>
            <p>Tip</p>
          </div>
          <div className={styles.komariceR50Child}>
            <p>Širina x Visina</p>
          </div>
          {!isPrint && (
            <div className={styles.komariceR50Child}>
              <p></p>
            </div>
          )}
        </div>
        {roloRMnalog.map((komar) => {
          const { sirina, visina, komada, id, tip } = komar;
          return (
            <div key={id} className={styles.komariceR50Grid}>
              <div className={styles.komariceR50Child}>
                <p>{komada}</p>
              </div>
              <div className={styles.komariceR50Child}>
                <p>{tip}</p>
              </div>
              <div className={styles.komariceR50Child}>
                <p>
                  {sirina} x {visina}
                </p>
              </div>
              {!isPrint && (
                <div className={styles.komariceR50Child}>
                  <button
                    style={{
                      marginTop: "3px",
                      padding: "3px 8px",
                      fontSize: "16px",
                    }}
                    className={globalStyles.btnPrimary}
                    onClick={() => dispatch(ukloniRoloRMSaNaloga(id))}
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
            Mreže: {String(roloRMm2)}
            <span style={{ fontSize: "14px" }}>m2</span>
          </h4>
        )}
      </div>
    </div>
  );
};

export default RoloRmPrikazNaloga;
