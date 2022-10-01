import { createContext, ReactNode, useReducer, useState } from "react";

const AppContext = createContext<any>(null);
const { Provider } = AppContext;

interface Props {
  children: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [viewedCities, setViewedCities] = useState([]);

  const context = { viewedCities, setViewedCities };
  return <Provider value={context}>{children}</Provider>;
};

export { AppProvider, AppContext };
