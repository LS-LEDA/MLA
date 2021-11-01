<template>
    <button type="button" class="flex flex-row bg-blue-100 hover:bg-blue-200 rounded-lg px-4 py-2 my-2 font-bold w-full">
        <svg-icon
            type="mdi" :path="page.button_icon"></svg-icon>
        <span class="ml-3">{{ page.button_name }}</span>
    </button>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'

export default {
    name: "NavigationButton.vue",
    props: ['page'],
    components: {
        SvgIcon
    }
}
</script>

<style scoped>

</style>