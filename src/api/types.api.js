import api from "./api";

const getTypeList = (payload) => api.get(`/types`, payload);

export { getTypeList };
