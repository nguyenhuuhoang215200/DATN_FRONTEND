import axios from "../axios";
const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsers = (id) => {
  return axios.get(`/api/get-all-user?id=${id}`);
};
const createNewUserService = (dataCreateUser) => {
  return axios.post("/api/create-user", dataCreateUser);
};
export default {
  handleLogin,
  getAllUsers,
  createNewUserService,
};
