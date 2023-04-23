import { useAppSelector } from "../../app/hooks";
import R50Rezanje from "../rezanje/R50Rezanje/R50Rezanje";
import RoleteRezanje from "../rezanje/RoleteRezanje/RoleteRezanje";
import StandardRezanje from "../rezanje/StandardRezanje/StandardRezanje";
import { selectRolete } from "../../features/slices/RoleteSlice/roleteSlice";
import styles from "./css/print.module.css";
import RoletePrikazNaloga from "../PrikazNaloga/RoletePrikazNaloga/RoletePrikazNaloga";
import KupacPrint from "../Kupac/KupacPrint";
import RoloRmPrikazNaloga from "../PrikazNaloga/RoloRMPrikazNaloga/RoloRmPrikazNaloga";
import RoloRMrezanje from "../rezanje/RoloRMrezanje/RoloRMrezanje";

const Print = () => {
  const {
    rolete: { roleteNalog },
    fixR50: { fixR50Nalog },
    fixStandard: { fixStandardNalog },
    roloRM: { roloRMnalog },
  } = useAppSelector(selectRolete);

  return (
    <div className={styles.print}>
      <KupacPrint />
      {roleteNalog.length > 0 && <RoletePrikazNaloga />}
      {roleteNalog.length > 0 && <RoleteRezanje />}
      {fixR50Nalog.length > 0 && <R50Rezanje />}
      {fixStandardNalog.length > 0 && <StandardRezanje />}
      {roloRMnalog.length > 0 && <RoloRmPrikazNaloga />}
      {roloRMnalog.length > 0 && <RoloRMrezanje />}
    </div>
  );
};

export default Print;
