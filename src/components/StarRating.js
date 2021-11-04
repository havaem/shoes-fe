import { Star } from "react-ionicons";

const StarRating = ({ active = false }) => {
	return <Star color={active ? "#FFC600" : "#C1C8CE"} height="15px" width="15px" />;
};

export default StarRating;
