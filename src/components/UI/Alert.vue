<template>
    <div class="fixed bottom-0 left-0 right-0 z-50 flex transition place-content-center">
        <div class="flex bg-red-100 rounded-lg p-5 mb-3 text-red-700 items-center" role="alert">
            <SvgIcon type="mdi" :path="help_icon" class="text-red-500"/>
            <div class="font-bold pl-2 pr-5">
                {{ message }}
            </div>
            <button type="button"
                    @click="close_alert"
                    class="ml-auto bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1 hover:bg-red-200 inline-flex h-8 w-8">
                <SvgIcon type="mdi" :path="close_icon"/>
            </button>
        </div>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiClose, mdiInformation} from "@mdi/js";

export default {
    name: "Alert",
    props: ['message'],
    emits: ['closeAlert'],
    components: {
        SvgIcon
    },
    data() {
        return {
            help_icon: mdiInformation,
            close_icon: mdiClose,
        }
    },
    methods: {
        close_alert() {
            this.$emit('closeAlert');
        }
    }
}
</script>

<style scoped>

</style>