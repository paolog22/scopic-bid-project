<template>
  <div class="text-center bg-gray-800">
    <h1 class="font-normal text-3xl text-white leading-loose my-3 w-full">
      Bid Now
    </h1>
    <div class="w-full text-center">
      <form @submit.prevent="onSubmit">
        <div class="max-w-sm mx-auto p-1 pr-0 flex items-center">
          <input
            v-model="form.amount"
            type="number"
            :min="bid"
            placeholder="bid amount"
            class="flex-1 appearance-none rounded shadow p-3 text-black mr-2 focus:outline-none"
          />
          <button
            type="submit"
            class="appearance-none bg-white text-black text-base font-semibold tracking-wide uppercase p-3 rounded shadow hover:bg-indigo-light"
          >
            Bid
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Cookies from 'js-cookie'
export default Vue.extend({
  props: {
    id: {
      type: String,
      default: null,
    },
    bid: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {
        amount: 0,
      },
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post(`/antique/${this.id}`, {
          ...this.form,
          user: Cookies.get('user'),
        })
        .then(({ data }) => {
          this.$emit('bid', data)
        })
    },
  },
})
</script>

<style></style>
