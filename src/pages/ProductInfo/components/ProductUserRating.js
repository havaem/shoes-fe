import ReactStars from "react-stars";

export default function ProductUserRating({ login, value, onChange }) {
	return (
		login && (
			<div className="mt-8 p-4 bg-grayfa rounded-md">
				<h3 className="mb-4 text-blue33 text-2xl font-medium">Your rating:</h3>
				<ReactStars
					count={5}
					onChange={(newRating) => {
						onChange(newRating);
					}}
					value={value}
					half={false}
					size={30}
					activeColor="#ffd700"
				/>
			</div>
		)
	);
}
