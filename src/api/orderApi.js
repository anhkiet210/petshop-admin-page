import axiosClient from "./axiosClient";

const orderApi = {
  getOrderByStatus(status) {
    const url = "/orders/by-status";
    return axiosClient.get(url, { body: { status } });
  },

  getById(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/products";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/orders/${id}`;
    return axiosClient.put(url, data);
  },

  updateStatus(id, status) {
    const url = `/orders/${id}`;
    return axiosClient.put(url, status);
  },

  remove(id) {
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  },
};

export default orderApi;
