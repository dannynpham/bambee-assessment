<template>
  <div class="login">
    <FancyCard class="login-form">
      <div class="max-w-xl m-auto text-center">
        <TextInput
            size="Large"
            placeholder="Email"
            @input="handleInput"
          />
      </div>
    </FancyCard>
  </div>
</template>

<script>

export default {
  name: 'Login',
};
</script>

<style lang="scss">
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    min-height: 30%;
    max-height: 400px;
    min-width: 30%;
    max-width: 400px;
    // background-color: red;
  }
}
</style>
