<template>
    <div class="flex flex-row h-screen w-screen select-none">
        <!-- Left navigation bar -->
        <NavigationBar/>
        <!-- Page rendered by router -->
        <router-view/>
        <!-- Alert -->
        <Alert v-if="alert_status.status" :message="alert_status.message"
               @closeAlert="close_alert"/>
    </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import Alert from "@/components/UI/Alert";

export default {
    name: 'App',
    components: {
        Alert,
        NavigationBar
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
    }
}
</script>

<style>
</style>
