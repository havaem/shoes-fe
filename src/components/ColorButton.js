import { useEffect, useState } from "react";

export default function ColorButton({ color, active, changeData }) {
	const [colorCode, setColorCode] = useState("");
	useEffect(() => {
		switch (color) {
			case "red":
				setColorCode("bg-[#FC3E39]");
				break;
			case "black":
				setColorCode("bg-[#000000]");
				break;
			case "yellow":
				setColorCode("bg-[#ffc600]");
				break;
			case "blue":
				setColorCode("bg-[#006cff]");
				break;
			default:
				break;
		}
	}, [color]);
	return (
		<button
			onClick={() => {
				changeData(color);
			}}
			className={`${colorCode} w-5 h-5  rounded-full ${
				active
					? "border-3 border-dotted border-blue-700 dark:border-blue-700"
					: "dark:border-3 dark:border-white"
			}`}
		></button>
	);
}
