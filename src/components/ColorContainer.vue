<template>
  <div class="w-[200px] h-[50px]">{{ RGBcolor }}</div>
</template>

<script>
export default {
  data() {
    return {
        RGB: '',
        HEX: '',
        HSL: ''
    };
  },

  props: ["RGBcolor"],

  watch: {
    RGBcolor() {
      console.log("test");
    },
  },
};
</script>

