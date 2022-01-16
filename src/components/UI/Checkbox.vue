<template>
    <div class="flex items-center border-2 rounded-md border-blue-300 w-8 h-8
                flex-shrink-0 justify-center items-center
                bg-white hover:cursor-pointer"
         :class="selected ? 'bg-blue-300' : null"
    >
        <input type="checkbox"
               :id="id"
               class="opacity-0 absolute h-8 w-8 cursor-pointer"
        />
        <SvgIcon class="text-white"
            v-if="selected" type="mdi" size="16" :path="check_icon"/>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiCheck} from "@mdi/js";

export default {
    name: "Checkbox",
    props: ['id', 'selected'],
    components: {
        SvgIcon
    },
    data() {
        return {
            check_icon: mdiCheck
        }
    }
}
</script>

<style scoped>

</style>