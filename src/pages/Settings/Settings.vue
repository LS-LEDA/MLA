<template>
    <section id="settings" class="relative flex flex-col w-full h-full">
        <div class="flex flex-col w-full h-full p-10">
            <h1 class="text-4xl font-extrabold pb-5"> Settings </h1>
            <div class="w-full h-full bg-white rounded-2xl">
                <div id="contributors" class="mt-5 ml-5">
                    <ul>
                        <li class="">PhD. Daniel Amo Filvà
                            <a href="mailto:daniel.amo@salle.url.edu" class="pl-10 font-bold text-blue-600">
                                daniel.amo@salle.url.edu
                            </a>
                        </li>
                        <li class="text-">Jiahui Chen
                            <a href="mailto:jiahui1@hotmail.es" class="pl-10 font-bold text-blue-600">
                                jiahui1@hotmail.es
                            </a>
                        </li>
                        <li class="">Aleix Ollé
                            <a href="mailto:aleix.olle@students.salle.url.edu" class="pl-10 font-bold text-blue-600">
                                aleix.olle@students.salle.url.edu
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ContributorBadge from "@/components/UI/ContributorBadge";
export default {
    name: "Dashboard",
    components: {ContributorBadge},
    data() {
        return {
            contributors: [
                {
                    name: "PhD. Daniel Amo Filvà",
                    email: "daniel.amo@salle.url.edu"
                },
                {
                    name: "Jiahui Chen",
                    email: "jiahui1@hotmail.es"
                },
                {
                    name: "Aleix Ollé",
                    email: "aleix.olle@students.salle.url.edu"
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>