<template>
    <button type="button" class="flex flex-row bg-blue-400  rounded-lg px-4 py-2 mx-2 my-2 font-bold"
            :class="{ 'disabled:opacity-50' : !status, 'hover:bg-blue-500' : status }" :disabled="!status">
        <svg-icon type="mdi" :path="icon"></svg-icon>
        <span class="ml-3"> {{ type }} </span>
    </button>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";

export default {
    name: "IconButton",
    props: ['icon', 'type', 'status'],
    components: {
        SvgIcon
    }
}
</script>

<style scoped>

</style>