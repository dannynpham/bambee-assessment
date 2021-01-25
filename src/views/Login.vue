<template>
  <div class="login h-screen w-screen flex content-center justify-center bg-primary bg-opacity-95">
    <FancyCard class="max-w-xl m-auto h-1/3 w-1/3 text-center">
      <div class="h-full grid grid-rows-4">
        <TypeDisplay
          :variant="$constants.Typography.Display.PETA"
        >
          Log in
        </TypeDisplay>
        <TextInput
          class="self-center"
          :size="$constants.Form.Sizes.LARGE"
          placeholder="Email"
        />
        <TextInput
          :size="$constants.Form.Sizes.LARGE"
          placeholder="Password"
        />
        <BaseButton
          class="self-end"
          :size="$constants.Form.Sizes.LARGE"
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
  beforeMount() {
    console.log(this.$constants);
  },
};
</script>
