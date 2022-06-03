<template>
    <page-container> </page-container>
</template>

<script>
import PageContainer from "./components/PageContainer.vue";

export default {
    name: "App",
    components: {
        PageContainer,
    },
    mounted() {
        document.title = "Color Average";
    },
};
</script>
