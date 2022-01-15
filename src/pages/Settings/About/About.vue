<template>
    <div class="flex w-full h-full">
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
                    <a :href="link.link" target="_blank">
                        {{ link.name }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mla_logo from "/public/assets/mla_logo.png";

export default {
    name: "About",
    data() {
        return {
            mla_logo: mla_logo,
            information: [
                "MLA for Desktop",
                "Version 1.0.1 - Andromeda",
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
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>