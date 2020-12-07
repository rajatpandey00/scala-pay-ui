import "../styles/checkout.css";
import { NavLink, Button } from "react-bootstrap";
import { useState } from "react";
import authCreate from "../auth/auth";

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
		const result = await authCreate.post(
			"/submitOrders",
			details
		);
		setSetCheckout(result.data.checkoutUrl);
	};
	const constructDetials = () => {
		const totalAmount = {
			amount: "40.70",
			currency: "EUR",
		};
		const consumer = {
			phoneNumber: contact,
			givenNames: fName,
			surname: lName,
			email,
		};
		const billing = {
			name: fName + " " + lName,
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
									placeholder="542 W. 15th Street"
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
											placeholder="NSW"
											onChange={(e) => setSuburb(e.target.value)}
										/>
									</div>
									<div className="col-50">
										<label htmlFor="postcode">PostCode</label>
										<input
											type="text"
											id="postcode"
											name="postcode"
											placeholder="10001"
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
			<div className="col-25">
				<div className="container">
					<h4>
						Cart{" "}
						<span className="price" style={{ color: "black" }}>
							<i className="fa fa-shopping-cart"></i> <b>4</b>
						</span>
					</h4>
					<p>
						<NavLink href="#">Product 1</NavLink>{" "}
						<span className="price">$15</span>
					</p>
					<p>
						<NavLink href="#">Product 2</NavLink>{" "}
						<span className="price">$5</span>
					</p>
					<p>
						<NavLink href="#">Product 3</NavLink>{" "}
						<span className="price">$8</span>
					</p>
					<p>
						<NavLink href="#">Product 4</NavLink>{" "}
						<span className="price">$2</span>
					</p>
					<hr />
					<p>
						Total{" "}
						<span className="price" style={{ color: "black" }}>
							<b>$30</b>
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CheckoutForm;

/*
https://staging.api.scalapay.com/v2/orders
Merchant site makes a call to /v2/orders and receives an order-token as well as the redirectUrl to send the customer to Scalapay to authorize the payment


Mandatory:
totalAmount = The total amount for the order
consumer/givenNames = Given names of the consumer
consumer/surname = Surname of the consumer
consumer/email = Email of the consumer
merchant/redirectConfirmUrl = Return URL for an authorized transaction
merchant/redirectCancelUrl = Return URL for an failed transaction
shipping = Consumer shipping details
merchantReference = Unique order reference from the merchant platform
items = List of items associated to the order
name = The name of the item
category = The category of the item
subcategory = Array of subcategories for the item
brand = The brand of the item
gtin = Global Trade Item Number. One of [UPC, EAN, JAN, ISBN, ITF-14]
sku = Stock Keeping Unit code
quantity = Amount of item purchased
price = Item price
Optional:

billing = Consumer billing details
discounts = Discount amount
taxAmount = Tax ammount
shippingAmount Shipping amount
consumer/phoneNumber = Phone number of the consumer
orderExpiryMilliseconds = Time (in milliseconds) the order is valid on the merchant platform

Returns: 200 OK:
token = The Scalapay order UUID to store on the merchant platform
expires = The expiry date of the user authorisation of the purchase, after which v1/orders will need to be recalled
checkoutUrl = The URL to redirect the user to to authorise the purchase
*/

/*

Public
ENVIRONMENT 
LAYOUT 
LANGUAGE 
Example Request
curl --location --request POST 'https://staging.api.scalapay.com/v2/orders' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer qhtfs87hjnc12kkos' \
--header 'Content-Type: application/json' \
--data-raw '{  
    "totalAmount": {  
        "amount": "40.70",
        "currency": "EUR"
    },
    "consumer": {  
        "phoneNumber": "0400000001",
        "givenNames": "Joe",
        "surname": "Consumer",
        "email": "test@scalapay.com"
    },
    "billing": {  
        "name": "Joe Consumer",
        "line1": "Via della Rosa, 23",
        "suburb": "Montelupo Fiorentino",
        "postcode": "50056",
        "countryCode": "IT",
        "phoneNumber": "0400000000"
    },
    "shipping": {  
        "name": "Joe Consumer",
        "line1": "Via della Rosa, 23",
        "suburb": "Montelupo Fiorentino",
        "postcode": "50056",
        "countryCode": "IT",
        "phoneNumber": "0400000000"
    },
    "items":[  
         {
             "name": "T-Shirt",
             "category": "clothes",
             "subcategory": ["shirt", "long-sleeve"],
             "brand": "TopChoice",
             "gtin": "123458791330",
             "sku": "12341234",
             "quantity": 1,
             "price": {
                 "amount": "10.00",
                 "currency": "EUR"
             }
         },
         {
             "name": "Jeans",
             "category": "clothes",
             "subcategory": ["pants", "jeans"],
             "brand": "TopChoice",
             "gtin": "123458722222",
             "sku": "12341235",
             "quantity": 1,
             "price": {
                 "amount": "20.00",
                 "currency": "EUR"
             }
         }
    ],
    "discounts": [
        {
            "displayName": "10% Off",
            "amount": {
                "amount": "3.00",
                "currency": "EUR"
            }
        }
    ],
    "merchant": {
        "redirectConfirmUrl": "https://staging.portal.scalapay.com/success-url",
        "redirectCancelUrl": "https://staging.portal.scalapay.com/failure-url"
    },
    "merchantReference": "merchantOrder-1234",
     "taxAmount": {  
        "amount": "3.70",
        "currency": "EUR"
     },
     "shippingAmount": {  
         "amount": "10.00",
         "currency": "EUR"
    },
    "orderExpiryMilliseconds": 6000000
  }'
Scalapay API Documentation



API Documentation
This is a basic description of how a Scalapay integration via our APIs would look from your site.

Environments	URL
Production:	https://api.scalapay.com
Staging:	https://staging.api.scalapay.com
Functional Order Flow
Determine if your checkout should display Scalapay as a payment option.
Your site calls the /v2/orders/ endpoint to initiate the Scalapay payment process.
Then your site exectues the redirect to the Scalapay checkout page
On the successful completion of the Scalapay pre-approval process, Scalapay will redirect back to the provided redirectConfirmUrl appending the token and a status of ‘SUCCESS’ OR 'FAILED’ as an HTTP query parameter.
Whenever your e-commerce platform creates the order, the site calls the /v2/payments/capture endpoint to capture the payment and finalise the order.
ScalaPay finalises the consumers payment and responds with a success or a failure.
In order to acheive optimal success of installing Scalapay on your site then follow our Scalapay Installation Guidelines

Scalapay Widget
The Scalapay Widget is designed to provide the quickest intergration on the product and cart page of your online store.

Simply add the following lines of code to the bottom/footer of your product or cart HTML page:

<script src="https://cdn.scalapay.com/js/scalapay-widget/webcomponents-bundle.js"></script>
<script src="https://cdn.scalapay.com/js/scalapay-widget/scalapay-widget.js"></script>
Then place the widget in the desired location in the HTML of the product and cart page:

<div>
    <scalapay-widget amount="200"></scalapay-widget>
</div>
For further instructions and configuration items please visit the Scalapay Widget page

API
GET v2/configurations 
https://staging.api.scalapay.com/v1/configurations
[NOTE: this call is deprecated and refers to an old version of Scalapay. Ignore it if you are a new customer.]

Details
AUTHORIZATION

Bearer Token

Tokenqhtfs87hjnc12kkos
HEADERS
Acceptapplication/json
Content-Typeapplication/json

Example Request
v2/configurations Example
curl --location --request GET 'https://staging.api.scalapay.com/v2/configurations' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer qhtfs87hjnc12kkos'
Example Response
200 OK
Body Headers (1)
{
    "type": "PAY_BY_INSTALLMENT",
    "description": "'Pay over time'",
    "minimumAmount": {
        "amount": "5.00",
        "currency": "EUR"
    },
    "maximumAmount": {
        "amount": "300.00",
        "currency": "EUR"
    },
    "numberOfPayments": "3",
    
}
POST v2/orders 
https://staging.api.scalapay.com/v2/orders
Merchant site makes a call to /v2/orders and receives an order-token as well as the redirectUrl to send the customer to Scalapay to authorize the payment


Mandatory:
totalAmount = The total amount for the order
consumer/givenNames = Given names of the consumer
consumer/surname = Surname of the consumer
consumer/email = Email of the consumer
merchant/redirectConfirmUrl = Return URL for an authorized transaction
merchant/redirectCancelUrl = Return URL for an failed transaction
shipping = Consumer shipping details
merchantReference = Unique order reference from the merchant platform
items = List of items associated to the order
name = The name of the item
category = The category of the item
subcategory = Array of subcategories for the item
brand = The brand of the item
gtin = Global Trade Item Number. One of [UPC, EAN, JAN, ISBN, ITF-14]
sku = Stock Keeping Unit code
quantity = Amount of item purchased
price = Item price
Optional:

billing = Consumer billing details
discounts = Discount amount
taxAmount = Tax ammount
shippingAmount Shipping amount
consumer/phoneNumber = Phone number of the consumer
orderExpiryMilliseconds = Time (in milliseconds) the order is valid on the merchant platform

Returns: 200 OK:
token = The Scalapay order UUID to store on the merchant platform
expires = The expiry date of the user authorisation of the purchase, after which v1/orders will need to be recalled
checkoutUrl = The URL to redirect the user to to authorise the purchase

4xx BAD REQUEST: Check the response 'message' attribute for more information
500 INTERNAL SERVER ERROR

AUTHORIZATION

Bearer Token

Token qhtfs87hjnc12kkos
HEADERS
Acceptapplication/json
Content-Typeapplication/json
BODY raw
{  
    "totalAmount": {  
        "amount": "190.00",
        "currency": "EUR"
    },
    "consumer": {  
        "phoneNumber": "0400000001",
        "givenNames": "Joe",
        "surname": "Consumer",
        "email": "test@scalapay.com"
    },
    "billing": {  
        "name": "Joe Consumer",
        "line1": "Via della Rosa, 58",
        "suburb": "Montelupo Fiorentino",


Example Request
v2/orders Example
curl --location --request POST 'https://staging.api.scalapay.com/v2/orders' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer qhtfs87hjnc12kkos' \
--header 'Content-Type: application/json' \
--data-raw '{  
    "totalAmount": {  
        "amount": "40.70",
        "currency": "EUR"
    },
    "consumer": {  
        "phoneNumber": "0400000001",
        "givenNames": "Joe",
        "surname": "Consumer",
        "email": "test@scalapay.com"
    },
Example Response
200 OK
Body Headers (1)
{
  "token": "D1K210DDQ6",
  "expires": "2019-10-21T23:45:37.086Z",
  "checkoutUrl": "https://staging.portal.scalapay.com/checkout?token=D1K210DDQ6"
}
POST v2/orders/{token} 
https://staging.api.scalapay.com/v2/orders/41K982RQO3
For cases where a merchant is not able to pass the merchantReference in the /v2/orders call then they can subsequently make a call to /v2/orders/{token} with the appropriate merchant reference ID.


Mandatory:
merchantReference = Unique order reference from the merchant platform

Returns: 200 OK:
token = The Scalapay order UUID to store on the merchant platform
merchantReference = The merchant order UUID to store on the Scalapay platform
4xx BAD REQUEST: Check the response 'message' attribute for more information
500 INTERNAL SERVER ERROR

AUTHORIZATION

Bearer Token

Tokenqhtfs87hjnc12kkos
HEADERS
Acceptapplication/json
Content-Typeapplication/json
BODY raw
{  
    "merchantReference": "merchantOrder-1234-updated"
}


Example Request
v2/orders/{order token} Example
curl --location --request POST 'https://staging.api.scalapay.com/v2/orders/D1K210DDQ6' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer qhtfs87hjnc12kkos' \
--header 'Content-Type: application/json' \
--data-raw '{  
    "merchantReference": "merchantOrder-1234-updated"
}'
Example Response
200 OK
Body Headers (1)
{
  "token": "D1K210DDQ6",
  "merchantReference": "merchantOrder-1234-updated"
}
POST v2/payments/capture 
https://staging.api.scalapay.com/v2/payments/capture
Merchant captures the payment by calling /v2/payments/capture and funds are deducted from user account and transferred to merchant account.


Mandatory:
token = The UUID provided by Scalapay in the v2/orders call
Optional:

merchantReference = Unique order reference from the merchant platform

Returns:
200 OK: Check for {status: 'APPROVED'}

4xx BAD REQUEST: Check the response 'message' attribute for more information.
500 INTERNAL SERVER ERROR

AUTHORIZATION

Bearer Token

Tokenqhtfs87hjnc12kkos
HEADERS
Acceptapplication/json
Content-Typeapplication/json
BODY raw
{
    "token": "41K982RQO3",
    "merchantReference": "merchantOrder-1234"
}


Example Request
v2/payments/capture Example
curl --location --request POST 'https://staging.api.scalapay.com/v2/payments/capture' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer qhtfs87hjnc12kkos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "token": "41K982RQO3"
    "merchantReference": "merchantOrder-1234"
}'
Example Response
200 OK
Body Headers (1)
{
  "token": "D1K210DDQ6",
  "status": "APPROVED",
  "totalAmount": {
    "amount": 40.7,
    "currency": "EUR"
  },
  "orderDetails": {
    "items": [
      {
        "sku": "12341234",
        "name": "T-Shirt",
        "price": {
          "amount": "10.00",
          "currency": "EUR"
GET v2/payments/{token} 
https://staging.api.scalapay.com/v1/payments/41K982RQO3
Check the status of a payment

AUTHORIZATION

Bearer Token

Tokenqhtfs87hjnc12kkos
HEADERS
Acceptapplication/json
Content-Typeapplication/json

Example Request
v1/payments/{order token} Example
curl --location --request GET 'https://staging.api.scalapay.com/v1/payments/D1K210DDQ6' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer qhtfs87hjnc12kkos' \
--header 'Content-Type: application/json'
Example Response
200 OK
Body Headers (1)
{
  "token": "D1K210DDQ6",
  "created": "2019-10-21T22:45:37.000Z",
  "status": "charged",
  "totalAmount": {
    "amount": 40.7,
    "currency": "EUR"
  },
  "orderDetails": {
    "items": [
      {
        "sku": "12341234",
        "name": "T-Shirt",
        "price": {
          "amount": "10.00",
POST v2/payments/{token}/refund 
https://staging.api.scalapay.com/v2/payments/41K982RQO3/refund
Merchant is able to refund a payment by calling /v2/payments/{token}/refund. The funds will be reversed from the merchant account, and then refunded to the customer.


Returns:
200 OK:

token = The Scalapay order UUID to store on the merchant platform
amount = The refund amount
merchantReference = The merchant order UUID to store on the Scalapay platform
refundId = The UUID for the refund
refundedAt = The timestamp of the refund
4xx BAD REQUEST: Check the response 'message' attribute for more information.
500 INTERNAL SERVER ERROR

AUTHORIZATION

Bearer Token

Tokenqhtfs87hjnc12kkos
HEADERS
Acceptapplication/json
Content-Typeapplication/json
BODY raw
{
	"refundAmount": {
		"amount": "1.00",
		"currency": "EUR"
	},
	"merchantReference": "RF127261AD22"
 }


Example Request
v1/payments/{order token}/refund Example
curl --location --request POST 'https://staging.api.scalapay.com/v1/payments/D1K210DDQ6/refund' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer qhtfs87hjnc12kkos' \
--header 'Content-Type: application/json' \
--data-raw '{
	"refundAmount": {
		"amount": "1.00",
		"currency": "EUR"
	},
	"merchantReference": "RF127261AD22"
 }'
Example Response
200 OK
Body Headers (1)
{
  "token": "D1K210DDQ6",
  "amount": {
    "amount": "1.00",
    "currency": "EUR"
  },
  "merchantReference": "RF127261AD22",
  "refundId": "trr_1FW9i7FHjEtCWkTsPXezGpLL",
  "refundedAt": "2019-10-21T22:50:47.016Z"
}
SCALAPAY API DOCUMENTATION

Introduction
API Documentation
Scalapay Widget
API
GET
v2/configurations
POST
v2/orders
POST
v2/orders/{token}
POST
v2/payments/capture
GET
v2/payments/{token}
POST
v2/payments/{token}/refund

*/
