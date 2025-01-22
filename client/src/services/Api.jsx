import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api" });

const authHeader = (req, res) => {
  const jwtToken = localStorage.getItem("jwtToken");
  if (!jwtToken) {
    alert("Token not found");
    return {};
  }
  return { Authorization: `Bearer ${jwtToken}` };
};

export const registerUser = (userData) => {
  API.post("/v1/auth/register", userData);
};

export const signinUser = async (userData) => {
  try {
    const response = await API.post("/v1/auth/signin", userData);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error);
  }
};

export const signOutUser = async () => {
  try {
    const response = await API.post(
      "/v1/auth/signout",
      {},
      { headers: authHeader() }
    );
    console.log("Sign-out response:", response.data);
    return response.data;
  } catch (error) {
    console.error("from api ", error.response?.data || error);
    throw error;
  }
};
