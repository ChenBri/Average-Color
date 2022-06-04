<template>
  <section>
    <div class="border-2 border-black bg-slate-100 w-6/12 pb-6 m-auto mt-8">
      <header class="text-center text-4xl py-12 bg-slate-500">Average Color</header>
      <open-picture></open-picture>
    </div>
  </section>
</template>

<script>
import OpenPicture from "./OpenPicture.vue";

export default {
  components: {
    OpenPicture,
  },
};
</script>