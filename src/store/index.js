import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    tasksSortBy: 'dueDate',
  },
  mutations: {
    setTasks(state, value) {
      state.tasks = value;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      commit('setTasks', data);
    },
  },
  modules: {
  },
});
