import { useEffect, useState } from "react";
import sanitySetup from "../sanitySetup";
import { RoloRMI } from "../interface/roloRMI";

const roloRM = `*[_type == 'roloRm']`;

const useFetchRoloRM = () => {
  const [roloRMDb, setDataDb] = useState<RoloRMI[]>([]);
  const [errorDb, setErrorDb] = useState<string>("");
  const [loadingDb, setLoadingDb] = useState<boolean>(false);

  useEffect(() => {
    setLoadingDb(true);
    const fetchData = async () => {
      try {
        const res: Response = await sanitySetup.fetch(roloRM);
        setDataDb(res as any);
        setLoadingDb(false);
      } catch (error: any) {
        console.log(error.message);
        setErrorDb(error.message);
      }
    };
    fetchData();
  }, []);

  return { roloRMDb, errorDb, loadingDb };
};

export default useFetchRoloRM;
