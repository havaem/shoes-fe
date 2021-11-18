export default function ProductDescription({ data }) {
	return (
		<div className="mt-8 p-4 bg-grayfa rounded-md">
			<h3 className="mb-2 text-blue33 text-2xl font-medium">Product Information</h3>
			<p className="first-letter:ml-8 text-base">{data}</p>
		</div>
	);
}
