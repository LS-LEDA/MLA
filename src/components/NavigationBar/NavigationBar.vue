<template>
    <div :class="nav_state ? 'w-80' : 'w-20'" class="mx-2 my-2 flex flex-col bg-secondary dark:bg-dark_secondary rounded-xl transform transition-all duration-700">
        <NavigationHeader/>
        <div class="flex flex-col gap-y-3 mx-2">
			<div
				v-for="(page, index) in pages"
				:key="index"
				class="flex flex-col rounded-md bg-primary dark:bg-dark_primary font-bold w-full h-fit relative"
			>
				<router-link
					active-class="w-full bg-primary_variant dark:bg-dark_primary_variant"
					class="flex w-full p-2 rounded-md hover:bg-primary_variant space-x-3"
					:class="[nav_state ? '' : 'place-content-center', page.wrapped !== undefined && !page.wrapped && nav_state ? 'rounded-b-none' : '']"
					:to="page.page_link"
				>
					<SvgIcon type="mdi" :path="page.button_icon"/>
					<span v-if="nav_state">{{$t(page.button_name)}}</span>
				</router-link>
				<!-- Wrap page children list icon -->
				<SvgIcon
					v-if="nav_state && page.children"
					:path="this.pages[index].wrapped ? chevron_down_icon : chevron_up_icon"
					type="mdi"
					class="absolute bg-primary rounded-md right-2 top-2 cursor-pointer"
					@click="page.wrapped = !page.wrapped"
				/>
				<div v-if="nav_state && page.wrapped !== undefined && !page.wrapped" class="p-2">
					<router-link
						v-for="(subpage, subpageIndex) in page.children"
						:key="subpageIndex"
						:to="page.page_link + subpage.rel_link"
						:class="nav_state ? null : 'justify-center'"
						class="text-sm flex w-full px-2 py-2 hover:bg-primary_variant dark:hover:bg-dark_primary_variant hover:rounded-md"
						active-class="bg-primary_variant dark:bg-dark_primary_variant rounded-md"
					>
						{{ $t(subpage.button_name) }}
					</router-link>
				</div>
			</div>
        </div>
        <div class="flex flex-col flex-1 justify-end">
            <DownloadButton/>
        </div>
    </div>
</template>

<script>
import DownloadButton from '@/components/NavigationBar/DownloadButton.vue';
import NavigationHeader from "@/components/NavigationBar/NavigationHeader.vue";
import {
	mdiChevronDown,
	mdiChevronUp,
	mdiCogOutline,
	mdiDatabaseImportOutline,
	mdiToyBrickPlusOutline,
	mdiViewDashboardOutline
} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import {useSettingsStore} from "@/vuex/settingsStore";

export default {
    name: "NavigationBar",
    components: {
        NavigationHeader,
        DownloadButton,
        SvgIcon
    },
    setup() {
        const settingsStore = useSettingsStore();
        return { settingsStore };
    },
    computed: {
        /**
         * Navigation bar state:
         * true: expanded
         * false: shrank
         */
        nav_state() {
            return this.settingsStore.navigation_bar_status;
        }
    },
    data() {
        return {
			chevron_down_icon: mdiChevronDown,
			chevron_up_icon: mdiChevronUp,
            pages: [
                {
                    button_name: "navigation.import",
                    button_icon: mdiDatabaseImportOutline,
                    page_link: '/import-data'
                },
                {
                    button_name: "navigation.dashboard.dash",
                    button_icon: mdiViewDashboardOutline,
                    page_link: '/dashboard',
					wrapped: true,
					children: [
						{
							button_name: "navigation.dashboard.summary",
							rel_link: '/summary',
						},
						{
							button_name: "navigation.dashboard.students",
							rel_link: '/students',
						},
						{
							button_name: "navigation.dashboard.resources",
							rel_link: '/resources',
						},
						{
							button_name: "navigation.dashboard.sentiment",
							rel_link: '/sentiment',
						}
					]
                },
                {
                    button_name: "navigation.plugins",
                    button_icon: mdiToyBrickPlusOutline,
                    page_link: '/plugins'
                },
                {
                    button_name: "navigation.settings.sett",
                    button_icon: mdiCogOutline,
                    page_link: '/settings'
                }
            ],
        }
    }
}
</script>

<style scoped>

</style>