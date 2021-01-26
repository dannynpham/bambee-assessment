<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "~@bambee/pollen/dist/pollen.css";

body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
</style>
