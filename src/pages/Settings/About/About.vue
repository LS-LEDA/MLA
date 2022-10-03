<template>
    <div class="flex flex-col space-y-10 lg:space-y-0 lg:flex-row w-full h-full lg:divide-x">
        <!-- Application information -->
        <div class="flex flex-col w-full lg:w-2/6 h-full place-items-center justify-center">
            <!-- Application logo -->
            <img class="h-32 w-32 my-5" :src="mla_logo" alt="MLA logo">
            <!-- Application system information-->
            <div class="flex flex-col space-y-1 place-items-center my-5">
                <div v-for="(info, index) in information" :key="index">
                    {{ info }}
                </div>
            </div>
            <!-- External links -->
            <div class="flex flex-col place-items-center">
                <div v-for="(link, index) in external_links" :key="index">
                    <a class="flex place-items-center hover:underline underline-offset-2"
                       :class="link.special_color ? 'text-red-600' : 'text-blue-600'"
                        :href="link.link" target="_blank">
                        {{ link.name }}
                        <SvgIcon class="hover:cursor-pointer ml-2" type="mdi" size="16" :path="link_icon"/>
                    </a>
                </div>
            </div>
        </div>

        <!-- TODO: Fix full height -->
        <!-- Contributors information -->
        <div class="flex flex-col w-full lg:w-4/6 h-full space-y-2 lg:px-5">
            <div class="flex font-bold text-2xl self-center"> {{ $t("settings.about.contributors") }} </div>
            <div class="flex w-full h-full sm:grid md:grid-cols-2 md:auto-rows-min gap-5 overflow-y-scroll">
                <ContributorBadge v-for="(contributor, id) in contributors"
                                  :key="id"
                                  :contributor="contributor"
                />
            </div>
        </div>
    </div>
</template>

<script>
import mla_logo from "/src/assets/imgs/mla_logo.png";
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiOpenInNew} from "@mdi/js";
import ContributorBadge from "@/components/UI/ContributorBadge.vue";
import dani_icon from "/src/assets/imgs/about/dani_amo_profile.jpeg";
import jiahui_icon from "/src/assets/imgs/about/jiahui_profile.png";
import aleix_icon from "/src/assets/imgs/about/aleix_profile.png";
//import default_icon from "/public/assets/default_profile.png";

export default {
    name: "About",
    components: {
        SvgIcon,
        ContributorBadge
    },
    data() {
        return {
            mla_logo: mla_logo,
            link_icon: mdiOpenInNew,
            information: [
                "MLA for Desktop",
                "Version 1.2.0 - Apus",
                "Linux x86_64"
            ],
            external_links: [
                {
                    name: "Website",
                    link: "https://ls-leda.github.io/Moodle-Learning-Analytics",
                },
                {
                    name: "Changelog",
                    link: "https://github.com/LS-LEDA/MLA/releases",
                },
                {
                    name: "Documentation",
                    link: "https://ls-leda.github.io/Moodle-Learning-Analytics/",
                },
                {
                    name: "Report an Issue",
                    link: "https://github.com/LS-LEDA/MLA/issues",
                    special_color: true
                }
            ],
            contributors: [
                {
                    name: "PhD. Daniel Amo Filvà",
                    email: "daniel.amo@salle.url.edu",
                    icon: dani_icon,
                    role: "Project Manager"
                },
                {
                    name: "Jiahui Chen",
                    email: "jiahui1@hotmail.es",
                    icon: jiahui_icon,
                    role: "Lead Developer & Maintainer"
                },
                {
                    name: "Aleix Ollé",
                    email: "aleix.olle@students.salle.url.edu",
                    icon: aleix_icon,
                    role: "Developer"
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>