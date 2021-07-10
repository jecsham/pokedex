import React from "react";
interface ComponentContext {
  updateCount: () => void;
}
const AppContext = React.createContext<ComponentContext>({
  updateCount: () => {},
});
export const AppProvider = AppContext.Provider;
export default AppContext;
