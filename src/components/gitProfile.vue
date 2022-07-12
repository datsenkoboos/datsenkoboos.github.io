<template>
    <div class="flex flex-col items-center justify-center w-full h-screen 800:h-auto">
        <div class="rounded-md bg-[rgba(0,0,0,.5)] p-5 flex flex-col items-center justify-center shadow-lg">
            <img :src="data.avatar_url" class="w-[160px] h-[160px] rounded-md shadow-lg mb-5">
            <div class="text-white text-lg font-bold text-center hover:brightness-95 transition-all">
                {{ data.name }}
            </div>
            <div class="text-white text-md text-center">
                <a class="hover:decoration-solid" :href="data.html_url" target="_blank" rel="noopener noreferrer">
                    @{{ data.login }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
})
</script>

<style lang="scss">
    
</style>