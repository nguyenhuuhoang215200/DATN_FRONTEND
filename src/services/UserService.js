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
const deleteUserSerivce = (idUserDelete) => {
  return axios.delete(`/api/delete-user`, {
    data: { id: idUserDelete },
  });
};
const editUserService = (dataEditUser) => {
  return axios.put(`/api/edit-user`, dataEditUser);
};
export default {
  handleLogin,
  getAllUsers,
  createNewUserService,
  deleteUserSerivce,
  editUserService,
};
