<template>
  <div class="fixed left-2 top-2 bottom-2 w-2/12 flex flex-col bg-white rounded-xl">
    <DownloadButton class="block"/>
  </div>
</template>

<script>
import DownloadButton from '@/components/NavigationBar/DownloadButton'
export default {
  name: "NavigationBar",
  components: {
    DownloadButton
  }
}
</script>

<style scoped>

</style>