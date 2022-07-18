<template>
    <div class="flex w-auto h-auto place-items-center">
        <div class="flex w-full h-fit">
            {{ emotion }}
        </div>
        <IconButton :icon="remove_icon" :type="false" :status="true" @click="this.$emit('removeEmotion')"/>
    </div>
</template>

<script>
import IconButton from "@/components/UI/IconButton";
import {mdiClose} from "@mdi/js";


/**
 * EmotionCard is a component for the list of imported
 * emotions in the AI settings tab.
 */
export default {
    name: "EmotionCard",
    props: ['emotion'],
    components: {
        IconButton
    },
    data() {
        return {
            remove_icon: mdiClose
        }
    }
}
</script>

<style scoped>

</style>