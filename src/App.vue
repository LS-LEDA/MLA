<template>
    <!-- Left navigation bar -->
    <NavigationBar/>
    <!-- Page rendered by router -->
    <router-view/>
</template>

<script>
import NavigationBar from '@/components/NavigationBar/NavigationBar'

export default {
    name: 'App',
    components: {
        NavigationBar
    }
}
</script>

<style>
</style>
