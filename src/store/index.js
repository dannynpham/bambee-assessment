import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import faker from 'faker';

Vue.use(Vuex);

const fakeApiDelay = () => new Promise((res) => setTimeout(res, 1000));

export default new Vuex.Store({
  state: {
    tasks: [],
    tasksSortBy: 'dueDate',
    tasksSortByAsc: true,
    alertMessage: '',
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
    setCompleteTask(state, task) {
      const idx = state.tasks.findIndex(({ uuid }) => uuid === task.uuid);
      state.tasks.splice(idx, 1, task);
    },
    deleteTask(state, task) {
      const idx = state.tasks.findIndex(({ uuid }) => uuid === task.uuid);
      state.tasks.splice(idx, 1);
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    setAlertMessage(state, value) {
      state.alertMessage = value;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      // Add trycatch and error logging
      const tasks = Array.from({ length: 30 }).map(() => ({
        uuid: faker.fake('{{random.uuid}}'),
        title: faker.fake('{{lorem.sentence}}'),
        description: faker.fake('{{lorem.paragraph}}'),
        isCompleted: !!Math.round(Math.random()),
        dueDate: moment(faker.date.between('2021-01-22', '2021-02-03')).toISOString(),
      }));
      // const res = await fetch('http://localhost:5000/tasks');
      // const data = await res.json();
      await fakeApiDelay();
      commit('setTasks', tasks);
    },
    async updateTask({ commit }, task) {
      // Add trycatch and error logging
      // const res = await fetch('http://localhost:5000/tasks/${task.uuid}', {
      //   method: 'PUT',
      //   body: task,
      // });
      // const data = await res.json();
      await fakeApiDelay();
      commit('setCompleteTask', task);
    },
    async deleteTask({ commit }, task) {
      // Add trycatch and error logging
      // const res = await fetch('http://localhost:5000/tasks/${task.uuid}', {
      //   method: 'DELETE',
      // });
      // const data = await res.json();
      await fakeApiDelay();
      commit('deleteTask', task);
    },
    async createTask({ commit }, task) {
      // Add trycatch and error logging
      // const res = await fetch('http://localhost:5000/tasks', {
      //   method: 'POST',
      //   body: task,
      // });
      // const data = await res.json();
      task.uuid = faker.fake('{{random.uuid}}');
      await fakeApiDelay();
      commit('addTask', task);
    },
  },
  modules: {},
});
