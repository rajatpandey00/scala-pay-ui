import axios from 'axios';
import getEnvValue from '../kit/env';
require("dotenv").config();

const authCreate = axios.create({
	baseURL: "http://localhost:8000",
	headers: {
		Authorization: `Bearer ${getEnvValue("TOKEN")}`,
	},
});
export default authCreate;