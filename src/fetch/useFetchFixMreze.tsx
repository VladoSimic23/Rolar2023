import { useEffect, useState } from "react";
import { KomaricaR50I } from "../interface/fixMreze";
import sanitySetup from "../sanitySetup";

const mreze = `*[_type == 'fixMreze']`;

const useFetchFixMreze = () => {
  const [fixMrezeDb, setDataDb] = useState<KomaricaR50I[]>([]);
  const [errorDb, setErrorDb] = useState<string>("");
  const [loadingDb, setLoadingDb] = useState<boolean>(false);

  useEffect(() => {
    setLoadingDb(true);
    const fetchData = async () => {
      try {
        const res: Response = await sanitySetup.fetch(mreze);
        setDataDb(res as any);
        setLoadingDb(false);
      } catch (error: any) {
        console.log(error.message);
        setErrorDb(error.message);
      }
    };
    fetchData();
  }, []);

  return { fixMrezeDb, errorDb, loadingDb };
};

export default useFetchFixMreze;
