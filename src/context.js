import sublinks from './data';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  }

  const closeSidebar = ()  => {
    setIsSidebarOpen(false);
  }
  
  const openSubmenu = () => {
    setIsSubmenuOpen(true);
  }

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  }

  return <AppContext.Provider value={{
    isSidebarOpen,
    setIsSidebarOpen,
    openSidebar,
    closeSidebar,
    isSubmenuOpen,
    setIsSubmenuOpen,
    openSubmenu,
    closeSubmenu,
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => useContext(AppContext)
