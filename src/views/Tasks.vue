<template>
  <div class="tasks h-screen w-screen flex justify-center bg-primary-tint-1">
    <div class="flex flex-col w-full">
      <TypeDisplay
        class="mt-8 mb-14 m-auto text-white"
        :variant="$constants.Typography.Display.PETA"
      >
        Task Manager
      </TypeDisplay>
      <div class="tasks-container mx-auto max-w-screen-2xl overflow-auto relative">
        <article
          v-for="task in tasks"
          :key="task.id"
          class="task-card my-2 bg-primary-tint-5 mx-7 rounded-xl p-5"
        >
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
            {{ task.dueDate }}
          </TypeHeading>
          <div class="task-card-description xl:text-xl">
            {{ task.description }}
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  data: () => ({
    tasks: Array.from({ length: 30 }).map((_val, id) => ({
      id,
      title: 'Take out trash',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      isCompleted: true,
      dueDate: '1/25/2021',
    })),
  }),
  beforeMount() {
    console.log(this.$constants);
  },
};
</script>

<style lang="scss">
.tasks {
  .tasks-container {
    &::after {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 3%;
      content: '';
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
  }
}
</style>
