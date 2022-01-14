<template>
    <section id="settings" class="relative flex flex-col w-full h-full">
        <div class="flex flex-col w-full h-full p-10">
            <h1 class="text-4xl font-extrabold pb-5"> Settings </h1>
            <div class="w-full h-full bg-white rounded-2xl">
                <!-- Contributors section -->

                <div class="bg"> Contributors </div>
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