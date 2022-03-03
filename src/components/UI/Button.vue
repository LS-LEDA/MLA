<template>
    <button class="flex h-fit w-fit py-2 px-5 bg-primary hover:bg-primary_variant rounded-lg">
        {{ text }}
    </button>
</template>

<script>

export default {
    name: "Button",
    props: ['text']
}
</script>

<style scoped>

</style>