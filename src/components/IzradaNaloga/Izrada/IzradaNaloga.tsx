import { useAppSelector } from "../../../app/hooks";
import R50PrikazNaloga from "../../PrikazNaloga/R50PrikazNaloga/R50PrikazNaloga";
import R50Rezanje from "../../rezanje/R50Rezanje/R50Rezanje";
import RoleteRezanje from "../../rezanje/RoleteRezanje/RoleteRezanje";
import StandardRezanje from "../../rezanje/StandardRezanje/StandardRezanje";
import { selectRolete } from "../../../features/slices/RoleteSlice/roleteSlice";
import RoletePrikazNaloga from "../../PrikazNaloga/RoletePrikazNaloga/RoletePrikazNaloga";
import StandardPrikazNaloga from "../../PrikazNaloga/StandardPrikazNaloga/StandaradPrikazNaloga";
import FixR50Izrada from "../FixR50Izrada/FixR50Izrada";
import FixStandardIzrada from "../FixStandardIzrada/FixStandardIzrada";
import OdabirProizvoda from "../OdabirProizvoda/OdabirProizvoda";
import RoleteIzradaNaloga from "../RoleteIzrada/RoleteIzradaNaloga";
import styles from "./css/izradaNaloga.module.css";
import Kupac from "../../Kupac/Kupac";
import RoloRMizradaNaloga from "../RoloRMizrada/RoloRMizradaNaloga";
import RoloRmPrikazNaloga from "../../PrikazNaloga/RoloRMPrikazNaloga/RoloRmPrikazNaloga";
import RoloRMrezanje from "../../rezanje/RoloRMrezanje/RoloRMrezanje";

const IzradaNaloga = () => {
  const {
    rolete: { trenutniTipProizvoda, roleteNalog, roleteRezanje },
    fixR50: { fixR50Nalog, mrezeR50Rezanje },
    fixStandard: { fixStandardNalog, standardRezanje },
    roloRM: { roloRMnalog, roloRMrezanje },
  } = useAppSelector(selectRolete);

  return (
    <div className={styles.prikazNalogaGrid}>
      <div className={styles.left}>
        <Kupac />
        <OdabirProizvoda />
        {trenutniTipProizvoda === "Rolete" && <RoleteIzradaNaloga />}
        {trenutniTipProizvoda === "R50" && <FixR50Izrada />}
        {trenutniTipProizvoda === "Standard" && <FixStandardIzrada />}
        {trenutniTipProizvoda === "RoloRM" && <RoloRMizradaNaloga />}
      </div>
      <div className={styles.right}>
        <div>
          {roleteNalog.length > 0 && <RoletePrikazNaloga />}
          {roleteRezanje.length > 0 && <RoleteRezanje />}
          {fixR50Nalog.length > 0 && <R50PrikazNaloga />}
          {mrezeR50Rezanje.length > 0 && <R50Rezanje />}
          {fixStandardNalog.length > 0 && <StandardPrikazNaloga />}
          {standardRezanje.length > 0 && <StandardRezanje />}
          {roloRMnalog.length > 0 && <RoloRmPrikazNaloga />}
          {roloRMrezanje.length > 0 && <RoloRMrezanje />}
        </div>
      </div>
    </div>
  );
};

export default IzradaNaloga;
