<template>
    <!-- Interactions Card  -->
    <div class="flex w-full h-72 bg-white rounded-3xl p-10 mt-5 hover:cursor-pointer filter drop-shadow-lg
        transform transition duration-500 hover:scale-[101%]">
        <!-- Card Information -->
        <div class="flex flex-col w-5/12 justify-self-center self-center space-y-3">
            <span class="text-5xl"> Total of Interactions </span>
            <span class="text-6xl font-bold"> {{ interactions_count.toLocaleString() }} </span>
        </div>
        <!-- Card graphics -->
    </div>
</template>

<script>
export default {
    name: "InteractionCard",
    data() {
        return {
            interactions_count: 10394
        }
    }
}
</script>

<style scoped>

</style>