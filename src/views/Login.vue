<template>
  <div class="login h-screen w-screen flex items-center justify-center bg-primary-tint-1 bg-opacity-95">
    <FancyCard class="max-w-xl h-1/4 w-1/2 text-center">
      <div class="h-full grid grid-rows-4">
        <TypeDisplay
          :variant="$constants.Typography.Display.PETA"
        >
          Log in
        </TypeDisplay>
        <TextInput
          class="email"
          :size="$constants.Form.Sizes.LARGE"
          placeholder="Email"
          post-icon="userSolid"
        />
        <TextInput
          class="password"
          :size="$constants.Form.Sizes.LARGE"
          placeholder="Password"
          :post-icon="isPasswordHidden ? 'eyeClosed' : 'eyeOpen'"
        />
        <BaseButton
          class="self-end"
          :size="$constants.Button.Sizes.GIANT"
        >
          Submit
        </BaseButton>
      </div>
    </FancyCard>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    isPasswordHidden: true,
  }),
  mounted() {
    console.log(this.$constants);
    try {
      // Monkey patch UI inputs
      const emailEl = document.querySelector('.email');
      emailEl.querySelector('input').type = 'email';

      const passwordEl = document.querySelector('.password');
      passwordEl.querySelector('input').type = 'password';

      const passwordEye = passwordEl.querySelector('.text-input__icon--post');
      passwordEye.style.height = '100%';
      passwordEye.style.width = '25px';
      passwordEye.onclick = () => {
        this.isPasswordHidden = !this.isPasswordHidden;
      };
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  ::v-deep .base-card__content {
    --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}
</style>
