<template>
    <div class="flex flex-row h-screen w-screen bg-background dark:bg-dark_background select-none
                text-typography dark:text-dark_typography">
        <!-- Left navigation bar -->
        <NavigationBar/>
        <!-- Page rendered by router -->
        <router-view/>
    </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar/NavigationBar";

export default {
    name: 'App',
    components: {
        NavigationBar
    }
}
</script>

<style>
</style>
