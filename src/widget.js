import "../src/styles/widget.css";
import authCreate from './auth/auth';
import { ConfigPanel } from "./components/cPanel";
import { useState, useEffect } from "react";

function Widget() {
	const [configs, fetchConfigs] = useState([]);
	const [isLoading, setLoader] = useState(true);
	useEffect(() => {
		return fetchConfig();
		async function fetchConfig() {
			const configurations = await authCreate.get(
				"/fetchConfigs",
			);
			fetchConfigs(configurations.data);
			setLoader(false);
		}
	}, []);
	if (isLoading) {
		return <div className="spinner">Loading....</div>;
	}
	return (
		<div className="widget">
			<ConfigPanel
				minAmount={configs.minimumAmount.amount}
				maxAmount={configs.maximumAmount.amount}
				title={configs.type}
				currency={configs.minimumAmount.currency}
				description={configs.description}
			/>
		</div>
	);
}

export default Widget;
