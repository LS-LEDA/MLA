<template>
    <section id="settings" class="relative flex flex-col w-full h-full p-5 py-10">
        <div class="flex flex-col w-full h-full">
            <h1 class="text-4xl font-extrabold pb-5"> Settings </h1>
            <div class="flex flex-col w-full h-full bg-white rounded-2xl p-5">
                <!-- Tabs buttons -->
                <div class="grid grid-cols-2 gap-2 lg:flex lg:flex-row pb-5">
                    <router-link active-class="bg-blue-300"
                                 class="bg-blue-200 w-auto hover:bg-blue-300 rounded-lg text-2xl font-bold px-10 py-3 text-center"
                                 :to="tab.tab_path"
                                 v-for="(tab, index) in tabs"
                                 :key="index">
                        {{ tab.tab_name }}
                    </router-link>
                </div>
                <!-- Dashboard deeply nested component view -->
                <router-view></router-view>
            </div>
        </div>
        <!-- Alert -->
        <Alert v-if="alert_status.status" :message="alert_status.message"
               @closeAlert="close_alert"/>
    </section>
</template>

<script>
import Alert from "@/components/UI/Alert";

export default {
    name: "Dashboard",
    components: {
        Alert
    },
    mounted() {
        // Handle error if during the storing process crashes
        window.ipc.on('write_settings', (err) => {
            // TODO: Error logging
            console.log(err)
            this.$store.commit('setAlertMessage', "Somethings went wrong! Try to restart MLA")
            if ( this.$store.state.alert.status ) {
                window.clearTimeout( this.$store.state.alert.timeout );
            } else {
                // Show alert
                this.$store.commit('toggleAlert');
            }
            // Delayed alert hiding & store timer ID for user manual dismiss
            this.$store.state.alert.timeout = setTimeout( () => {
                // Automatically hide alert after 5s
                this.$store.commit('toggleAlert')
            }, 5000);
        });
    },
    unmounted() {
        // Destroy IPC listeners, otherwise it
        // will register a new one if it's mounted again
        // The registration of the listener is in the routing
        this.$store.commit('removeIPCListener', 'read_settings')
        this.$store.commit('removeIPCListener', 'write_settings')
    },
    computed: {
        alert_status(){
            return this.$store.state.alert;
        }
    },
    methods: {
        close_alert: function(){
            // Clears toggle alert timeout if alert is dismissed by the user
            clearTimeout(this.$store.state.alert.timeout);
            this.$store.state.alert.status = false;
        }
    },
    data() {
        return {
            tabs: [
                {
                    tab_name: "General",
                    tab_path: "/settings/general"
                },
                {
                    tab_name: "Themes",
                    tab_path: "/settings/themes"
                },
                {
                    tab_name: "About",
                    tab_path: "/settings/about"
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>