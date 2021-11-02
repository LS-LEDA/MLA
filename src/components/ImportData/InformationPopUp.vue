<template>
    <div class="ml-2 flex flex-col absolute inset-0 justify-center place-items-center bg-gray-400 bg-opacity-75 transition-opacity"
         role="dialog" aria-modal="true">
        <div class="flex flex-col bg-blue-200 w-3/6 h-4/6 rounded-3xl z-50">
            <div class ="w-4/5 h-4/5 self-center p-10">
                <iframe class="relative inset-0 w-full h-full rounded-2xl"  src="https://www.loom.com/embed/ed2bc470d04c4d02b9825e9954069b41" allowfullscreen >
                </iframe>
            </div>
            <button class="self-center bg-blue-400 hover:bg-blue-500 rounded-lg font-bold py-3 w-1/6 h-1/10" @click="hidePopUp">EXIT</button>
        </div>
        <div class="absolute w-full h-full filter backdrop-blur-sm z-10"></div>
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