<template>
    <div class="flex flex-row h-screen w-screen select-none">
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
