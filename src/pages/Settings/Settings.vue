<template>
    <section id="settings" class="relative flex flex-col w-full h-full">
        <div class="flex flex-col w-full h-full p-10">
            <h1 class="text-4xl font-extrabold pb-5"> Settings </h1>
            <div class="w-full h-full bg-white rounded-2xl">
                <!-- Tabs buttons -->
                <div class="grid grid-cols-2 gap-2 xl:flex xl:flex-row pb-5">
                    <router-link active-class="bg-blue-300"
                                 class="bg-blue-200 w-full hover:bg-blue-300 rounded-lg text-2xl font-bold py-3 text-center"
                                 :to="tab.tab_path"
                                 v-for="(tab, index) in tabs"
                                 :key="index">
                        {{ tab.tab_name }}
                    </router-link>
                </div>

                <!-- Contributors section -->

                <div class="font-bold text-2xl"> Contributors </div>
                <div class="flex flex-col sm:grid md:grid-cols-2 lg:grid-cols-3 w-full h-full p-5 gap-5">
                    <ContributorBadge v-for="(contributor, id) in contributors"
                                      :key="id"
                                      :contributor="contributor"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ContributorBadge from "@/components/UI/ContributorBadge";
import dani_icon from "/public/assets/dani_amo_profile.jpeg";
import jiahui_icon from "/public/assets/jiahui_profile.png";
import default_icon from "/public/assets/default_profile.png";

export default {
    name: "Dashboard",
    components: {ContributorBadge},
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
            ],
            contributors: [
                {
                    name: "PhD. Daniel Amo Filvà",
                    email: "daniel.amo@salle.url.edu",
                    icon: dani_icon,
                },
                {
                    name: "Jiahui Chen",
                    email: "jiahui1@hotmail.es",
                    icon: jiahui_icon,
                },
                {
                    name: "Aleix Ollé",
                    email: "aleix.olle@students.salle.url.edu",
                    icon: default_icon,
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>