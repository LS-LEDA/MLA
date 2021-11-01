<template>
      <div class=" flex flex-col absolute z-10 row-start-1 row-end-1 col-start-1 col-end-1 rounded-xl bg-blue-200 opacity-100 w-1/2 h-2/3 self-center justify-self-center">
            <div class ="relative w-4/5 h-4/5 self-center p-10">
                <iframe class="relative inset-0 w-full h-full rounded-2xl"  src="https://www.loom.com/embed/ed2bc470d04c4d02b9825e9954069b41" allowfullscreen >
                </iframe>
            </div>
          <button class="relative self-center bg-blue-400 hover:bg-blue-500 rounded-lg font-bold py-3 w-1/6 h-1/10" @click="hidePopUp">EXIT</button>
      </div>
</template>


<script>
export default {
    name: "InformationPopUp",
    emits: ['infoPopUp'],
    methods: {
        hidePopUp: function () {
              this.$emit('infoPopUp')
        }
    }
}

</script>

<style scoped>

</style>