import { useEffect, useState } from "react";
import { RoletaI } from "../interface/roleteI";
import sanitySetup from "../sanitySetup";

const rol = `*[_type == 'rolete']`;

const useFetchRolete = () => {
  const [roleteDb, setDataDb] = useState<RoletaI[]>([]);
  const [errorDb, setErrorDb] = useState<string>("");
  const [loadingDb, setLoadingDb] = useState<boolean>(false);

  useEffect(() => {
    setLoadingDb(true);
    const fetchData = async () => {
      try {
        const res: Response = await sanitySetup.fetch(rol);
        setDataDb(res as any);
        setLoadingDb(false);
      } catch (error: any) {
        console.log(error.message);
        setErrorDb(error.message);
      }
    };
    fetchData();
  }, []);

  return { roleteDb, errorDb, loadingDb };
};

export default useFetchRolete;
