import Slider from "react-slick";

const Slide = ({ className, settings, items }) => {
	return (
		<Slider className={className} {...settings}>
			{items.map((e, i) => (
				<div key={i}>{e}</div>
			))}
		</Slider>
	);
};

export default Slide;
