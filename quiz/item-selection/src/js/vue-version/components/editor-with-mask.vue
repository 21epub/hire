<template>
  <div>
    <Masker v-if="mask" :mask="mask"></Masker>
    <ItemOverlay v-for="item in itemGroup" :key="item.id" :item="item" />
  </div>
</template>

<script>
import Masker from "./mask.vue";
import ItemOverlay from "./item-overlay.vue";

export default {
  components: {
    Masker,
    ItemOverlay
  },
  props: ["mask", "itemGroup"]
};
</script> 
