<template>
    <button class="flex h-fit w-fit py-2 px-5 bg-primary dark:bg-dark_primary hover:enabled:bg-primary_variant
                   dark:enabled:hover:bg-dark_primary_variant rounded-lg disabled:opacity-50"
            :disabled="disable"
            @click="click">
        {{ text }}
    </button>
</template>

<script>

export default {
    name: "Button",
    props: ['text', 'disable'],
    emits: ['btnClick'],
    methods: {
        /**
         * Emits a bntClick event to the parent component
         */
        click: function () {
            this.$emit('btnClick')
        }
    }
}
</script>

<style scoped>

</style>