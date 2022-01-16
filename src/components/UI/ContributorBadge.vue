<template>
    <!-- Contributor badge background -->
    <div class="flex bg-blue-100 rounded-lg max-w-full max-h-32 shadow-lg shadow-blue-400/30 p-5 gap-x-3 truncate text-ellipsis">
        <!-- Profile Icon -->
        <img class="w-20 h-20 rounded-full" :src="contributor.icon" alt="icon">

        <!-- Profile information -->
        <div class="flex flex-col w-full h-full">
            <!-- Contributor name -->
            <div class="font-black">
                {{ contributor.name }}
            </div>

            <!-- TODO: Fix overflow -->
            <!-- Contributor contact information -->
            <span class="flex max-w-full font-bold text-blue-600 space-x-2">
                <a href="mailto:jiahui1@hotmail.es">
                    {{ contributor.email }}
                </a>
                <SvgIcon class="self-center hover:bg-blue-200"
                         type="mdi"
                         size="16"
                         :path="copy_icon"
                         @click="copy_mail"
                />
            </span>

            <!-- Contributor role in the project -->
            <div class="text-gray-500 inline">
                {{ contributor.role }}
            </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiContentCopy} from "@mdi/js";

export default {
    name: "ContributorBadge",
    props: ['contributor'],
    components: {
        SvgIcon
    },
    data() {
        return {
            copy_icon: mdiContentCopy,
        }
    },
    methods: {
        /**
         * Copies the selected mail to clipboard
         */
        copy_mail: function () {
            navigator.clipboard.writeText(this.contributor.email)
        }
    }
}
</script>

<style scoped>

</style>