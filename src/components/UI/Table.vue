<template>
    <table class="table-auto max-h-full w-full">
        <thead class="bg-primary_variant dark:bg-dark_primary_variant">
        <tr class="text-left uppercase">
            <th class="p-3"> {{$t("dashboard.summary.total_interactions.interaction_type")}} </th>
            <th class="p-3"> {{$t("dashboard.summary.total_interactions.number_of_interactions")}} </th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-primary dark:bg-dark_primary hover:bg-primary_variant dark:hover:bg-dark_primary_variant" v-for="(interaction, index) in interactions" :key="index">
            <td class="font-bold p-3"> {{ interaction[0] }} </td>
            <td class="p-3"> {{ interaction[1] }} </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "Table",
    props: ['interactions'],
}
</script>

<style scoped>

</style>