<template>
  <main class="my-8">
    <div class="container mx-auto px-6">
      <h3 class="text-gray-700 text-2xl font-medium">Antiques</h3>
      <span class="mt-3 text-sm text-gray-500">{{ total }} Items</span>
      <div
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
      >
        <template v-for="(item, index) in list">
          <antique :key="index" :antique="item" />
        </template>
      </div>
    </div>
    <div class="flex justify-center">
      <button
        v-show="total != list.length"
        type="button"
        class="border border-green-500 text-green-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-green-600 focus:outline-none focus:shadow-outline"
        @click="fetchAntiques"
      >
        Load More
      </button>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Antique from '../components/antique.vue'

export default Vue.extend({
  components: {
    Antique,
  },
  data() {
    return {
      page: 0,
      total: 0,
      list: [],
    }
  },
  mounted() {
    this.fetchAntiques()
  },
  methods: {
    fetchAntiques() {
      this.$axios
        .get('/antique', {
          params: {
            page: this.page + 1,
          },
        })
        .then(({ data }) => {
          this.page += 1
          this.list.push(...data.data)
          this.total = data.meta.total
        })
    },
  },
})
</script>
