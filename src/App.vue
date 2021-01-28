<template>
  <div id="app">
    <transition
      name="component-fade"
      mode="out-in"
    >
      <router-view />
    </transition>
    <AlertBar
      v-show="isAlertVisible"
      id="alert-bar"
      icon="alertTriangle"
      :variant="$constants.Alert.Variants.SECONDARY"
      :size="$constants.Alert.Sizes.LARGE"
      :message="alertMessage"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    isAlertVisible: false,
  }),
  computed: mapState(['alertMessage']),
  watch: {
    alertMessage() {
      if (this.alertMessage) {
        this.isAlertVisible = true;
        setTimeout(() => {
          this.isAlertVisible = false;
          this.setAlertMessage('');
        }, 2000);
      }
    },
  },
  methods: mapMutations(['setAlertMessage']),
};
</script>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "~@bambee/pollen/dist/pollen.css";

html {
  scroll-behavior: smooth;
  body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    #alert-bar {
      position: fixed;
      bottom: 50px;
      width: 50vw;
      transform: translateX(50%);
    }
  }
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>
