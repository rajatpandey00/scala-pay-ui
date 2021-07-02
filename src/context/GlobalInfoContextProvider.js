import React, { useState, createContext, useEffect } from "react";

export const GlobalInfoContext = createContext();

const initialState = {
	name: "Rajat",
	lastName: "Pandey",
	role: "admin",
};

const GlobalInfoContextProvider = (props) => {
	const [info, setInfo] = useState(initialState);

	function updateInfo (props) {
		setInfo({ ...info, ...props })
	}

	useEffect(async () => {}, []);

	return (
		<GlobalInfoContext.Provider value={{info, updateInfo}} displayName="Userinfo">
			{props.children}
		</GlobalInfoContext.Provider>
	);
};

export default GlobalInfoContextProvider;
