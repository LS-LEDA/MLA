<template>
    <section id="settings" class="relative flex flex-col w-full h-full">
        <div class="flex flex-col w-full h-full p-5 py-10">
            <h1 class="text-4xl font-extrabold pb-5"> Settings </h1>
            <div class="flex flex-col w-full h-full bg-secondary dark:bg-dark_secondary rounded-2xl p-5 overflow-y-hidden">
                <!-- Tabs buttons -->
                <div class="grid grid-cols-2 gap-2 lg:flex lg:flex-row pb-5">
                    <router-link active-class="bg-primary_variant dark:bg-dark_primary_variant"
                                 class="bg-primary dark:bg-dark_primary w-auto hover:bg-primary_variant dark:hover:bg-dark_primary_variant rounded-lg text-2xl font-bold px-10 py-3 text-center"
                                 :to="tab.tab_path"
                                 v-for="(tab, index) in tabs"
                                 :key="index">
                        {{ tab.tab_name }}
                    </router-link>
                </div>
                <!-- Dashboard deeply nested component view -->
                <router-view class="overflow-y-hidden" @popUp="toggle_popup"></router-view>
            </div>
        </div>
        <!-- Documentation Pop Up -->
        <PopUp
            v-if="popup"
            :current-pop-up="this.current_popup_up"
            :pop-up-props="this.docs_file"
            @closePopUp="this.toggle_popup"
        />
        <!-- Alert -->
        <Alert v-if="alert_status.status" :message="alert_status.message"
               @closeAlert="close_alert"/>
    </section>
</template>

<script>
import Alert from "@/components/UI/Alert";
import PopUp from "@/components/UI/PopUp";
import Documentation from "@/components/UI/Documentation";

export default {
    name: "Dashboard",
    components: {
        PopUp,
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
        },
        /**
         * Receives the file to be shown in the popup component
         * from its child and toggles the popup state
         * @param file File to be shown in the Documentation popup
         */
        toggle_popup: function (file) {
            this.popup = !this.popup;
            this.docs_file = {
                file: file
            }
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
                    tab_name: "AI",
                    tab_path: "/settings/ai"
                },
                {
                    tab_name: "Themes",
                    tab_path: "/settings/themes"
                },
                {
                    tab_name: "About",
                    tab_path: "/settings/about"
                }
            ],
            popup: false,
            current_popup_up: Documentation,
            docs_file: null
        }
    }
}
</script>

<style scoped>

</style>