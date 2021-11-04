const Directory = ({ items }) => {
	const renderItems = (items) => {
		return items.map((e, i) => (
			<li
				key={i}
				className={`relative text-blue33 
                ${
					i !== 2 &&
					"before:bg-green before:content-[attr(content)] before:text-[#C1C8CE] before:absolute  before:-right-4"
				}`}
				content="/"
			>
				<a href={e.link}>{e.title}</a>
			</li>
		));
	};
	return (
		<ul className="gap-x-[22px] bg-grayfb mb-[50px] dark:bg-gray24 md:mt-[70px] flex justify-center py-4 md:pb-5 xl:mb-8">
			{renderItems(items)}
		</ul>
	);
};

export default Directory;
