<template>
    <button type="button" class="flex flex-row bg-blue-400 hover:bg-blue-500 rounded-lg px-4 py-2 mx-2 my-2 font-bold">
        <svg-icon type="mdi" :path="icon"></svg-icon>
        <span class="ml-3"> {{ type }} </span>
    </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";

export default {
    name: "IconButton",
    props: ['icon', 'type'],
    components: {
        SvgIcon
    }
}
</script>

<style scoped>

</style>