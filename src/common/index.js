import StarRating from "components/StarRating";

export const renderStarRating = (number) => {
	let data = [];
	for (let i = 0; i < 5; i++) {
		data.push(i < number ? <StarRating key={i} active /> : <StarRating key={i} />);
	}
	return data;
};
