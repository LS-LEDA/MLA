<template>
    <section id="settings" class="relative flex flex-col w-full h-full p-5 py-10">
        <div class="flex flex-col w-full h-full">
            <h1 class="text-4xl font-extrabold pb-5"> Settings </h1>
            <div class="flex flex-col w-full h-full bg-secondary rounded-2xl p-5">
                <!-- Tabs buttons -->
                <div class="grid grid-cols-2 gap-2 lg:flex lg:flex-row pb-5">
                    <router-link active-class="bg-primary_variant"
                                 class="bg-primary w-auto hover:bg-primary_variant rounded-lg text-2xl font-bold px-10 py-3 text-center"
                                 :to="tab.tab_path"
                                 v-for="(tab, index) in tabs"
                                 :key="index">
                        {{ tab.tab_name }}
                    </router-link>
                </div>
                <!-- Dashboard deeply nested component view -->
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            tabs: [
                {
                    tab_name: "General",
                    tab_path: "/settings/general"
                },
                {
                    tab_name: "Themes",
                    tab_path: "/settings/themes"
                },
                {
                    tab_name: "About",
                    tab_path: "/settings/about"
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>