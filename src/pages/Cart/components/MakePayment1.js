import { useForm } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";
export default function MakePayment1() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "all" });
	const onSubmit = (data) => {
		console.log(errors.phone);
		console.log(data);
	};
	return (
		<form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<input
					{...register("fullName", {
						required: "This is a required infomation!",
						maxLength: {
							value: 20,
							message: "Max length is 20 characters!",
						},
					})}
					className="bg-[#f5f5f5] px-3 py-2 w-full rounded-md outline-none"
					type="text"
					placeholder="Full Name"
				/>
				<ErrorMessage>{errors.fullName && errors.fullName.message}</ErrorMessage>
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
					className="bg-[#f5f5f5] px-3 py-2 w-full rounded-md outline-none"
					// type="email"
					placeholder="Email Address"
				/>
				<ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
			</div>
			<div>
				<input
					{...register("phone", {
						required: "This is a required infomation!",
						pattern: {
							value: /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g,
							message: "Invalid phone number!",
						},
					})}
					className="bg-[#f5f5f5] px-3 py-2 w-full rounded-md outline-none"
					type="text"
					placeholder="Mobile Phone"
				/>
				<ErrorMessage>{errors.phone && errors.phone.message}</ErrorMessage>
			</div>
			<div>
				<input
					{...register("address", {
						required: "This is a required infomation!",
					})}
					className="bg-[#f5f5f5] px-3 py-2 w-full rounded-md outline-none"
					type="text"
					placeholder="Address for Delivery"
				/>
				<ErrorMessage>{errors.address && errors.address.message}</ErrorMessage>
			</div>
			<div>
				<p className="text-[#40BFFF] leading-[23px] mb-3 font-semibold">Method of Payment</p>
				<select
					className="bg-[#f5f5f5] pl-2 w-full h-10 rounded-md outline-none"
					{...register("payment")}
				>
					<option value="1">Credit Card Or Debit</option>
					<option value="2">Paypal</option>
					<option value="3">COD</option>
				</select>
			</div>
			<button className="py-3 w-full text-white bg-blue33 rounded-md">Go To Payment</button>
		</form>
	);
}
