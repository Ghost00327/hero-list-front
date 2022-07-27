import api from "./api";

const getHeroList = (payload) => api.get(`/heroes?skip=${payload.skip}&first=${payload.first}`)
const postHeroList = (payload) => api.post(`/heroes`, payload)
const getHeroListRandom = () => api.get(`/heroes/randoms`)
const deleteHeroItem = (payload) => api.delete(`/heroes/${payload.id}`)

export { getHeroList, postHeroList, deleteHeroItem }

