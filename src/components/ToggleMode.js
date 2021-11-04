import { useEffect, useState } from "react";

const ToggleMode = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	useEffect(() => {
		const theme = localStorage.getItem("theme");
		if (!theme) {
			localStorage.setItem("theme", "light");
			return;
		}
		setIsDarkMode(theme === "dark" ? true : false);
	}, []);
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);
	return (
		<div className="fixed z-50 -right-2 bottom-4 -rotate-90">
			<input
				type="checkbox"
				name="darkmode"
				id="darkmode"
				className="toggleDarkmode hidden"
				checked={isDarkMode}
				onChange={(e) => {
					setIsDarkMode(e.target.checked);
				}}
			/>
			<label
				htmlFor="darkmode"
				className="before:top-[2px] before:left-[2px] before:absolute relative inline-block w-14 before:w-5 before:h-5 h-7 before:bg-blue33 bg-white border-2 border-blue33 rounded-3xl before:rounded-full before:transition-transform before:duration-300"
			></label>
		</div>
	);
};

export default ToggleMode;
