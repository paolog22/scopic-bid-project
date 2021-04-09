<template>
  <section class="text-indigo-200 body-font p-5 bg-gray-900">
    <div class="mx-auto flex px-5 md:flex-row flex-col items-center jobcard">
      <div
        class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center"
      >
        <figure class="visible">
          <div class="">
            <div class="pt-10 px-2 sm:px-6">
              <vue-countdown
                v-slot="{ days, hours, minutes, seconds }"
                :time="time"
              >
                <span
                  class="inline-block py-1 px-2 bg-green-600 text-white text-xs font-bold tracking-widest mb-2"
                >
                  Time Remaining：{{ days }} days, {{ hours }} hours,
                  {{ minutes }} minutes, {{ seconds }} seconds.</span
                >
              </vue-countdown>
              <h1
                class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-100"
              >
                {{ antique.name }}
              </h1>
              <p class="text-indigo-200 text-base pb-6">
                {{ antique.description }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center pb-12">
                  <p class="text-indigo-200 font-bold ml-3">
                    Last Bid Amount <br />
                    <span class="text-indigo-200 text-base font-light">{{
                      lastBid
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </figure>
      </div>
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 sm:block hidden">
        <img
          class="object-cover object-center rounded"
          alt="hero"
          :src="antique.image"
        />
      </div>
    </div>

    <BidForm :id="antique.id" :bid="lastBid" @bid="onBid" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Cookies from 'js-cookie'
import VueCountdown from '@chenfengyuan/vue-countdown'
import BidForm from '../../components/bidform.vue'

export default Vue.extend({
  components: {
    BidForm,
    VueCountdown,
  },
  middleware({ redirect }) {
    const user = Cookies.get('user')
    if (!user) {
      return redirect('/')
    }
  },
  data(): { antique: { bids: any[] } } {
    return {
      antique: {
        bids: [],
      },
    }
  },
  computed: {
    lastBid() {
      return this.antique.bids.length
        ? Math.max(...this.antique.bids.map((i) => i.bid))
        : this.antique.base_price
    },
    time() {
      if (this.antique.id) {
        const futureDate = new Date(this.antique.expiration)
        const now = new Date()
        return futureDate - now
      }

      return 0
    },
  },
  mounted() {
    this.fetchAntique()
  },
  methods: {
    fetchAntique() {
      const { id } = this.$route.params
      this.$axios.get(`/antique/${id}`).then(({ data }) => {
        this.antique = data
      })
    },
    onBid(data) {
      this.antique.bids.push(data)
    },
  },
})
</script>
