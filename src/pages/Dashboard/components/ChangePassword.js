import { ErrorMessage } from "pages/Cart/components/ErrorMessage";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { changePasswordUser } from "reducers/asyncThunk/userAsyncThunk";
import { errorNoti, successNoti } from "reducers/notiReducer";

export default function ChangePassword() {
	const dispatch = useDispatch();
	const history = useHistory();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({ mode: "all" });
	const onSubmit = async (data) => {
		try {
			delete data.rePassword;
			const response = await dispatch(changePasswordUser(data)).unwrap();
			dispatch(successNoti({ message: response.message }));
			history.push("/dashboard/order-info");
		} catch (err) {
			dispatch(errorNoti({ message: err.message }));
		}
	};
	return (
		<form
			className="max-w-[500px] flex flex-col justify-center mx-auto w-full"
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h3 className="mb-4 text-center dark:text-whitee2 text-2xl font-bold">Change password</h3>
			<div className="flex flex-col gap-y-4">
				<div>
					<input
						{...register("oldPassword", {
							required: "This is a required infomation!",
						})}
						type="text"
						placeholder="Old Password"
						className="bg-[#f5f5f5] px-4 py-3 w-full dark:text-whitee2 dark:bg-gray24 border-2 focus:border-2 focus:border-blue33 border-transparent rounded-md outline-none transition-all"
					/>
					<ErrorMessage>{errors.oldPassword && errors.oldPassword.message}</ErrorMessage>
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
						placeholder="New password"
						className="bg-[#f5f5f5] px-4 py-3 w-full dark:text-whitee2 dark:bg-gray24 border-2 focus:border-2 focus:border-blue33 border-transparent rounded-md outline-none transition-all"
					/>
					<ErrorMessage>{errors.password && errors.password.message}</ErrorMessage>
				</div>
				<div>
					<input
						{...register("rePassword", {
							required: "This is a required infomation!",
							validate: {
								matchesPreviousPassword: (value) => {
									const { password } = getValues();
									return password === value || "Passwords should not match!";
								},
							},
						})}
						type="password"
						placeholder="Rewrite new password"
						className="bg-[#f5f5f5] px-4 py-3 w-full dark:text-whitee2 dark:bg-gray24 border-2 focus:border-2 focus:border-blue33 border-transparent rounded-md outline-none transition-all"
					/>
					<ErrorMessage>{errors.rePassword && errors.rePassword.message}</ErrorMessage>
				</div>
			</div>
			<button className="items-center mt-4 py-4 text-white dark:text-whitee2 dark:bg-black1f bg-blue33 rounded-md">
				Submit
			</button>
		</form>
	);
}
