<template>
  <svg class="mask" :style="style" />
</template>

<script>
export default {
  props: ["mask"],

  computed: {
    style() {
      console.warn(this.mask);
      const {
        pos: [x, y],
        size: [w, h]
      } = this.mask;

      return {
        transform: `translate(${x}px, ${y}px)`,
        width: `${w}px`,
        height: `${h}px`
      };
    }
  }
};
</script>