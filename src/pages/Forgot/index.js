import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { errorNoti, successNoti } from "reducers/notiReducer";
import icon from "assets/icons/icon.png";
import { useState } from "react";
import { forgotPasswordUser } from "reducers/asyncThunk/userAsyncThunk";
export default function Forgot() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await dispatch(forgotPasswordUser(email)).unwrap();
			dispatch(successNoti({ message: response.message }));
			history.push("/");
		} catch (err) {
			dispatch(errorNoti({ message: err.message }));
		}
	};
	return (
		<section>
			<div className="mb-8 mt-5 md:mt-20 xl:px-4">
				<form
					className="max-w-[500px] flex flex-col justify-center mx-auto w-full"
					autoComplete="off"
					onSubmit={onSubmit}
				>
					<div className="mb-4 text-center">
						<img src={icon} alt="" className="inline mb-2" />
						<h2 className="dark:text-whitee2 text-2xl font-bold">Welcome to South</h2>
						<p className="text-[#9098B1]">Forgot Password</p>
					</div>
					<div className="flex flex-col gap-y-4">
						<div>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email"
								className="bg-[#f5f5f5] px-4 py-3 w-full dark:text-whitee2 dark:bg-gray3a border-2 focus:border-2 focus:border-blue33 border-transparent rounded-md outline-none transition-all"
							/>
						</div>
					</div>
					<button
						className="items-center mt-4 py-4 text-white dark:text-whitee2 dark:bg-black1f bg-blue33 rounded-md"
						type="submit"
					>
						Submit
					</button>
					<p className="mt-2 text-center dark:text-whitee2">
						Don’t have a account?{" "}
						<Link to="/register" className="text-blue33 font-bold">
							Register
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
}
