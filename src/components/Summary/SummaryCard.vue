<template>
  <div class="grid grid-cols-2 grid-rows-3 bg-white rounded-3xl w-full ">
    <span class="ml-3 text-xl text-gray-500 row-start-1 row-end-1 col-start-1 col-end-1">{{ statistic.statistic_name }}</span>
    <span class="ml-3 text-6xl font-bold row-start-2 row-end-2 col-start-1 col-end-1">{{ statistic.number }}</span>
    <svg-icon class ="row-start-2 row-end-2 col-start-2 col-end-2 justify-self-start mr-10" height="90" width="90"
        type="mdi" :path="statistic.icon"></svg-icon>
    <svg-icon class= "row-start-3 row-end-3 col-start-2 col-end-2 place-self-end mr-3 mb-3" type="mdi" :path=path @click="changeView(statistic.id)"></svg-icon>


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
  emits:['changeView'],
  data() {
    return {
      path: mdiHelpCircleOutline
    }
  },
  methods: {

    changeView: function (id) {
      console.log(id)
      this.$emit('changeView', id)
    }
  }
}
</script>

<style scoped>

</style>
