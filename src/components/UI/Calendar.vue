<template>
    <div class="flex flex-col m-2 p-5 bg-gray-100 rounded-lg">
        <div class="flex w-full items-center justify-between">
            <!-- Calendar Month & Year -->
            <span tabindex="0" class="flex text-xl font-bold">
                December 2021
            </span>
            <!-- Calendar buttons -->
        </div>
        <!-- Calendar dates -->
        <div class="flex items-center pt-6">
            <table class="w-full">
                <thead>
                <tr>
                    <th>
                        <div class="w-full flex justify-center">
                            <p class="text-base font-medium text-center text-gray-800">
                                Mo
                            </p>
                        </div>
                    </th>
                    <th>
                        <div class="w-full flex justify-center">
                            <p class="text-base font-medium text-center text-gray-800">
                                Tu
                            </p>
                        </div>
                    </th>
                    <th>
                        <div class="w-full flex justify-center">
                            <p class="text-base font-medium text-center text-gray-800">
                                We
                            </p>
                        </div>
                    </th>
                    <th>
                        <div class="w-full flex justify-center">
                            <p class="text-base font-medium text-center text-gray-800">
                                Th
                            </p>
                        </div>
                    </th>
                    <th>
                        <div class="w-full flex justify-center">
                            <p class="text-base font-medium text-center text-gray-800">
                                Fr
                            </p>
                        </div>
                    </th>
                    <th>
                        <div class="w-full flex justify-center">
                            <p class="text-base font-medium text-center text-gray-800">
                                Sa
                            </p>
                        </div>
                    </th>
                    <th>
                        <div class="w-full flex justify-center">
                            <p class="text-base font-medium text-center text-gray-800">
                                Su
                            </p>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                            <p class="text-base text-gray-500 dark:text-gray-100">
                                1
                            </p>
                        </div>
                    </td>
                    <td>
                        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                            <p class="text-base text-gray-500 dark:text-gray-100">
                                2
                            </p>
                        </div>
                    </td>
                    <td>
                        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                            <p class="text-base text-gray-500 dark:text-gray-100">
                                3
                            </p>
                        </div>
                    </td>
                    <td>
                        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                            <p class="text-base text-gray-500 dark:text-gray-100">
                                4
                            </p>
                        </div>
                    </td>
                    <td>
                        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                            <p class="text-base text-gray-500 dark:text-gray-100">
                                5
                            </p>
                        </div>
                    </td>
                    <td>
                        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                            <p class="text-base text-gray-500 dark:text-gray-100">
                                6
                            </p>
                        </div>
                    </td>
                    <td>
                        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                            <p class="text-base text-gray-500 dark:text-gray-100">
                                7
                            </p>
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
    name: "Calendar"
}
</script>

<style scoped>

</style>