import { useContext } from "react";
import { AppContext } from "../provider";

function useApp() {
  const mContext = useContext(AppContext);
  return mContext;
}
export default useApp;
