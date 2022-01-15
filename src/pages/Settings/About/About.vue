<template>
    <div class="flex w-full h-full">
        <!-- Application information -->
        <div class="flex flex-col">
            <!-- Application logo -->
            <img :src="mla_logo" alt="MLA logo">
        </div>
    </div>
</template>

<script>
import mla_logo from "/public/assets/mla_logo.png";

export default {
    name: "About",
    data() {
        return {
            mla_logo: mla_logo,
        }
    }
}
</script>

<style scoped>

</style>