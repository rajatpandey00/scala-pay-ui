import "../styles/checkout.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
import authCreate from "../auth/auth";
import Products from "./product-list";

export const CheckoutForm = () => {
	const [fName, setFName] = useState("");
	const [lName, setLName] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [suburb, setSuburb] = useState("");
	const [postcode, setPostCode] = useState("");
	const [details, setDetails] = useState({});
	const [checkout, setSetCheckout] = useState(null);
	const submitOrder = async () => {
		constructDetials();
		const result = await authCreate.post("/submitOrders", details);
		setSetCheckout(result.data.checkoutUrl);
  };
  const getName = () => {
    return `${fName}+' '+${lName}`
  }
	const constructDetials = () => {
		const totalAmount = {
			amount: "40.70", // HARDCODED VALUE
			currency: "EUR",
		};
		const consumer = {
			phoneNumber: contact,
			givenNames: fName,
			surname: lName,
			email,
		};
		const billing = {
			name: getName(),
			line1: address,
			suburb: suburb,
			postcode: postcode,
			countryCode: "IT",
			phoneNumber: contact,
		};
		const merchant = {
			redirectConfirmUrl: "http://localhost:3000",
			redirectCancelUrl: "http://localhost:3000",
		};
		const details = {
			totalAmount,
			consumer,
			billing,
			shipping: billing,
			merchant,
			merchantReference: "merchantOrder-1234",
			items: [
				{
					name: "T-Shirt",
					category: "clothes",
					subcategory: ["shirt", "long-sleeve"],
					brand: "TopChoice",
					gtin: "123458791330",
					sku: "12341234",
					quantity: 1,
					price: {
						amount: "10.00",
						currency: "EUR",
					},
				},
			],
		};
		setDetails(details);
	};
	if (checkout) {
		return (window.location = `${checkout}`);
	}
	return (
		<div className="row">
			<div className="col-75">
				<div className="container">
					<form>
						<div className="row">
							<div className="col-50">
								<h3>Billing Address</h3>
								<label htmlFor="fname">
									<i className="fa fa-user"></i> Given Name
								</label>
								<input
									type="text"
									id="fname"
									name="firstname"
									placeholder="John"
									onChange={(e) => setFName(e.target.value)}
								/>
								<label htmlFor="lname">
									<i className="fa fa-user"></i> SurName
								</label>
								<input
									type="text"
									id="fname"
									name="lastname"
									placeholder="Doe"
									onChange={(e) => setLName(e.target.value)}
								/>
								<label htmlFor="email">
									<i className="fa fa-envelope"></i> Email
								</label>
								<input
									type="text"
									id="email"
									name="email"
									placeholder="abc@example.com"
									onChange={(e) => setEmail(e.target.value)}
								/>
								<label htmlFor="adr">
									<i className="fa fa-address-card-o"></i> Address
								</label>
								<input
									type="text"
									id="address"
									name="address"
									placeholder="Please enter address..."
									onChange={(e) => setAddress(e.target.value)}
								/>
								<label htmlFor="mobile">
									<i className="fa fa-institution"></i> Mobile
								</label>
								<input
									type="text"
									id="mobile"
									name="mobile"
									placeholder="+61-XXXXXXXX"
									onChange={(e) => setContact(e.target.value)}
								/>

								<div className="row">
									<div className="col-50">
										<label htmlFor="suburb">Suburb</label>
										<input
											type="text"
											id="suburb"
											name="suburb"
											onChange={(e) => setSuburb(e.target.value)}
										/>
									</div>
									<div className="col-50">
										<label htmlFor="postcode">PostCode</label>
										<input
											type="text"
											id="postcode"
											name="postcode"
											placeholder="2145"
											onChange={(e) => setPostCode(e.target.value)}
										/>
									</div>
								</div>
							</div>
						</div>
						<Button
							value="Continue to checkout"
							className="btn"
							onClick={() => {
								submitOrder();
							}}
						>
							Submit
						</Button>
					</form>
				</div>
			</div>
			<Products />
		</div>
	);
};

export default CheckoutForm;