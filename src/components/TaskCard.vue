<template>
  <article class="task-card my-2 mr-3 bg-secondary-tint-5 rounded-3xl p-5">
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
    <div />
    <div class="task-card-description xl:text-xl">
      {{ task.description }}
    </div>
    <IconButton
      class="self-end justify-self-end"
      icon="wrench"
      :size="$constants.Button.Sizes.GIANT"
      :variant="$constants.Button.Variants.INVERTED"
      @click="$emit('openTask', task)"
    />
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

<style lang="scss" scoped>
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
</style>
