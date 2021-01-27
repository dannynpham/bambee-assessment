<template>
  <div class="tasks h-screen w-screen flex justify-center bg-primary-tint-1">
    <div class="flex flex-col w-full">
      <TypeDisplay
        class="mt-8 mb-14 m-auto text-white"
        :variant="$constants.Typography.Display.PETA"
      >
        Task Manager
      </TypeDisplay>
      <div class="mx-auto my-1 w-full max-w-screen-2xl flex justify-between">
        <TextInput
          v-model="search"
          class="w-1/4"
          placeholder="Search"
          post-icon="search"
        />
        <div class="w-2/5 flex items-center">
          <SelectInput
            v-model="filters"
            class="w-3/4 mr-3"
            placeholder="Filters"
            :options="filterOptions"
            multiple
          />
          <SelectInput
            class="w-2/5 mr-3"
            placeholder="Sort By"
            :options="sortOptions"
            :value="tasksSortBy"
            :show-reset="false"
            @input="setTasksSortBy"
          />
          <ToolTip :alt="tasksSortByAsc ? 'Ascending' : 'Descending'">
            <template #trigger>
              <IconButton
                icon="arrowLeft"
                :style="{ transform: `rotate(${tasksSortByAsc ? -90 : 90}deg)` }"
                :variant="$constants.Button.Variants.INVERTED"
                @click="toggleAsc"
              />
            </template>
          </ToolTip>
        </div>
      </div>
      <div
        ref="tasksContainer"
        class="tasks-container has-bottom-fade mx-auto max-w-screen-2xl overflow-y-auto relative"
        @scroll="tasksScroll"
      >
        <transition-group
          name="list"
          class="grid grid-flow-row auto-rows-fr"
        >
          <TaskCard
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
          />
        </transition-group>
        <ToolTip alt="Scroll to the top">
          <template #trigger>
            <IconButton
              v-show="scrolledFromTop"
              id="scroll-top"
              icon="arrowLeft"
              style="transform: rotate(90deg)"
              :variant="$constants.Button.Variants.SECONDARY"
              :size="$constants.Button.Sizes.GIANT"
              @click="scrollTasksToTop"
            />
          </template>
        </ToolTip>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard.vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import moment from 'moment';

export default {
  name: 'Tasks',
  components: { TaskCard },
  data: () => ({
    search: '',
    scrolledFromTop: false,
    filters: [],
  }),
  computed: {
    ...mapState([
      'tasksSortBy',
      'tasksSortByAsc',
    ]),
    ...mapGetters(['sortedTasks']),
    sortOptions() {
      // Place in constants file
      return [{
        label: 'Due Date',
        value: 'dueDate',
      }, {
        label: 'Title',
        value: 'title',
      }, {
        label: 'Description',
        value: 'description',
      }];
    },
    filterOptions() {
      // Place in constants file
      return [{
        label: 'Today',
        value: 'Today',
      }, {
        label: 'After Today',
        value: 'afterToday',
      }, {
        label: 'Before Today',
        value: 'beforeToday',
      }, {
        label: 'Completed',
        value: 'Completed',
      }, {
        label: 'Not Completed',
        value: 'notCompleted',
      }];
    },
    filteredTasks() {
      let tasks = [];
      if (!this.search) {
        tasks = [...this.sortedTasks];
      } else {
        tasks = this.sortedTasks.filter((task) => JSON.stringify(task).toLowerCase().includes(this.search));
      }
      return this.filterTasks(tasks);
    },
  },
  watch: {
    filters() {
      // Removes conflicting filters
      if (this.filters.length > 1) {
        const lastSelection = this.filters[this.filters.length - 1];
        const isTodayFilter = lastSelection?.includes('Today');
        const isCompletedFilter = lastSelection?.includes('Completed');
        const filtersExcludingLast = this.filters.slice(0, this.filters.length - 1);
        if (isTodayFilter) {
          const idx = filtersExcludingLast.findIndex((val) => val.includes('Today'));
          if (idx !== -1) {
            this.filters.splice(idx, 1);
          }
        } else if (isCompletedFilter) {
          const idx = filtersExcludingLast.findIndex((val) => val.includes('Completed'));
          if (idx !== -1) {
            this.filters.splice(idx, 1);
          }
        }
      }
    },
  },
  beforeMount() {
    console.log(this);
    this.$store.dispatch('fetchTasks');
  },
  methods: {
    filterTasks(tasks) {
      const filtersToApply = [];
      // Place in constants file
      this.filters.forEach((filter) => {
        if (filter.includes('Today')) {
          const today = moment();
          if (filter === 'Today') {
            filtersToApply.push((task) => moment(task.dueDate).isSame(today, 'day'));
          } else if (filter === 'beforeToday') {
            filtersToApply.push((task) => moment(task.dueDate).isBefore(today, 'day'));
          } else if (filter === 'afterToday') {
            filtersToApply.push((task) => moment(task.dueDate).isAfter(today, 'day'));
          }
        } else if (filter.includes('Completed')) {
          if (filter === 'Completed') {
            filtersToApply.push((task) => task.isCompleted);
          } else if (filter === 'notCompleted') {
            filtersToApply.push((task) => !task.isCompleted);
          }
        }
      });
      return tasks.filter((task) => filtersToApply.every((filterFn) => filterFn(task)));
    },
    toggleAsc() {
      this.setTasksSortByAsc(!this.tasksSortByAsc);
    },
    scrollTasksToTop() {
      this.$refs.tasksContainer.scrollTo({ top: 0, behavior: 'smooth' });
    },
    tasksScroll({ target }) {
      const { scrollTop, scrollHeight, clientHeight } = target;
      // Add debouncer
      if (scrollTop) {
        target.classList.add('has-top-fade');
        this.scrolledFromTop = true;
      } else {
        target.classList.remove('has-top-fade');
        this.scrolledFromTop = false;
      }
      if ((clientHeight + scrollTop) >= scrollHeight) {
        target.classList.remove('has-bottom-fade');
      } else {
        target.classList.add('has-bottom-fade');
      }
    },
    ...mapMutations([
      'setTasksSortBy',
      'setTasksSortByAsc',
    ]),
  },
};
</script>

<style lang="scss">
.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to {
  opacity: 0;
}

.tasks {
  .tasks-container {
    &::before,
    &::after {
        position: fixed;
        width: 100%;
        height: 3%;
        content: '';
    }
    &.has-top-fade::before {
      top: 0;
      margin: 180px 0;
      background: linear-gradient(to bottom, #6b4392 0%, rgba(251, 251, 251, 0) 100%);
    }
    &.has-bottom-fade::after {
      bottom: 0;
      background: linear-gradient(to top, #6b4392 0%, rgba(251, 251, 251, 0) 100%);
    }
    .task-card {
      display: grid;
      grid-template-areas:
        "task-card-checkbox task-card-title task-card-date"
        ". task-card-description .";
      grid-template-rows: 0.5fr 1.5fr;
      grid-template-columns: 0.15fr 2.6fr 0.25fr;
      gap: 15px;
      .task-card-checkbox { grid-area: task-card-checkbox; }

      .task-card-title { grid-area: task-card-title; }

      .task-card-date { grid-area: task-card-date; }

      .task-card-description { grid-area: task-card-description; }
    }
    #scroll-top {
      position: fixed;
      right: 5%;
      bottom: 50px;
    }
  }
}
</style>
