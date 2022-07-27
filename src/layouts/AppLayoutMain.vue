<template>
  <div class="relative min-h-screen flex">
    <main class="flex-1">
      <div class="flex bg-gray-75 flex-row">
        <div
          class="flex flex-col w-full min-h-screen bg-gray-40"
        >
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

export default {
}
</script>

<style scoped>
.padding-75px {
  padding-left: 75px;
}
</style>
