import { PayPalButton } from "react-paypal-button-v2";
export default function Paypal() {
	return (
		<div className="">
			<button className="block mb-4 mx-auto px-6 py-4 text-center text-white bg-red-500 border rounded-xl">
				Checkout
			</button>
			<PayPalButton
				options={{
					clientId: process.env.REACT_APP_PRODUCTION_CLIENT_ID,
				}}
				shippingPreference="NO_SHIPPING"
				amount="1"
				onSuccess={(details, data) => {
					alert("Transaction completed by " + details.payer.name.given_name);
					// OPTIONAL: Call your server to save the transaction
					return fetch("/paypal-transaction-complete", {
						method: "post",
						body: JSON.stringify({
							orderId: data.orderID,
						}),
					});
				}}
			/>
		</div>
	);
}
