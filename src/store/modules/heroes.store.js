import { getHeroList, postHeroList, deleteHeroItem } from "@/api/heroes.api";
import { getTypeList  } from "../../api/types.api";
export default {
  state: {
    heroList: [],
    heroTypeLists: [],
    totalCount: 0,
  },
  getters: {
    heroList(state) {
      return state.heroList;
    },
    heroTypeLists(state) {
      return state.heroTypeLists;
    },
    totalCount(state) {
      return state.totalCount;
    }
  },

  mutations: {
    setHeroList(state, payload) {
      state.heroList = payload;
    },
    setHeroTypeLists(state, payload) {
      state.heroTypeLists = payload
    },
    setTotalCount(state, payload) {
      state.totalCount = payload
    }
  },

  actions: {
    async fetchHeroList({ commit }, payload) {
      const response = await getHeroList(payload);
      commit("setHeroList", response.data.data);
      commit("setTotalCount", response.data.totalCount);
    },
    async loadMoreHeroList({ commit, getters }, payload) {
      const response = await getHeroList(payload);
      let heroList = getters.heroList
      commit("setHeroList", heroList.concat(response.data.data));
    },
    async postHeroList({commit, getters}, payload) {
      const response = await postHeroList(payload)
    },
    async fetchTypeList({commit}, payload) {
      const response = await getTypeList(payload)
      commit("setHeroTypeLists", response.data)
    },
    async removeHeroItem({commit}, payload) {
      await deleteHeroItem(payload)
    }
  },
};
