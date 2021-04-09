<template>
  <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
    <div
      class="flex items-end justify-end h-56 w-full bg-cover"
      :style="`
        background-image: url(${antique.image});
      `"
    ></div>
    <div class="px-5 py-3">
      <h3 class="text-gray-700 uppercase">{{ antique.name }}</h3>
      <span class="text-gray-500 mt-2"
        >Start Price: {{ antique.base_price }}</span
      >
      <span class="text-gray-500 mt-2"
        >End: {{ new Date(antique.expiration).toLocaleDateString() }}</span
      >
    </div>

    <NuxtLink :to="`/details/${antique.id}`">
      <button
        class="p-2 mb-2 self-center bg-blue-600 text-white mx-5 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
      >
        Bid Now
      </button>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    antique: {
      type: Object,
      default: () => {},
    },
  },
})
</script>
