<template>
    <div class="flex flex-col rounded-lg w-full h-32 p-5 space-y-2 hover:cursor-pointer"
         :class="selected === id ? 'bg-blue-300' : 'bg-blue-100'"
         @click="select_theme">
        <!-- Theme name -->
        <div class="self-center font-bold text-xl">
            {{ theme.name }}
        </div>

        <!-- Theme colours -->
        <div class="flex flex-initial w-full justify-center">
            <div class="flex justify-center palette">
                <div class="rounded-full border-2 border-white w-12 h-12 circle"
                     :class="`bg-[${colour}]`"
                     v-for="( colour, index ) in theme.colours" :key="index">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Theme",
    props: ['theme', 'id', 'selected'],
    emits: ['select_theme'],
    methods: {
        select_theme: function () {
            this.$emit('select_theme', this.$props.id)
        }
    }
}
</script>

<style scoped>

    .palette {
        transform: translateX(20px);
    }

    .circle{
        position: relative;
        left: 0;
    }


    .circle:nth-child(2) {
        left: -10px;
    }

    .circle:nth-child(3) {
        left: -20px;
    }

    .circle:nth-child(4) {
        left: -30px;
    }

    .circle:last-child {
        left: -40px;
    }

</style>