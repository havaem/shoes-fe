import icon from "assets/icons/icon.png";
import { ErrorMessage } from "pages/Cart/components/ErrorMessage";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import { LogoGoogle } from "react-ionicons";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginGoogleUser, loginUser } from "reducers/asyncThunk/userAsyncThunk";
import { errorNoti, successNoti } from "reducers/notiReducer";
export default function Login() {
	const dispatch = useDispatch();
	const history = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm(
		{
			defaultValues: {
				email: "vhnvohoainam@gmail.com",
				password: "nAm0165378969",
			},
		},
		{ mode: "all" }
	);
	const onSubmit = async (data) => {
		try {
			await dispatch(loginUser(data)).unwrap();
			dispatch(successNoti({ message: "Login successful" }));
			history.push("/");
		} catch (err) {
			dispatch(errorNoti({ message: err.message }));
		}
	};
	const responseGoogle = async (res) => {
		try {
			await dispatch(loginGoogleUser(res)).unwrap();
			dispatch(successNoti({ message: "Login successful" }));
			history.push("/");
		} catch (error) {
			dispatch(errorNoti({ message: error.message }));
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
						<p className="text-[#9098B1]">Sign in to continue</p>
					</div>
					<div className="flex flex-col gap-y-4">
						<div>
							<input
								{...register("email", {
									required: "This is a required infomation!",
								})}
								type="text"
								placeholder="Email"
								className="bg-[#f5f5f5] px-4 py-3 w-full dark:text-whitee2 dark:bg-gray3a border-2 focus:border-2 focus:border-blue33 border-transparent rounded-md outline-none transition-all"
							/>
							<ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
						</div>
						<div>
							<input
								{...register("password", {
									required: "This is a required infomation!",
								})}
								type="password"
								placeholder="Password"
								className="bg-[#f5f5f5] px-4 py-3 w-full dark:text-whitee2 dark:bg-gray3a border-2 focus:border-2 focus:border-blue33 border-transparent rounded-md outline-none transition-all"
							/>
							<ErrorMessage>{errors.password && errors.password.message}</ErrorMessage>
						</div>
					</div>
					<button className="items-center mt-4 py-4 text-white dark:text-whitee2 dark:bg-black1f bg-blue33 rounded-md">
						Sign In
					</button>

					<div className="mt-2 mx-auto">
						<GoogleLogin
							className="btn-google-login"
							clientId="832510266743-jbd97cm287fcr21v7ctu2rl5afit92s0.apps.googleusercontent.com"
							render={(renderProps) => (
								<button
									className="p-2 text-blue-500 dark:bg-whitee2 border border-black12 rounded-md"
									type="button"
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
								>
									<LogoGoogle color={"#black"} height="40px" width="40px" />
								</button>
							)}
							onSuccess={responseGoogle}
							onFailure={(err) => {
								console.log(err);
							}}
							cookiePolicy={"single_host_origin"}
						/>
						{/* <GoogleLogout
							clientId="832510266743-jbd97cm287fcr21v7ctu2rl5afit92s0.apps.googleusercontent.com"
							buttonText="Logout"
							onLogoutSuccess={(e) => {
								console.log(e);
							}}
						></GoogleLogout> */}
					</div>
					<Link to="/register" className="my-2 text-center text-blue33 font-bold">
						Forgot Password
					</Link>
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
