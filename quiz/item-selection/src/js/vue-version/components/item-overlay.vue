<template>
  <div :class="className" :style="style" data-type="type">
    <div class="el-button-mix">{{item.value}}</div>
  </div>
</template>

<script>
export default {
  props: ["item"],

  computed: {
    className() {
      let className = "item";
      if (this.item.actived) {
        className += " actived";
      }
      return className;
    },
    style() {
      const {
        pos: [x, y],
        size: [w, h]
      } = this.item;

      return {
        transform: `translate(${x}px, ${y}px)`,
        width: `${w}px`,
        height: `${h}px`
      };
    }
  }
};
</script> 
