import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
  },
  getters: {
    getUserInfo: state => {
      return state.user;
    }
  },
  mutations: {
    registerUser(state, loggedInUser) {
      return state.user = loggedInUser;
    },
    logOutUser(state) {
      return state.user = null;
    },
  },
  actions: {
    registerUser(state, loggedInUser) {
      state.commit('registerUser', loggedInUser);
    },
    logOutUser(state) {
      state.commit('logOutUser');
    }
  },
  modules: {
  }
})
