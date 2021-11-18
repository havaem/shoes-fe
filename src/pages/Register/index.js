import icon from "assets/icons/icon.png";
import { AVATAR_DEFAULT } from "constant";
import { ErrorMessage } from "pages/Cart/components/ErrorMessage";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "reducers/asyncThunk/userAsyncThunk";
import { errorNoti, successNoti } from "reducers/notiReducer";
export default function Register() {
	const dispatch = useDispatch();
	const history = useHistory();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm(
		{
			defaultValues: {
				name: "Võ Hoài Nam",
				email: "vhnvohoainam@gmail.com",
				password: "nAm0165378969",
				passwordConfirmation: "nAm0165378969",
			},
		},
		{ mode: "all" }
	);
	const onSubmit = async (data) => {
		try {
			delete data.passwordConfirmation;
			data.picture = AVATAR_DEFAULT;
			await dispatch(registerUser(data)).unwrap();
			dispatch(successNoti({ message: "Login successful" }));
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
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="mb-4 text-center">
						<img src={icon} alt="" className="inline mb-2" />
						<h2 className="dark:text-whitee2 text-2xl font-bold">Let's Get Started</h2>
						<p className="text-[#9098B1]">Create an new account</p>
					</div>
					<div className="flex flex-col gap-y-4">
						<div>
							<input
								{...register("name", {
									required: "This is a required infomation!",
									maxLength: {
										value: 30,
										message: "Max length is 30 characters!",
									},
								})}
								type="text"
								placeholder="Full Name"
								className={`bg-[#f5f5f5] dark:bg-gray3a px-4 py-3 w-full dark:text-whitee2 border-2 focus:border-2  border-transparent rounded-md outline-none transition-all ${
									errors.name ? "border-red-600" : "focus:border-blue33"
								}`}
							/>
							<ErrorMessage>{errors.name && errors.name.message}</ErrorMessage>
						</div>
						<div>
							<input
								{...register("email", {
									required: "This is a required infomation!",
									pattern: {
										value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: "Invalid email address!",
									},
								})}
								type="text"
								placeholder="Your Email"
								className={`bg-[#f5f5f5] dark:bg-gray3a px-4 py-3 w-full dark:text-whitee2 border-2 focus:border-2  border-transparent rounded-md outline-none transition-all ${
									errors.email ? "border-red-600" : "focus:border-blue33"
								}`}
							/>
							<ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
						</div>
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
								placeholder="Password"
								className={`bg-[#f5f5f5] dark:bg-gray3a px-4 py-3 w-full dark:text-whitee2 border-2 focus:border-2 focus:border-blue33 border-transparent rounded-md outline-none transition-all ${
									errors.password ? "border-red-600" : "focus:border-blue33"
								}`}
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
								placeholder="Password Again"
								className={`bg-[#f5f5f5] dark:bg-gray3a px-4 py-3 w-full dark:text-whitee2 border-2 focus:border-2 focus:border-blue33 border-transparent rounded-md outline-none transition-all ${
									errors.passwordConfirmation ? "border-red-600" : "focus:border-blue33"
								}`}
							/>
							<ErrorMessage>
								{errors.passwordConfirmation && errors.passwordConfirmation.message}
							</ErrorMessage>
						</div>
					</div>
					<button className="items-center mt-4 py-4 text-white dark:text-whitee2 dark:bg-black1f bg-blue33 rounded-md">
						Sign Up
					</button>
				</form>
				<p className="mt-2 text-center dark:text-whitee2">
					have a account?{" "}
					<Link to="/login" className="text-blue33 font-bold">
						Sign In
					</Link>
				</p>
			</div>
		</section>
	);
}
