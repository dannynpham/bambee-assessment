<template>
  <ModalDialog
    class="the-task-dialog"
    :size="$constants.Modal.Sizes.GIANT"
    @close="$emit('close')"
  >
    <template #header>
      <TypeDisplay :variant="$constants.Typography.Display.PETA">
        Task
      </TypeDisplay>
    </template>
    <div class="modal-body">
      <TypeHeading>Title</TypeHeading>
      <TextInput
        v-model="task.title"
        class="w-full"
        :invalid="isTitleInvalid"
        :show-reset="true"
        :size="$constants.Form.Sizes.LARGE"
      />
      <TypeHeading>Description</TypeHeading>
      <TextareaInput
        v-model="task.description"
        class="w-full"
        :invalid="isDescriptionInvalid"
        :size="$constants.Form.Sizes.LARGE"
      />
      <TypeHeading>Due Date</TypeHeading>
      <DateInput
        v-model="task.dueDate"
        class="w-full"
        :invalid="isDueDateInvalid"
        :size="$constants.Form.Sizes.LARGE"
      />
      <TypeHeading>Status</TypeHeading>
      <CheckboxInput
        v-show="selectedTask.uuid"
        v-model="task.isCompleted"
        label-position="left"
      />
    </div>
    <template #subfooter>
      <div class="w-full flex justify-between">
        <BaseButton
          :variant="$constants.Button.Variants.TERTIARY"
          :size="$constants.Button.Sizes.LARGE"
          @click="deleteTaskListener"
        >
          Delete
        </BaseButton>
        <BaseButton
          :variant="$constants.Button.Variants.SECONDARY"
          :size="$constants.Button.Sizes.LARGE"
          @click="saveTask"
        >
          Save
        </BaseButton>
      </div>
    </template>
  </ModalDialog>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'TheTaskDialog',
  props: {
    selectedTask: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isTitleInvalid: false,
    isDescriptionInvalid: false,
    isDueDateInvalid: false,
    task: {
      uuid: '',
      title: '',
      description: '',
      dueDate: '',
      isCompleted: false,
    },
  }),
  computed: {
    isTaskValid() {
      return !this.isTitleInvalid
      && !this.isDescriptionInvalid
      && !this.isDueDateInvalid;
    },
  },
  watch: {
    selectedTask: {
      handler() {
        this.task = { ...this.selectedTask };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async saveTask() {
      this.isTitleInvalid = !this.task.title;
      this.isDescriptionInvalid = !this.task.description;
      this.isDueDateInvalid = !this.task.dueDate;

      if (this.isTaskValid) {
        if (this.task.uuid) {
          await this.updateTask(this.task);
          this.setAlertMessage('Updated Task Successfully');
        } else {
          await this.createTask(this.task);
          this.setAlertMessage('Created Task Successfully');
        }
        this.$emit('close');
      }
    },
    async deleteTaskListener() {
      await this.deleteTask(this.task);
      this.setAlertMessage('Deleted Task Successfully');
      this.$emit('close');
    },
    ...mapActions([
      'updateTask',
      'deleteTask',
      'createTask',
    ]),
    ...mapMutations(['setAlertMessage']),
  },
};
</script>

<style lang="scss" scoped>
.the-task-dialog {
  .modal-body {
    display: grid;
    grid-template-columns: 30% 70%;
    gap: 20px;
    align-items: center;
    justify-items: start;
    width: 100%;
  }
}
</style>
