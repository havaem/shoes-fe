import { useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { errorNoti, successNoti } from "reducers/notiReducer";
import icon from "assets/icons/icon.png";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "pages/Cart/components/ErrorMessage";
import { changeForgotPasswordUser } from "reducers/asyncThunk/userAsyncThunk";
export default function Reset() {
	const dispatch = useDispatch();
	const history = useHistory();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({ mode: "all" });
	const { token } = useParams();
	const onSubmit = async (data) => {
		try {
			const response = await dispatch(
				changeForgotPasswordUser({
					token: token,
					password: data.password,
				})
			).unwrap();
			dispatch(successNoti({ message: response.message }));
			history.push("/login");
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
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="mb-4 text-center">
						<img src={icon} alt="" className="inline mb-2" />
						<h2 className="dark:text-whitee2 text-2xl font-bold">Welcome to South</h2>
						<p className="text-[#9098B1]">Change Password</p>
					</div>
					<div className="flex flex-col gap-y-4">
						<div>
							<input
								{...register("password", {
									required: "This is a required infomation!",
									minLength: {
										value: 8,
										message: "A password must be eight characters!",
									},
									maxLength: {
										value: 30,
										messageL: "Max length is 30 characters",
									},
									pattern: {
										value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[0-9a-zA-Z]{8,}$/,
										message: "At least 1 uppercase, 1 lowercase and 1 number!",
									},
								})}
								type="password"
								placeholder="New password"
								className="bg-[#f5f5f5] px-4 py-3 w-full dark:text-whitee2 dark:bg-gray3a border-2 focus:border-2 focus:border-blue33 border-transparent rounded-md outline-none transition-all"
							/>
							<ErrorMessage>{errors.password && errors.password.message}</ErrorMessage>
						</div>
						<div>
							<input
								{...register("passwordConfirmation", {
									required: "Please confirm password!",
									validate: {
										matchesPreviousPassword: (value) => {
											const { password } = getValues();
											return password === value || "Passwords should match!";
										},
									},
								})}
								type="password"
								placeholder="Retype new password"
								className="bg-[#f5f5f5] px-4 py-3 w-full dark:text-whitee2 dark:bg-gray3a border-2 focus:border-2 focus:border-blue33 border-transparent rounded-md outline-none transition-all"
							/>
							<ErrorMessage>
								{errors.passwordConfirmation && errors.passwordConfirmation.message}
							</ErrorMessage>
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
