<template>
    <div class="flex flex-col m-2 p-5 bg-gray-100 rounded-lg">
        <div class="flex w-full items-center justify-between">
            <!-- Calendar Month & Year -->
            <span tabindex="0" class="flex text-xl font-bold">
                {{ formatter.format(date) }} {{ date.getFullYear() }}
            </span>
            <!-- Calendar buttons -->
            <div class="flex gap-x-2">
                <button class="bg-blue-200 rounded-md hover:bg-blue-300">
                    <SvgIcon type="mdi" :path="left_icon" @click="left_calendar"/>
                </button>
                <button class="bg-blue-200 rounded-md hover:bg-blue-300">
                    <SvgIcon type="mdi" :path="right_icon" @click="right_calendar"/>
                </button>
            </div>
        </div>
        <!-- Calendar dates -->
        <div class="flex items-center pt-6">
            <table class="w-full">
                <thead>
                <tr>
                    <th v-for="(week_day, index) in week_days" :key="index">
                        <div class="w-full flex justify-center">
                            <p class="text-base font-medium text-center text-gray-800">
                                {{ week_day }}
                            </p>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(weeks, index) in formatted_days" :key="index">
                    <td v-for="(day, index) in weeks" :key="index">
                        <div class="px-2 py-2 cursor-pointer flex w-full justify-center hover:bg-blue-200 hover:rounded-full "
                             v-html="day">
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {mdiMenuLeft, mdiMenuRight} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

export default {
    name: "Calendar",
    components: {
        SvgIcon
    },
    data() {
        return {
            week_days: [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            date: new Date(),
            formatted_days: [[], [], [], [], [], []],
            days: [],
            chunks: 0,
            formatter: new Intl.DateTimeFormat('en', {month: "long"}),
            left_icon: mdiMenuLeft,
            right_icon: mdiMenuRight
        }
    },
    mounted() {
        this.render_calendar();
    },
    methods: {
        render_calendar: function () {
            this.date.setDate(1);

            const last_day = new Date(
                this.date.getFullYear(),
                this.date.getMonth() + 1,
                0
            ).getDate();

            const prev_last_day = new Date(
                this.date.getFullYear(),
                this.date.getMonth(),
                0
            ).getDate();

            // Position of the month's first day
            // [M,T,W,T,F,S,S]
            // [1,2,3,4,5,6,7]
            let first_day_index = this.date.getDay() - 1;

            const last_day_index = new Date(
                this.date.getFullYear(),
                this.date.getMonth() + 1,
                0
            ).getDay();

            // Sometimes fist_day_index is -1, past week's Sunday
            const next_days = 7 - last_day_index;

            if ( first_day_index === -1 ) {
                first_day_index = 6;
            }

            // Previous month days
            for( let i = first_day_index; i > 0;  i-- ) {
                this.days.push(`<p class="text-base text-gray-400">${prev_last_day - i + 1}</div>`);
            }

            // Current month days
            for( let i = 1; i <= last_day; i++ ) {
                this.days.push(`<p class="text-base text-black">${i}</div>`);
            }

            // Next month days
            for ( let j = 1; j <= next_days; j++ ) {
                this.days.push(`<p class="text-base text-gray-400">${j}</div>`);
            }

            // Clear the 6th formatted day array, sometimes there's only 5 rows
            if (this.chunks === 6)
                this.formatted_days[5].length = 0;

            let chunks = 0;
            for ( let i = 0; i < this.days.length; i += 7) {
                this.formatted_days[chunks] = this.days.slice(i, i + 7);
                chunks++;
            }

            // Clear the array for a possible update
            this.days.length = 0;

            // Clear the 6th formatted day array, sometimes there's only 5 rows
            this.chunks = chunks;
        },
        left_calendar: function () {
            this.date.setMonth( this.date.getMonth() - 1);
            this.render_calendar();
        },
        right_calendar: function () {
            this.date.setMonth( this.date.getMonth() + 1);
            this.render_calendar();
        }
    }
}
</script>

<style scoped>

</style>