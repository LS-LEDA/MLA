<template>
  <div class="grid grid-cols-2 grid-rows-3 bg-white rounded-3xl w-full hover:cursor-pointer filter drop-shadow-lg
        transform transition duration-500 hover:scale-[101%]">
    <span class="ml-3 mt-3 text-xl text-gray-500 row-start-1 row-end-1 col-start-1 col-end-1" v-if="front">{{ statistic.statistic_name }}</span>
    <span class="ml-3 text-6xl font-bold row-start-2 row-end-2 col-start-1 col-end-1" v-if="front" >{{ statistic.number }}</span>
    <svg-icon class ="row-start-2 row-end-2 col-start-2 col-end-2 justify-self-end mr-20" height="70" width="70"
        type="mdi" :path="statistic.icon" v-if="front"></svg-icon>
    <svg-icon class= "row-start-3 row-end-3 col-start-2 col-end-2 place-self-end mr-3 mb-3" type="mdi" :path=path @click="changeView()"></svg-icon>
    <span  class=" mr-3 ml-3 text-xl font-bold row-start-1 row-end-4 col-start-1 col-end-3 text-center self-center" v-if="back"> {{statistic.info}} </span>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiHelpCircleOutline} from "@mdi/js"

export default {
  name: "SummaryCard",
  props: ['statistic'],
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiHelpCircleOutline,
      back: false,
      front: true
    }
  },
  methods: {

    changeView: function () {
      this.back = !this.back
      this.front = !this.front
    }
  }
}
</script>

<style scoped>

</style>
