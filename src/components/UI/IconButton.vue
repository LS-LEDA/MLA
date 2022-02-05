<template>
    <button type="button" class="flex flex-row bg-primary dark:bg-dark_primary rounded-lg py-2 m-2 font-bold"
            :class="{ 'disabled:opacity-50' : !status, 'hover:bg-primary_variant dark:hover:bg-dark_primary_variant' : status,
             'px-2' : !type, 'px-4' : type }" :disabled="!status">
        <SvgIcon type="mdi" :path="icon"/>
        <!-- Button text -->
        <span v-if="type" class="ml-3"> {{ type }} </span>
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