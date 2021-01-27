<template>
  <div class="login h-screen w-screen flex items-center justify-center bg-primary-tint-1 bg-opacity-95">
    <FancyCard class="max-w-xl h-1/4 w-1/2 text-center">
      <div class="h-full grid grid-rows-4">
        <TypeDisplay :variant="$constants.Typography.Display.PETA">
          Log in
        </TypeDisplay>
        <TextInput
          v-model="email"
          class="email self-center"
          :invalid="isEmailInvalid"
          :size="$constants.Form.Sizes.LARGE"
          placeholder="Email"
          post-icon="userSolid"
        />
        <TextInput
          ref="passwordInput"
          v-model="password"
          class="password"
          :invalid="isPasswordInvalid"
          :size="$constants.Form.Sizes.LARGE"
          placeholder="Password"
          :post-icon="isPasswordHidden ? 'eyeClosed' : 'eyeOpen'"
          @click.native="resetPassword"
        />
        <BaseButton
          class="self-end"
          :variant="$constants.Button.Variants.SECONDARY"
          :size="$constants.Button.Sizes.GIANT"
          @click="submit"
        >
          Submit
        </BaseButton>
        <div class="flex justify-end my-2">
          <ToolTip class="ml-2">
            <template #trigger>
              <BaseButton
                flat
                :variant="$constants.Button.Variants.SECONDARY"
                post-icon="question"
              >
                Forgot Password
              </BaseButton>
            </template>
            That's too bad
          </ToolTip>
        </div>
      </div>
    </FancyCard>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    isPasswordHidden: true,
    email: '',
    isEmailInvalid: false,
    password: '',
    isPasswordInvalid: false,
  }),
  mounted() {
    console.log(this);
    try {
      // Monkey patch UI inputs
      const emailEl = document.querySelector('.email input');
      emailEl.type = 'email';

      const passwordEl = document.querySelector('.password input');
      passwordEl.type = 'password';

      const passwordEye = document.querySelector('.password .text-input__icon--post');
      passwordEye.style.height = '100%';
      passwordEye.style.width = '25px';
      passwordEye.onclick = () => {
        this.isPasswordHidden = !this.isPasswordHidden;
        passwordEl.type = this.isPasswordHidden ? 'password' : 'text';
      };
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    resetPassword() {
      if (this.isPasswordInvalid && this.password) {
        this.$refs.passwordInput.handleReset();
        this.password = '';
        this.isPasswordInvalid = false;
      }
    },
    submit() {
      this.isEmailInvalid = !this.email;
      this.isPasswordInvalid = !this.password;
      console.log(this.email, this.password);
      if (!this.isEmailInvalid || !this.isPasswordInvalid) {
        console.log('api call');
      }
      this.$router.push({ name: 'Tasks' });
    },
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
