<template>
  <article class="task-card my-2 mr-3 bg-secondary-tint-5 rounded-2xl p-5">
    <CheckboxInput
      class="task-card-checkbox self-center justify-self-end"
      :value="task.isCompleted"
    />
    <TypeHeading
      class="task-card-title self-center xl:text-4xl"
      :variant="$constants.Typography.Heading.HEADLINE"
    >
      {{ task.title }}
    </TypeHeading>
    <TypeHeading
      class="task-card-date self-center justify-self-center xl:text-2xl"
      :variant="$constants.Typography.Heading.SUBTITLE"
      :weight="$constants.Typography.Weights.REGULAR"
    >
      {{ readableDate(task.dueDate) }}
    </TypeHeading>
    <div class="task-card-description xl:text-xl">
      {{ task.description }}
    </div>
  </article>
</template>

<script>
import moment from 'moment';

export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    readableDate(date) {
      const readableDay = {
        '-1': 'Yesterday',
        0: 'Today',
        1: 'Tomorrow',
      };
      const dayDiff = moment(date).diff(moment(), 'days');
      const day = readableDay[dayDiff];
      if (day) {
        return day;
      }
      return moment(date).format('l');
    },
  },
};
</script>
