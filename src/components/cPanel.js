import "../../src/styles/config-panel.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export const ConfigPanel = ({
	title,
	description,
	minAmount,
	maxAmount,
	localeSeleclected,
	amountEntered,
	currency,
}) => {
	const [isClick, setClick] = useState(false);

	if (isClick) return <Redirect to="/checkout" />;
	return (
		<div className="cPanel">
			<div className="container">
				<div className="row">
					<div className="col-50">
						<Button className="title">PAY BY INSTALLMENT</Button>
					</div>
					<div className="col-50">
						<label>{description}</label>
					</div>
				</div>
				<div className="row">
					<div className="col-50">
						<Button className="primary">Minimum Amount</Button>
					</div>
					<div className="col-50">
						<label data-testid="currency">
							{minAmount} {currency}
						</label>
					</div>
				</div>
				<div className="row">
					<div className="col-50">
						<Button className="primary">Maximum Amount</Button>
					</div>
					<div className="col-50">
						<label>
							{maxAmount} {currency}
						</label>
					</div>
				</div>
			</div>
			<div>
				<Button className="button" onClick={() => setClick(!isClick)}>
					<span>Checkout Order</span>
				</Button>
			</div>
		</div>
	);
};

export default ConfigPanel;
