import { useEffect, useState } from "react";
import { createOneComment, getAllCommentFromPost } from "reducers/asyncThunk/commentAsyncThunk";
import { errorNoti, successNoti } from "reducers/notiReducer";
import ProductCommentItem from "./ProductCommentItem";
export default function ProductComment({ login, userRating, id, dispatch, product }) {
	const [listComment, setListComment] = useState(null);
	const [comment, setComment] = useState("");
	const handleSubmitComment = async () => {
		try {
			if (!login) {
				dispatch(errorNoti({ message: "Please login to use this feature!" }));
				return;
			}
			if (comment) {
				let response = await dispatch(createOneComment({ id: id, comment: comment })).unwrap();
				response.comment.user.rating = userRating;
				setListComment((pre) => [response.comment, ...pre]);
				setComment("");
				dispatch(successNoti({ message: response.message, delay: 1500 }));
			}
		} catch (error) {
			dispatch(errorNoti({ message: error.message, delay: 1500 }));
		}
	};
	useEffect(() => {
		const getAllComment = async () => {
			try {
				const response = await dispatch(getAllCommentFromPost(id)).unwrap();
				setListComment(response);
			} catch (error) {
				dispatch(errorNoti({ message: error.message, delay: 1500 }));
			}
		};
		return getAllComment();
	}, [dispatch, id, product]);
	return (
		<div className="mt-8 p-4 bg-grayfa rounded-md">
			<h3 className="mb-4 text-blue33 text-2xl font-medium">Comments</h3>
			<div className="flex flex-wrap gap-y-2 mb-4 rounded-md">
				<textarea
					className="p-2 w-full outline-none"
					rows="2"
					placeholder="Leave a comment"
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
					required
				></textarea>
				<button
					type="button"
					className="ml-auto px-4 py-2 text-white bg-redfb rounded-md"
					onClick={handleSubmitComment}
				>
					Submit
				</button>
			</div>
			<div>
				{/* Comment item */}
				{listComment &&
					listComment.map((e) => (
						<ProductCommentItem
							login={login}
							key={e._id}
							id={e._id}
							name={e.user.name}
							email={e.user.email}
							picture={e.user.picture}
							content={e.content}
							rating={e.user.rating}
							date={e.createdAt}
						/>
					))}
			</div>
		</div>
	);
}
