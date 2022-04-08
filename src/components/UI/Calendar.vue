<template>
    <div class="flex flex-col m-2 p-5 bg-gray-100 rounded-lg">
        <div class="flex w-full items-center justify-between">
            <!-- Calendar Month & Year -->
            <span tabindex="0" class="flex text-xl font-bold">
                {{ formatter.format(date) }} {{ date.getFullYear() }}
            </span>
            <!-- Calendar buttons -->
            <div class="flex gap-x-2">
                <button class="bg-primary dark:bg-dark_primary rounded-md hover:bg-primary_variant dark:hover:bg-dark_primary_variant
                        disabled:opacity-25 disabled:hover:bg-primary"
                        :disabled="this.date.getMonth() <= this.first_date.getMonth() &&
                         this.date.getFullYear() <= this.first_date.getFullYear()"
                        @click.prevent="left_calendar"
                >
                    <SvgIcon type="mdi" :path="left_icon"/>
                </button>
                <button class="bg-primary dark:bg-dark_primary rounded-md hover:bg-primary_variant dark:hover:bg-dark_primary_variant
                        disabled:opacity-25 disabled:hover:bg-primary"
                        :disabled="this.date.getMonth() >= this.last_date.getMonth() &&
                         this.date.getFullYear() >= this.last_date.getFullYear()"
                        @click.prevent="right_calendar"
                >
                    <SvgIcon type="mdi" :path="right_icon"/>
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
                <tr v-for="(weeks, week_index) in formatted_days" :key="week_index">
                    <td v-for="(day, day_index) in weeks" :key="day_index">
                        <div v-html="day" @click="selectDate(week_index, day_index, $event)"/>
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
    emits: ['dateSelect'],
    props: ['calendarID'],
    data() {
        return {
            week_days: [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            // Tracks the current calendar view
            date: new Date(),
            // Log date keeps track of the first or last date with logs
            d_date: new Date(),
            first_date: null,
            last_date: null,
            formatted_days: [[], [], [], [], [], []],
            days: [],
            chunks: 0,
            formatter: new Intl.DateTimeFormat('en', {month: "long"}),
            left_icon: mdiMenuLeft,
            right_icon: mdiMenuRight
        }
    },
    computed: {
        // Get the first log date
        log_first_date() {
            return this.$store.state.dates.first_date;
        },
        // Get the last log date
        log_last_date() {
            return this.$store.state.dates.last_date;
        },
    },
    beforeMount() {
        this.first_date = new Date(this.log_first_date * 1000);
        this.last_date = new Date(this.log_last_date * 1000);
    },
    mounted() {
        if (this.calendarID === 1) {
            this.d_date = new Date(this.log_first_date * 1000);
            this.date = new Date(this.log_first_date * 1000);
        } else {
            this.d_date = new Date(this.log_last_date * 1000);
            this.date = new Date(this.log_last_date * 1000);
        }
        this.render_calendar();
    },
    methods: {
        render_calendar: function () {
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
                this.days.push(`<p class="flex justify-center text-base text-gray-400">${prev_last_day - i + 1}</div>`);
            }

            // Current month days
            for( let i = 1; i <= last_day; i++ ) {
                // If the day corresponds to the first / last date of the logs (Day/Month/Year must all match)
                if ( i === this.d_date.getDate() &&
                    this.date.getMonth() === this.d_date.getMonth() &&
                    this.date.getFullYear() === this.d_date.getFullYear()) {
                    this.days.push(
                        `<p class="flex w-full justify-center aspect-square p-0.5 lg:p-1 hover:bg-primary dark:hover:bg-dark_primary
                        hover:cursor-pointer rounded-full bg-primary_variant">
                            ${i}
                        </div>`
                    );
                    continue;
                }
                this.days.push(
                    `<p class="flex w-full justify-center aspect-square p-0.5 lg:p-1 hover:bg-primary dark:hover:bg-dark_primary
                    hover:cursor-pointer rounded-full">
                        ${i}
                    </div>`
                );
            }

            // Next month days
            for ( let j = 1; j <= next_days; j++ ) {
                this.days.push(`<p class="flex justify-center text-base text-gray-400">${j}</div>`);
            }

            // Clear the 6th formatted day array, sometimes there's only 5 rows
            if (this.chunks === 6)
                for (let i = 0; i < 7; i++) {
                    this.formatted_days[5][i] = `<p class="text-base text-black"></div>`;
                }

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
        },
        selectDate: function (week_index, day_index, selected_day) {
            // TODO: Change calendar to previous or next month

            // For now, discard previous or next month days - This may cause some bugs
            if ( (week_index <= 1 && selected_day.target.innerText > 20) ||
                (week_index >= 4 && selected_day.target.innerText < 10)
            ) {
                return
            }

            this.$emit('dateSelect', {
                day: selected_day.target.innerText,
                month: this.date.getMonth(),
                year: this.date.getFullYear()
            }, this.calendarID);
        }
    }
}
</script>

<style scoped>

</style>