import axiosClient from "./axiosClient";

const userApi = {
  register(data) {
    const url = "/auth/local/register";
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },

  getAllUser() {
    const url = "/users";
    return axiosClient.get(url);
  },

  updateProfile(data) {
    const url = "/users/update-my-info";
    return axiosClient.put(url, data);
  },

  changeAvatar(data) {
    const url = "/users/update-my-avatar";
    return axiosClient.put(url, data);
  },

  changePassword(id, data) {
    const url = `/users/reset-password/${id}`;
    return axiosClient.put(url, data);
  },
};

export default userApi;
