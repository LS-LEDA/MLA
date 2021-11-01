<template>
    <!-- Left navigation bar -->
    <NavigationBar/>
    <!-- Page rendered by router -->
    <router-view/>
</template>

<script>
import ImportDataPage from '@/pages/ImportData/ImportDataPage'

export default {
    name: 'App',
    components: {
        NavigationBar
    }
}
</script>

<style>
</style>
