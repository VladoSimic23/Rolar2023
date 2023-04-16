import IzradaNaloga from "./components/IzradaNaloga/Izrada/IzradaNaloga";
import Print from "./components/Print/Print";
import globalStyles from "./globalStyles/globalCss.module.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  selectRolete,
  togglePrint,
} from "./features/slices/RoleteSlice/roleteSlice";

function App() {
  const {
    rolete: { isPrint },
  } = useAppSelector(selectRolete);
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      {!isPrint && <IzradaNaloga />}
      {isPrint && <Print />}
      <button
        className={globalStyles.printBtn}
        onClick={() => dispatch(togglePrint(""))}
      ></button>
    </div>
  );
}

export default App;
