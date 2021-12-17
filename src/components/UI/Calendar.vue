<template>
    <div class="flex flex-col m-2 p-5 bg-gray-100 rounded-lg">
        <div class="flex w-full items-center justify-between">
            <!-- Calendar Month & Year -->
            <span tabindex="0" class="flex text-xl font-bold">
                {{ formatter.format(date) }} {{ date.getFullYear() }}
            </span>
            <!-- Calendar buttons -->
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
export default {
    name: "Calendar",
    data() {
        return {
            week_days: [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            formatter: new Intl.DateTimeFormat('en', {month: "long"})
        }
    },
    setup() {
        const date = new Date();
        date.setDate(1);
        let formatted_days =  [[], [], [], [], [], []];
        let days = [];

        const last_day = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        const prev_last_day = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDate();

        // Position of the month's first day
        // [M,T,W,T,F,S,S]
        // [1,2,3,4,5,6,7]
        const first_day_index = date.getDay() - 1;

        const last_day_index = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDay();

        const next_days = 7 - last_day_index;

        // Previous month days
        for( let i = first_day_index; i > 0;  i-- ) {
            days.push(`<p class="text-base text-gray-400">${prev_last_day - i + 1}</div>`);
        }

        // Current month days
        for( let i = 1; i <= last_day; i++ ) {
            days.push(`<p class="text-base text-black">${i}</div>`);
        }

        // Next month days
        for ( let j = 1; j <= next_days; j++ ) {
            days.push(`<p class="text-base text-gray-400">${j}</div>`);
        }

        let chunks = 0;
        for ( let i = 0; i < days.length; i += 7) {
            formatted_days[chunks] = days.slice(i, i + 7);
            chunks++;
        }

        return { formatted_days, date }
    },
    methods: {
    }
}
</script>

<style scoped>

</style>