<template>
    <div class="h-full w-96 overflow-y-hidden pb-4">
        <div class="flex flex-col bg-secondary dark:bg-dark_secondary h-full rounded-lg mx-2 my-2">
            <Item :title="log_name"/>
            <Calendar @dateSelect="selectDate" :calendarID="1"/>
            <Calendar @dateSelect="selectDate" :calendarID="2"/>
        </div>
    </div>
</template>

<script>
import Calendar from "@/components/UI/Calendar";
import Item from "@/components/UI/Item";
import {logs_apply_filter} from "@/services/moodle_logs_processing";
export default {
    name: "InformationPanel",
    components: {
        Item,
        Calendar
    },
    computed: {
        log_name() {
            return this.$store.state.dashboard.course_name;
        },
        start_date: function () {
            return this.$store.state.dates.start_date;
        },
        end_date: function () {
            return this.$store.state.dates.end_date;
        }
    },
    methods: {
        /**
         * Stores the selected dates from the side panels' calendars.
         * @param date Selected date information { day, month, year }
         * @param calendarID Which calendar
         */
        selectDate: function (date, calendarID) {
            this.$store.commit('selectDate', {
                calendarID: calendarID,
                date: date
            });
            // Apply filter
            logs_apply_filter(Math.floor(this.$store.state.dates.start_date / 1000), Math.floor(this.$store.state.dates.end_date / 1000));
        }
    }
}
</script>

<style scoped>

</style>