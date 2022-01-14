<template>
    <!-- Contributor badge background -->
    <div class="flex bg-blue-100 rounded-lg w-full max-h-32 drop-shadow-lg p-5 hover:scale-[101%] gap-x-3">
        <!-- Profile Icon -->
        <img class="w-20 h-20 rounded-full" :src="contributor.icon" alt="icon">

        <!-- Profile information -->
        <div class="flex flex-col w-full h-full">
            <!-- Contributor name -->
            <div class="font-black">
                {{ contributor.name }}
            </div>

            <!-- Contributor contact information -->
            <span class="font-bold text-blue-600 inline">
                <a href="mailto:jiahui1@hotmail.es">
                    {{ contributor.email }}
                </a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "ContributorBadge",
    props: ['contributor']
}
</script>

<style scoped>

</style>