<template>
    <a :href="data.html_url" target="_blank">
        <div class="bg rounded-lg p-5 bg-[#141414] w-[350px] relative hover:brightness-90 transition-all">
            <div class="font-bold text-xl">{{ data.name }}</div>
            <div class="text-sm break-words">{{ data.description  ? data.description : 'No description' }}</div>
            <div :class="'absolute right-0 top-0 px-2 rounded-tr-lg rounded-bl-lg min-w-[50px] text-center shadow-md ' + data.language">{{ data.language }}</div>
        </div>
    </a>
</template>

<script setup>
const props = defineProps({
    data: Object,
})
</script>

<style lang="scss">
.HTML {
    background: rgb(227,76,38);
    background: linear-gradient(190deg, rgba(227,76,38,1) 0%, rgba(0,0,0,.1) 99%); 
}
.Vue {
    background: rgb(65, 184, 131);
    background: linear-gradient(190deg, rgb(65, 184, 131) 0%, rgba(0,0,0,.1) 99%); 
}
.Python {
    background: rgb(53, 114, 165);
    background: linear-gradient(190deg, rgb(53, 114, 165) 0%, rgba(0,0,0,.1) 99%); 
}
.JavaScript {
    background: rgb(241, 224, 90);
    background: linear-gradient(190deg, rgb(241, 224, 90) 0%, rgba(0,0,0,.1) 99%); 
}
.CSS {
    background: rgb(86, 61, 124);
    background: linear-gradient(190deg, rgb(86, 61, 124) 0%, rgba(0,0,0,.1) 99%); 
}
.TypeScript {
    background: rgb(49, 120, 198);
    background: linear-gradient(190deg, rgb(49, 120, 198) 0%, rgba(0,0,0,.1) 99%); 
}
</style>