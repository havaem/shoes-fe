import StarRating from "components/StarRating";

export default function ProductRating({ product }) {
	const percentProcess = (type) => {
		let percent = 0;
		const sum =
			product.rating.ratingByTimes.oneStar.length +
			product.rating.ratingByTimes.twoStars.length +
			product.rating.ratingByTimes.threeStars.length +
			product.rating.ratingByTimes.fourStars.length +
			product.rating.ratingByTimes.fiveStars.length;
		if (sum === 0) return `0%`;
		switch (type) {
			case 1:
				percent = (product.rating.ratingByTimes.oneStar.length / sum) * 100;
				break;
			case 2:
				percent = (product.rating.ratingByTimes.twoStars.length / sum) * 100;
				break;
			case 3:
				percent = (product.rating.ratingByTimes.threeStars.length / sum) * 100;
				break;
			case 4:
				percent = (product.rating.ratingByTimes.fourStars.length / sum) * 100;
				break;
			case 5:
				percent = (product.rating.ratingByTimes.fiveStars.length / sum) * 100;
				break;
			default:
				break;
		}
		return `${percent}%`;
	};
	return (
		<div className="mt-8 p-4 bg-grayfa rounded-md">
			<h3 className="mb-4 text-blue33 text-2xl font-medium">
				Rating:{" "}
				{product.rating.ratingByTimes.oneStar.length +
					product.rating.ratingByTimes.twoStars.length +
					product.rating.ratingByTimes.threeStars.length +
					product.rating.ratingByTimes.fourStars.length +
					product.rating.ratingByTimes.fiveStars.length}{" "}
				times - {product.rating.averageRating}/5⭐
			</h3>
			<div className="flex flex-col gap-y-4 font-mono">
				<div className="flex gap-x-6 items-center">
					<div className="flex gap-x-1 items-center">
						1 <StarRating active />
					</div>
					<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
						<div style={{ width: `${percentProcess(1)}` }} className="h-6 bg-yellowff"></div>
						<span className="absolute-center absolute">
							{product.rating.ratingByTimes.oneStar.length} times
						</span>
					</div>
				</div>
				<div className="flex gap-x-6 items-center">
					<div className="flex gap-x-1 items-center">
						2<StarRating active />
					</div>
					<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
						<div style={{ width: `${percentProcess(2)}` }} className="h-6 bg-yellowff"></div>
						<span className="absolute-center absolute">
							{product.rating.ratingByTimes.twoStars.length} times
						</span>
					</div>
				</div>
				<div className="flex gap-x-6 items-center">
					<div className="flex gap-x-1 items-center">
						3<StarRating active />
					</div>
					<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
						<div style={{ width: `${percentProcess(3)}` }} className="h-6 bg-yellowff"></div>
						<span className="absolute-center absolute">
							{product.rating.ratingByTimes.threeStars.length} times
						</span>
					</div>
				</div>
				<div className="flex gap-x-6 items-center">
					<div className="flex gap-x-1 items-center">
						4<StarRating active />
					</div>
					<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
						<div style={{ width: `${percentProcess(4)}` }} className="h-6 bg-yellowff"></div>
						<span className="absolute-center absolute">
							{product.rating.ratingByTimes.fourStars.length} times
						</span>
					</div>
				</div>
				<div className="flex gap-x-6 items-center">
					<div className="flex gap-x-1 items-center">
						5<StarRating active />
					</div>

					<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
						<div style={{ width: `${percentProcess(5)}` }} className="h-6 bg-yellowff"></div>
						<span className="absolute-center absolute">
							{product.rating.ratingByTimes.fiveStars.length} times
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
