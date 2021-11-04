import { createContext, useState } from "react";
const MenuContext = createContext({
	statusMenu: false,
	setStatusMenu: () => {},
});
const MenuContextProvider = ({ children }) => {
	const [statusMenu, setStatusMenu] = useState(false);
	const value = { statusMenu, setStatusMenu };
	return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
export { MenuContextProvider, MenuContext };
