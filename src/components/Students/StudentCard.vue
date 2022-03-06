<template>
    <div class="flex w-full rounded-lg h-auto bg-primary dark:bg-dark_primary place-items-center p-5 gap-x-3">
        <div class="flex flex-col w-4/12">
            <!-- Student Name -->
            <span class="font-bold"> {{ name }} </span>
            <span class="text-slate-800"> {{ student.last_resource }} </span>
        </div>

        <!-- Last Connection -->
        <span class="flex w-4/12"> {{ time_conversion() }} </span>
    </div>
</template>

<script>
/**
 * Student Card is a component for students list section
 * in Dashboard > Students > Students List
 */
export default {
    name: "StudentCard",
    props: ['student', 'name'],
    methods: {
        /**
         * Converts UNIX timestamp back to human-readable format
         * @returns {`${string}
                    ${string},
                    ${string}
                    ${string}
            `}
         */
        time_conversion: function () {
            let date = new Date(this.student.timestamp * 1000);

            return `${date.toLocaleString('default', {month: 'short'}).toUpperCase()}
                    ${date.toLocaleString('default', {day: '2-digit'})},
                    ${date.toLocaleString('default', {year: 'numeric'})}
                    ${date.toLocaleString('default', {hour: '2-digit', minute: '2-digit'})}
            `
        }
    }
}
</script>

<style scoped>

</style>