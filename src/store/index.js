import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    tasksSortBy: 'dueDate',
    tasksSortByAsc: true,
  },
  getters: {
    sortedTasks(state) {
      const { tasks, tasksSortBy, tasksSortByAsc } = state;
      if (tasksSortBy === 'dueDate') {
        return tasks.sort((a, b) => {
          if (tasksSortByAsc) [a, b] = [b, a];
          if (moment(a.dueDate).isSameOrBefore(b.dueDate)) return 1;
          if (moment(a.dueDate).isSameOrAfter(b.dueDate)) return -1;
          return 0;
        });
      } if (['title', 'description'].includes(tasksSortBy)) {
        return tasks.sort((a, b) => {
          if (tasksSortByAsc) [a, b] = [b, a];
          if (a[tasksSortBy].toLowerCase() < b[tasksSortBy].toLowerCase()) return 1;
          if (a[tasksSortBy].toLowerCase() > b[tasksSortBy].toLowerCase()) return -1;
          return 0;
        });
      }
      return tasks;
    },
  },
  mutations: {
    setTasks(state, value) {
      state.tasks = value;
    },
    setTasksSortBy(state, value) {
      state.tasksSortBy = value;
    },
    setTasksSortByAsc(state, value) {
      state.tasksSortByAsc = value;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      commit('setTasks', data);
    },
  },
  modules: {},
});
