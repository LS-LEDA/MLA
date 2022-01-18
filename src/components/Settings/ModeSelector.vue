<template>
    <div class="flex w-full h-full items-center place-content-between">
        <div class="flex items-center space-x-2">
            <!-- Mode icon -->
            <div class="flex w-12 h-12 rounded-lg bg-blue-200 justify-center items-center">
                <SvgIcon type="mdi" :path="mode.icon"/>
            </div>

            <!-- Mode description -->
            <div>
                {{ mode.description }}
            </div>
        </div>
        <Checkbox value="hello" :id="id" :selected="selected === id" @click="toggle_mode"/>
    </div>
</template>

<script>
import Checkbox from "@/components/UI/Checkbox";
import SvgIcon from "@jamescoyle/vue-icon";

export default {
    name: "ModeSelector",
    props: ['selected', 'mode', 'id'],
    emits: ['select_mode'],
    components: {
        Checkbox,
        SvgIcon
    },
    methods: {
        /**
         * Switch between dark, light mode or
         * let system decide for the user.
         */
        toggle_mode: function () {
            this.$emit('select_mode', this.$props.id);
        }
    }
}
</script>

<style scoped>

</style>