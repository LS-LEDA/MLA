<template>
    <div class="flex m-2 px-5 py-2 rounded-md bg-primary font-bold justify-center">
        {{ title }}
    </div>
</template>

<script>
export default {
    name: "Item",
    props: ['title']
}
</script>

<style scoped>

</style>