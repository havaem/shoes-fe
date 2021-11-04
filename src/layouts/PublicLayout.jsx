import Header from "components/Header";
import Footer from "components/Footer";
import ToggleMode from "components/ToggleMode";
import { MenuContextProvider } from "contexts/MenuContext";
import MobileMenu from "components/MobileMenu";

const PublicLayout = ({ children }) => {
	return (
		<>
			<ToggleMode />
			<MenuContextProvider>
				<MobileMenu />
				<Header />
			</MenuContextProvider>
			{children}
			<Footer />
		</>
	);
};

export default PublicLayout;
