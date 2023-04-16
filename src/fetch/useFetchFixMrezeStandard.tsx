import React, { useEffect, useState } from "react";
import { KomaricaStandardI } from "../interface/fixMrezeStandard";
import sanitySetup from "../sanitySetup";

const mreze = `*[_type == 'fixMrezeStandard']`;

const useFetchFixMrezeStandard = () => {
  const [fixMrezeStandardDb, setDataDb] = useState<KomaricaStandardI[]>([]);
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

  return { fixMrezeStandardDb, errorDb, loadingDb };
};

export default useFetchFixMrezeStandard;
