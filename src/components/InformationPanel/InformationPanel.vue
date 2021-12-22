<template>
    <div class="h-full w-96 overflow-y-hidden pb-4">
        <div class="flex flex-col bg-white h-full rounded-lg mx-2 my-2">
            <Calendar @dateSelect="selectDate" calendarID="1"/>
            <Calendar @dateSelect="selectDate" calendarID="2"/>
        </div>
    </div>
</template>

<script>
import Calendar from "@/components/UI/Calendar";
export default {
    name: "InformationPanel",
    components: {Calendar},
    data() {
        return {
            start_date: new Date(),
            end_date: new Date(),
        }
    },
    methods: {
        /**
         * Stores the selected dates from the side panels' calendars.
         * @param date Selected date information { day, month, year }
         * @param calendarID Which calendar
         */
        selectDate: function (date, calendarID) {
            if ( calendarID === 1) {
                this.start_date.setDate(date.day);
                this.start_date.setMonth(date.month);
                this.start_date.setFullYear(date.year);
            } else {
                this.end_date.setDate(date.day);
                this.end_date.setMonth(date.month);
                this.end_date.setFullYear(date.year);
            }
        }
    }
}
</script>

<style scoped>

</style>