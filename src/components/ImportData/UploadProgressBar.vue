<template>
    <div class="flex h-1/4 items-center">
        <div class="w-full">
            <div class="flex pb-3">
                <div class="flex-1"></div>

                <div class="flex-1">
                    <div class="w-10 h-10 bg-green-200 border-4 border-green-500 border-opacity-25 mx-auto rounded-full text-lg flex items-center">
                        <svg-icon v-if="progress.status >= 1" class="w-full" type="mdi" :path="completed_icon"></svg-icon>
                        <span v-else class="text-center w-full">1</span>
                    </div>
                </div>
                <div class="w-1/6 align-center items-center align-middle content-center flex">
                    <div class="w-full bg-gray-100 rounded items-center align-middle align-center flex-1">
                        <div v-if="progress.status >= 1" class="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded" style="width: 100%"></div>
                        <div v-if="progress.status === 0" class="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded" :style="{ 'width': progress.progress + '%' }"></div>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="w-10 h-10 bg-green-200 border-4 border-green-500 border-opacity-25 mx-auto rounded-full text-lg flex items-center">
                        <svg-icon v-if="progress.status >= 2" class="w-full" type="mdi" :path="completed_icon"></svg-icon>
                        <span v-else class="text-center w-full">2</span>
                    </div>
                </div>
                <div class="w-1/6 align-center items-center align-middle content-center flex">
                    <div class="w-full bg-gray-100 rounded items-center align-middle align-center flex-1">
                        <div v-if="progress.status >= 2" class="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded" style="width: 100%"></div>
                        <div v-if="progress.status === 1" class="bg-green-400 text-xs leading-none py-1 text-center text-gray-darkest rounded" :style="{ 'width': progress.progress + '%'}"></div>
                        <div v-if="progress.status < 1" class="bg-gray-100 text-xs leading-none py-1 text-center text-grey-darkest rounded"></div>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="w-10 h-10 bg-green-200 border-4 border-4 border-green-500 border-opacity-25 mx-auto rounded-full text-lg flex items-center">
                        <svg-icon v-if="progress.status >= 3" class="w-full" type="mdi" :path="completed_icon"></svg-icon>
                        <span v-else class="text-center w-full">3</span>
                    </div>
                </div>
                <div class="w-1/6 align-center items-center align-middle content-center flex">
                    <div class="w-full bg-gray-100 rounded items-center align-middle align-center flex-1">
                        <div v-if="progress.status >= 3" class="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded" style="width: 100%"></div>
                        <div v-if="progress.status === 2" class="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded" :style="{ 'width': progress.progress + '%'}"></div>
                        <div v-if="progress.status < 2" class="bg-gray-100 text-xs leading-none py-1 text-center text-grey-darkest rounded"></div>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="w-10 h-10 bg-green-200 border-4 border-green-500 border-opacity-25 mx-auto rounded-full text-lg flex items-center">
                        <span class="text-center w-full">4</span>
                    </div>
                </div>

                <div class="flex-1"></div>
            </div>

            <div class="flex text-lg content-center text-center">
                <div class="w-1/4">
                    Uploading file
                </div>

                <div class="w-1/4">
                    Data Processing
                </div>

                <div class="w-1/4">
                    Generating Overview
                </div>

                <div class="w-1/4">
                    Finish
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCheck } from '@mdi/js';

export default {
    name: "UploadProgressBar",
    components: {
        SvgIcon
    },
    computed: {
        progress() {
            return { status: this.$store.state.upload_status.status, progress: this.$store.state.upload_status.progress };
        }
    },
    data() {
        return {
            completed_icon: mdiCheck
        }
    }
}
</script>

<style scoped>

</style>