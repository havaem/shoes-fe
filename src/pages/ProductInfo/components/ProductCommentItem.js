import StarRating from "components/StarRating";
import { useEffect, useState } from "react";
import { ChatbubbleEllipsesOutline } from "react-ionicons";
import { useDispatch } from "react-redux";
import { createOneRepComment, getAllReplyComment } from "reducers/asyncThunk/commentAsyncThunk";
import { errorNoti, successNoti } from "reducers/notiReducer";
import { convertTimestampToDate } from "utils";
export default function ProductCommentItem({ id,product, picture, name, date, content, rating, email, login }) {
	const dispatch = useDispatch();
	const [replyComment, setReplyComment] = useState(false);
	const [comment, setComment] = useState("");
	const [listSubComment, setListSubComment] = useState([]);
	const renderRate = (number) => {
		let data = [];
		for (let i = 0; i < 5; i++) {
			data.push(i < number ? <StarRating key={i} active /> : <StarRating key={i} />);
		}
		return data;
	};
	const handleSubmitRepComment = async () => {
		try {
			if (!login) {
				dispatch(errorNoti({ message: "Please login to use this feature" }));
				return;
			}
			if (comment) {
				let response = await dispatch(createOneRepComment({ id: id, comment: comment })).unwrap();
				response.comment.user.rating = rating;
				setListSubComment((pre) => [...pre, response.comment]);
				setComment("");
				setReplyComment(false);
				dispatch(successNoti({ message: response.message, delay: 1500 }));
			}
		} catch (error) {
			dispatch(errorNoti({ message: error.message, delay: 1500 }));
		}
	};
	useEffect(() => {
		const getAllReply = async () => {
			try {
				const response = await dispatch(getAllReplyComment(id)).unwrap();
				setListSubComment(response);
			} catch (error) {
				dispatch(errorNoti({ message: error.message, delay: 1500 }));
			}
		};
		return getAllReply();
	}, [dispatch, id, product]);
	return (
		<div className="flex gap-4 mt-4">
			{/* Avatar */}
			<div className="flex-shrink-0 mt-2 w-9 h-9">
				<img
					title={email}
					src={picture}
					alt=""
					className="w-full h-full border-2 border-blue33 rounded-full object-cover"
				/>
			</div>
			{/* Content */}
			<div className="flex-grow">
				<div className="flex flex-wrap items-center justify-between">
					<p className="text-lg font-medium" title={email}>
						{name}
					</p>
					<h4 className="text-[#e87a5a] text-xs">{convertTimestampToDate(date)}</h4>
				</div>
				<div className="flex gap-x-2 mb-2">{renderRate(rating)}</div>
				<p className="font-sans text-base">{content}</p>
				{login && (
					<button
						className="flex gap-x-1 items-center mb-6 ml-auto text-gray-400 text-sm"
						onClick={() => {
							setReplyComment((pre) => !pre);
						}}
					>
						<ChatbubbleEllipsesOutline color={"#00000"} height="14px" width="14px" />
						Answer
					</button>
				)}

				{listSubComment.length > 0 &&
					listSubComment.map((e) => (
						<div className="flex gap-4 mt-4">
							<div className="flex-shrink-0 mt-2 w-9 h-9">
								<img
									src={e.user.picture}
									alt=""
									className="w-full h-full border-2 border-blue33 rounded-full object-cover"
								/>
							</div>
							<div className="flex-grow">
								<div className="flex flex-wrap items-center justify-between">
									<p className="text-lg font-medium">{e.user.name}</p>
									<h4 className="text-[#e87a5a] text-xs">
										{convertTimestampToDate(e.createdAt)}
									</h4>
								</div>
								<div className="flex gap-x-2 mb-2">{renderRate(e.user.rating)}</div>
								<p className="mb-2 font-sans text-base">{e.content}</p>
								{login && (
									<button
										className="flex gap-x-1 items-center ml-auto text-gray-400 text-sm"
										onClick={() => {
											setReplyComment((pre) => !pre);
										}}
									>
										<ChatbubbleEllipsesOutline
											color={"#00000"}
											height="14px"
											width="14px"
										/>
										Answer
									</button>
								)}
							</div>
						</div>
					))}

				{replyComment && (
					<div className="flex flex-wrap gap-y-2 justify-end rounded-md">
						<textarea
							className="p-2 w-full outline-none"
							rows="3"
							value={comment}
							onChange={(e) => {
								setComment(e.target.value);
							}}
						></textarea>
						<button
							className="px-4 py-2 text-white bg-redfb rounded-md"
							onClick={handleSubmitRepComment}
						>
							Submit
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
