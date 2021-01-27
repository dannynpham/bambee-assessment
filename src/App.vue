<template>
  <div id="app">
    <transition
      name="component-fade"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

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
  }
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>
