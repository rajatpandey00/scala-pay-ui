import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalInfoContextProvider from "./context/GlobalInfoContextProvider";
import CheckoutForm from "./components/user-checkout-form";
import Widget from "./widget";

export const App = () => {
  return (
		<Router>
			<Switch>
				<Route exact path="/">
					<React.StrictMode>
						<GlobalInfoContextProvider>
							<Widget />
						</GlobalInfoContextProvider>
					</React.StrictMode>
				</Route>
				<Route exact path="/checkout">
					<React.StrictMode>
						<CheckoutForm />
					</React.StrictMode>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
