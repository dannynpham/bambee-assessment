<template>
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
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'TheTasksActions',
  data: () => ({
    search: '',
    filters: [],
  }),
  computed: {
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
    ...mapState([
      'tasks',
      'tasksSortBy',
      'tasksSortByAsc',
    ]),
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
      this.$emit('filterTasks', { filters: this.filters, search: this.search });
    },
    search() {
      this.$emit('filterTasks', { filters: this.filters, search: this.search });
    },
    tasksSortBy() {
      this.$emit('filterTasks', { filters: this.filters, search: this.search });
    },
    tasksSortByAsc() {
      this.$emit('filterTasks', { filters: this.filters, search: this.search });
    },
  },
  methods: {
    toggleAsc() {
      this.setTasksSortByAsc(!this.tasksSortByAsc);
    },
    ...mapMutations([
      'setTasks',
      'setTasksSortBy',
      'setTasksSortByAsc',
    ]),
  },
};
</script>
