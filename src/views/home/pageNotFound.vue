<template>
  <div class="bg-gray-350 flex h-full">
  <div class="m-auto text-center">
    <p class="text-blue-500  text-6xl sm:text-8xl font-bold">OOPS!</p>
    <p class="text-xl sm:text-2xl my-6">We can't find page you're looking for.</p>
    <router-link to="/" tag="button" class="text-blue-500 border border-blue-500 rounded-md py-2 px-4">Visit homepage</router-link>
  </div>
  </div>
</template>

<script>
export default {
  components: { },
  setup() {
    return {
    };
  },
};
</script>
