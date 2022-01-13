<template>
    <!-- Contributor badge background -->
    <div class="flex flex-col bg-blue-100 rounded-lg w-full max-h-32 drop-shadow-lg p-5
                hover:scale-[101%]">
        <!-- Profile Icon -->
        <icon path=""/>

        <!-- Contributor name -->
        <div class="font-black">
            {{ contributor.name }}
        </div>

        <!-- Contributor contact information -->
        <a href="mailto:jiahui1@hotmail.es" class="font-bold text-blue-600">
            {{ contributor.email }}
        </a>
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