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
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";

export default {
    name: 'App',
    components: {
        NavigationBar
    },
    mounted() {
        // Register tray item event
        window.ipc.on('read_tray_item', (args) => {
            this.$router.push({
                name: args.name
            });
        })
    }
}
</script>

<style>
</style>
