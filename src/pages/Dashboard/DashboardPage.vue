<template>
    <section id="dashboard" class="flex flex-col w-screen h-screen p-10 overflow-y-auto">
        <!-- Tabs buttons -->
        <div class="flex flex-row pb-5 space-x-5">
            <router-link :to="tab.tab_path" v-for="(tab, index) in tabs" :key="index" class="">
                <button class="bg-blue-100 hover:bg-blue-200 rounded-lg text-2xl font-bold py-3 px-10"> {{ tab.tab_name }}</button>
            </router-link>
        </div>
        <!-- Dashboard deeply nested component view -->
        <router-view></router-view>
    </section>
</template>

<script>

export default {
    name: "DashboardPage",
    data() {
        return {
            tabs: [
                {
                    tab_name: "Summary",
                    tab_path: "/dashboard/summary"
                },
                {
                    tab_name: "Students",
                    tab_path: "/dashboard/students"
                },
                {
                    tab_name: "Resources",
                    tab_path: "/dashboard/resources"
                },
                {
                    tab_name: "Sentimental",
                    tab_path: "/dashboard/sentimental-analysis"
                },
            ]
        }
    }
}
</script>

<style scoped>

</style>