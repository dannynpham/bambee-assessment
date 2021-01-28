<template>
  <div class="tasks h-screen w-screen flex justify-center bg-primary-tint-1">
    <div class="flex flex-col w-full">
      <TypeDisplay
        class="mt-8 mb-14 m-auto text-white flex items-center"
        :variant="$constants.Typography.Display.PETA"
      >
        Task Manager
        <CounterBadge
          class="ml-5"
          :value="count"
          :size="$constants.Button.Sizes.LARGE"
        />
      </TypeDisplay>
      <TheTasksActions @filterTasks="filterTasks" />
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
            :key="task.uuid"
            :task="task"
            @openTask="openTask"
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
    <TheTaskDialog
      v-if="isTaskDialogVisible"
      :selected-task="selectedTask"
      @close="isTaskDialogVisible = false"
    />
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard.vue';
import TheTasksActions from '@/components/TheTasksActions.vue';
import TheTaskDialog from '@/components/TheTaskDialog.vue';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'Tasks',
  components: { TaskCard, TheTasksActions, TheTaskDialog },
  data: () => ({
    scrolledFromTop: false,
    filteredTasks: [],
    isTaskDialogVisible: false,
    selectedTask: {},
  }),
  computed: {
    count() {
      return this.filteredTasks.length;
    },
    ...mapGetters(['sortedTasks']),
  },
  async beforeMount() {
    console.log(this);
    await this.$store.dispatch('fetchTasks');
    this.filteredTasks = this.sortedTasks;
  },
  methods: {
    filterTasks({ filters, search }) {
      const filtersToApply = [];
      if (search) {
        filtersToApply.push((task) => JSON.stringify(task).toLowerCase().includes(search));
      }
      // Place in constants file
      filters.forEach((filter) => {
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
      this.filteredTasks = this.sortedTasks.filter((task) => filtersToApply.every((filterFn) => filterFn(task)));
    },
    openTask(task) {
      this.selectedTask = task;
      this.isTaskDialogVisible = true;
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
  },
};
</script>

<style lang="scss" scoped>
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
    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }

    .list-enter, .list-leave-to {
      opacity: 0;
    }
    #scroll-top {
      position: fixed;
      right: 5%;
      bottom: 50px;
    }
  }
}
</style>
