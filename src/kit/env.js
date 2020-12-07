require("dotenv").config();

const getEnvValue = (key) => {
  const updatedKey = `REACT_APP_${key}`
  const value = process.env[updatedKey];
  if(!value){
    console.log(key, 'is missing in evn')
    throw new Error('Environment varibale not found')
  }
  return value;
}

export default getEnvValue;