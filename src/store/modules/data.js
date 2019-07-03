const user = {
  state: {
    data: null
  },

  mutations: {
    SET_DATA: (state, data) => {
      state.data = data;
    }
  },

  actions: {
    // 获取用户信息
    changeData ({commit}, values) {
      commit('SET_DATA', values);
    }
  }
};

export default user;
