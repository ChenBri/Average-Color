<template>
  <section>
    <div class="border-2 border-black bg-slate-100 w-6/12 m-auto p-6 mt-24">
      <header class="text-center text-3xl pb-8">Average Color</header>
      <open-picture></open-picture>
      
     
    </div>
  </section>
</template>

<script>
import OpenPicture from "./OpenPicture.vue";


export default {
  components: {
    OpenPicture,
  }
};
</script>