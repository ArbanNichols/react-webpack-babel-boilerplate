const AppContext = React.createContext();

const AppProvider = ({children}) => {
  return <AppContext.Provider value={'hello'}>{children}</AppContext.Provider>
}

// Custom Hooks
export const useGlobalContext = () => {
  return useContext(AppContext);
}

export {AppContext, AppProvider};