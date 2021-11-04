import Slide from "common/Slide";
import BestSeller from "./components/BestSeller";
import Banner from "./components/Banner";
import Policy from "./components/Policy";
import banner from "assets/images/banner.png";
const slideSettings = {
	autoplay: true,
	autoplaySpeed: 5000,
	arrows: false,
	infinite: true,
	speed: 500,
	adaptiveHeight: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	touchMove: false,
};
const slideItems = [
	<img className="object-contain" src={banner} alt="slide" />,
	<img className="object-contain" src={banner} alt="slide" />,
	<img className="object-contain" src={banner} alt="slide" />,
];

const Home = () => {
	return (
		<>
			<Slide settings={slideSettings} items={slideItems} className="max-h-[650px] md:mt-[70px]" />
			<BestSeller />
			<Banner />
			<Policy />
		</>
	);
};

export default Home;
