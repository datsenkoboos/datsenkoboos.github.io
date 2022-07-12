<template>
    <div class="list w-full flex gap-5 flex-wrap">
        <GitCard v-for="repo in data" :key="repo.id" :data="repo" />
    </div>
</template>

<script setup>
import GitCard from './gitCard.vue';

const props = defineProps({
    data: Object,
})
</script>

<style lang="scss">
@media screen and (max-width: 1230px) {
    .list {
        justify-content: center;
    }
}
</style>