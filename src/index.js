import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CheckoutForm from "./components/user-checkout-form";
import "./index.css";
import Widget from "./widget";

ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/">
				<React.StrictMode>
					<Widget />
				</React.StrictMode>
			</Route>
			<Route exact path="/checkout">
				<React.StrictMode>
					<CheckoutForm />
				</React.StrictMode>
			</Route>
		</Switch>
	</Router>,
	document.getElementById("root")
);
